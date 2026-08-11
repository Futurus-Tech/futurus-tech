import { TEAM_PROFILES } from "@/content/media";
import type { Dictionary } from "@/content/types";
import { LOCALES, LOCALE_TAG, type Locale } from "@/lib/i18n/config";
import { siteConfig, siteUrl } from "@/lib/site";

/**
 * The page, described for machines.
 *
 * Everything here is derived from the same dictionary the page renders, so the
 * structured data cannot drift from the copy: a reworded FAQ answer, a new
 * service or a new collaborator changes both at once. Nothing is asserted that
 * the document does not also say in words, which is the line Google's
 * structured data policy draws.
 *
 * It is emitted as one `@graph` rather than a stack of separate scripts. The
 * nodes cross-reference each other by `@id` — the page is `isPartOf` the site,
 * the site is `publisher`-ed by the organisation, the team are `employee`s of
 * it — and a graph is the only shape in which those references resolve.
 *
 * The `@id`s are absolute and locale-scoped where the thing itself is
 * locale-scoped. The organisation exists once and is the same organisation in
 * both languages, so it keeps one id across `/pt-br` and `/en-us`; the page
 * nodes are two documents and get two.
 */

const ORGANIZATION_ID = siteUrl("/#organization");
const WEBSITE_ID = siteUrl("/#website");

type Graph = { readonly "@context": "https://schema.org"; readonly "@graph": readonly object[] };

export function buildStructuredData(dict: Dictionary, locale: Locale): Graph {
  const language = LOCALE_TAG[locale];
  const pageUrl = siteUrl(`/${locale}`);
  const pageId = `${pageUrl}#webpage`;

  /* The people, with the profiles that back them. Only members with a public
     profile are named as `sameAs` targets — an entity claim with nothing to
     resolve against is worth less than no claim at all. */
  const team = dict.about.team.map((member) => {
    const profile = TEAM_PROFILES[member.id];
    return {
      "@type": "Person",
      "@id": `${siteUrl("/")}#person-${member.id}`,
      name: member.name,
      jobTitle: member.role,
      worksFor: { "@id": ORGANIZATION_ID },
      ...(profile ? { sameAs: [profile] } : {}),
    };
  });

  const organization = {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: siteUrl("/"),
    description: dict.metadata.organization,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin],
    /* The share card doubles as the logo: it is the one image of the brand the
       site actually publishes, and it carries the wordmark. */
    logo: {
      "@type": "ImageObject",
      "@id": siteUrl("/#logo"),
      url: `${pageUrl}/opengraph-image`,
      caption: siteConfig.name,
    },
    image: { "@id": siteUrl("/#logo") },
    knowsLanguage: LOCALES.map((value) => LOCALE_TAG[value]),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      availableLanguage: LOCALES.map((value) => LOCALE_TAG[value]),
    },
    employee: team.map((person) => ({ "@id": person["@id"] })),
    /* The nine service lines, straight from the section that lists them. */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.eyebrow,
      inLanguage: language,
      itemListElement: dict.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@id": ORGANIZATION_ID },
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl("/"),
    name: siteConfig.name,
    description: dict.metadata.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: LOCALES.map((value) => LOCALE_TAG[value]),
  };

  /* One node typed as both. The document is a page, and the FAQ that Google
     reads is on it rather than on a page of its own — declaring a detached
     FAQPage at a URL that does not exist is the failure mode this avoids. */
  const page = {
    "@type": ["WebPage", "FAQPage"],
    "@id": pageId,
    url: pageUrl,
    name: dict.metadata.title,
    description: dict.metadata.description,
    inLanguage: language,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: { "@id": siteUrl("/#logo") },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  /* A one-level trail. The site is a single page per language, so the crumb
     says exactly that rather than inventing a hierarchy to look deeper. */
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: pageUrl },
    ],
  };

  const posts = {
    "@type": "ItemList",
    "@id": `${pageUrl}#insights`,
    name: dict.insights.eyebrow,
    itemListElement: dict.insights.posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        articleSection: post.category,
        datePublished: post.dateTime,
        inLanguage: language,
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": pageId },
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, page, breadcrumb, posts, ...team],
  };
}
