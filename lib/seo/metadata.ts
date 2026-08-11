import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, LOCALE_TAG, OG_LOCALE, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { siteConfig, siteUrl } from "@/lib/site";

/**
 * Metadata for a localised route.
 *
 * Each language is its own canonical URL with its own OG image, which is what
 * makes link previews correct: a crawler fetching `/pt-br` gets Portuguese, one
 * fetching `/en-us` gets English, regardless of where the crawler itself sits.
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
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
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
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}
