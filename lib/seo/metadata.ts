import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, LOCALE_TAG, OG_LOCALE, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { siteConfig, siteUrl } from "@/lib/site";

/**
 * Metadata for a localised route.
 *
 * Each language is its own canonical URL with its own OG image, which is what
 * makes a shared link's preview deterministic: a crawler fetching `/pt-br` gets
 * Portuguese, one fetching `/en-us` gets English, from wherever it sits. Only a
 * bare `/` is geolocated, and it renders one of these two under its own URL.
 * `hreflang` (including `x-default`) tells search engines the two documents
 * are the same page in two languages rather than duplicates.
 */
export async function buildMetadata(locale: Locale): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const { metadata } = dict;

  const languages = Object.fromEntries([
    ...LOCALES.map((value) => [LOCALE_TAG[value], `/${value}`]),
    ["x-default", `/${DEFAULT_LOCALE}`],
  ]);

  return {
    metadataBase: new URL(siteConfig.url),
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    /* Safari turns anything that looks like a phone number or a postal address
       into a link of its own, restyled outside the design system. The page has
       one address worth linking, the mailto, and it is already an anchor. */
    formatDetection: { telephone: false, address: false, email: false },
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    /* Declaring `icons` at all replaces what the file conventions would have
       emitted, so `apple` is named here explicitly — without it Safari falls
       back to a screenshot of the page for a home-screen shortcut. The SVG
       leads because it is the only one that stays sharp at every size a
       browser might ask for; the .ico follows for the ones that cannot read
       it. */
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      shortcut: "/favicon.ico",
      apple: { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: siteUrl(`/${locale}`),
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((value) => value !== locale).map(
        (value) => OG_LOCALE[value],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.ogTitle,
      description: metadata.ogDescription,
    },
    /* The googleBot block is not a restatement of the generic one: the three
       preview directives exist only for Google, and keeping them there leaves
       the generic `robots` tag readable to every other crawler. `-1` means "no
       limit" for both the snippet length and the video preview. */
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
