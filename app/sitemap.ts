import type { MetadataRoute } from "next";

import { DEFAULT_LOCALE, LOCALES, LOCALE_TAG } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";

/**
 * Both languages, each declaring the other as an alternate. Search engines read
 * the `alternates.languages` block the same way they read `hreflang` in the
 * document head, so the two URLs are indexed as one page in two languages
 * rather than as duplicates of each other.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [LOCALE_TAG[locale], siteUrl(`/${locale}`)]),
  );

  return LOCALES.map((locale) => ({
    url: siteUrl(`/${locale}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
    alternates: { languages },
  }));
}
