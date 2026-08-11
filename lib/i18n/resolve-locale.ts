import {
  DEFAULT_LOCALE,
  isLocale,
  localeFromAcceptLanguage,
  localeFromCountry,
  type Locale,
} from "./config";

/**
 * User agents that fetch a page to build a preview card rather than to read it.
 *
 * These matter because they are almost always hosted outside Brazil: geolocating
 * the request would hand a Brazilian visitor's shared link an English preview.
 * A crawler therefore skips geolocation entirely and gets the default locale.
 */
const SOCIAL_CRAWLERS =
  /facebookexternalhit|facebookcatalog|meta-externalagent|WhatsApp|Twitterbot|LinkedInBot|Discordbot|Slackbot|Slack-ImgProxy|TelegramBot|SkypeUriPreview|Pinterest|redditbot|vkShare|Iframely|embedly|Applebot|Googlebot|bingbot|DuckDuckBot|YandexBot|Bluesky|Mastodon|quora link preview|W3C_Validator|nuzzel|outbrain|SnapchatAds|Viber|Line;|Google-InspectionTool/i;

export function isSocialCrawler(userAgent: string | null): boolean {
  return userAgent !== null && SOCIAL_CRAWLERS.test(userAgent);
}

/**
 * Country headers, in the order we trust them. Each is set by the edge in
 * front of the app; nothing here trusts a value the client can forge into
 * anything worse than a language it could have picked with the toggle anyway.
 */
const COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-geo-country",
  "x-country-code",
  "fastly-client-country",
] as const;

export function countryFromHeaders(headers: Headers): string | undefined {
  for (const name of COUNTRY_HEADERS) {
    const value = headers.get(name);
    if (value && value !== "XX") return value;
  }
  return undefined;
}

export type LocaleDecision = {
  locale: Locale;
  /** How the choice was made — surfaced as a response header for debugging. */
  reason: "cookie" | "crawler" | "geo" | "accept-language" | "default";
};

/**
 * Decide which language an unlocalised request should be served in.
 *
 * The order is deliberate:
 *  1. an explicit choice, remembered in a cookie — never overrule the reader;
 *  2. a preview crawler, which gets the default locale so a shared link's card
 *     is deterministic instead of depending on which datacentre answered;
 *  3. geolocation — Brazil and the rest of the Lusophone world read Portuguese;
 *  4. `Accept-Language`, for edges that strip geo headers and for local dev;
 *  5. the default.
 */
export function resolveLocale({
  cookie,
  userAgent,
  headers,
}: {
  cookie: string | undefined;
  userAgent: string | null;
  headers: Headers;
}): LocaleDecision {
  if (isLocale(cookie)) return { locale: cookie, reason: "cookie" };

  if (isSocialCrawler(userAgent)) return { locale: DEFAULT_LOCALE, reason: "crawler" };

  const byCountry = localeFromCountry(countryFromHeaders(headers));
  if (byCountry) return { locale: byCountry, reason: "geo" };

  const byLanguage = localeFromAcceptLanguage(headers.get("accept-language"));
  if (byLanguage) return { locale: byLanguage, reason: "accept-language" };

  return { locale: DEFAULT_LOCALE, reason: "default" };
}
