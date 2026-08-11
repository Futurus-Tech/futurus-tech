"use client";

import Link from "next/link";

import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_SHORT,
  LOCALE_TAG,
  otherLocale,
  type Locale,
} from "@/lib/i18n/config";

/**
 * The PT/EN switch.
 *
 * It is a real link to a real URL, not a client-side text swap: each language
 * is its own statically rendered document, so the page a visitor shares is the
 * page a crawler fetches, in the language they were reading.
 *
 * Following it also records the choice in a cookie, which `proxy.ts` honours
 * ahead of geolocation — once someone has picked a language, we stop guessing.
 */
export function LanguageToggle({ locale, label }: { locale: Locale; label: string }) {
  const target = otherLocale(locale);

  return (
    <Link
      href={`/${target}`}
      hrefLang={LOCALE_TAG[target]}
      aria-label={label}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
      }}
      className="cursor-pointer border-2 border-divider bg-transparent px-2.5 py-2 font-heading text-[12px] font-extrabold uppercase tracking-[0.08em] text-text transition-colors duration-150 hover:border-accent hover:text-accent"
    >
      {/* The button says `pt`/`en`: two characters is all it has room for, and
          the region is carried by the href and `hrefLang` either way. */}
      {LOCALE_SHORT[target]}
    </Link>
  );
}
