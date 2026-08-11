/**
 * Locale configuration.
 *
 * Shared by the server (metadata, dictionaries) and by `proxy.ts`, which runs
 * before the app — so this module must stay free of any Node or React import.
 */

/**
 * The locales, as they appear in the URL. Region-qualified rather than bare
 * language codes — the copy is Brazilian Portuguese and US English, not
 * generic `pt`/`en` — and lowercase because that is the convention for a path
 * segment, while `LOCALE_TAG` below carries the canonically cased BCP 47 form
 * for `<html lang>`, `hreflang` and `og:locale`.
 */
export const LOCALES = ["pt-br", "en-us"] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * Portuguese is the default: Futurus Tech is a Brazilian consultancy, so a
 * request we cannot place — most importantly a social crawler, which is
 * almost always outside Brazil — should get the home market's language.
 */
export const DEFAULT_LOCALE: Locale = "pt-br";

export const LOCALE_COOKIE = "NEXT_LOCALE";

/** One year, in seconds — how long an explicit language choice is honoured. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** BCP 47 tags, for `<html lang>`, `hreflang` and `og:locale`. */
export const LOCALE_TAG: Record<Locale, string> = {
  "pt-br": "pt-BR",
  "en-us": "en-US",
};

/** Open Graph wants underscores, not hyphens. */
export const OG_LOCALE: Record<Locale, string> = {
  "pt-br": "pt_BR",
  "en-us": "en_US",
};

/**
 * What the language switch prints. The region is what the routing and the
 * markup need, not what a two-letter button has room to say.
 */
export const LOCALE_SHORT: Record<Locale, string> = {
  "pt-br": "pt",
  "en-us": "en",
};

/**
 * Which locale serves a bare language subtag. A reader who asks for `pt-PT`
 * or plain `pt` gets the Brazilian copy — it is the only Portuguese we have,
 * and it reads far closer than English would.
 */
const LANGUAGE_LOCALE: Record<string, Locale> = {
  pt: "pt-br",
  en: "en-us",
};

/**
 * Countries served in Portuguese. Brazil is the market; the rest of the
 * Lusophone world gets Portuguese too rather than being pushed to English.
 */
const PT_COUNTRIES = new Set(["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"]);

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}

export function localeFromCountry(country: string | undefined): Locale | null {
  if (!country) return null;
  return PT_COUNTRIES.has(country.toUpperCase()) ? "pt-br" : "en-us";
}

/**
 * Minimal `Accept-Language` negotiation: pick the highest-quality tag we serve,
 * matching the full tag first and falling back to its primary subtag. Used when
 * geolocation headers are absent (self-hosted, local dev, proxies that strip
 * them).
 */
export function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.tag.length > 0 && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (isLocale(tag)) return tag;

    const byLanguage = LANGUAGE_LOCALE[tag.split("-")[0]];
    if (byLanguage) return byLanguage;
  }

  return null;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "pt-br" ? "en-us" : "pt-br";
}
