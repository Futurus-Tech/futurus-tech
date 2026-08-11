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
 * These do not pick the language: `/` is geolocated for everyone, crawler or
 * not, so a preview card reflects the IP that asked for it. What the list
 * decides is *how* the root is served. A crawler has no address bar and must
 * keep the shared URL, so it is rewritten; a reader is redirected onto the
 * localised URL instead.
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
  /** How the choice was made, surfaced as a response header for debugging. */
  reason: "cookie" | "geo" | "accept-language" | "default";
};

/**
 * Decide which language an unlocalised request should be served in.
 *
 * This answers for `/` only. `/pt-br` and `/en-us` are explicit: whoever asks
 * for one gets it, from any country and whatever their cookie says, because
 * naming the language in the URL is the strongest signal there is.
 *
 * The order is deliberate:
 *  1. an explicit choice, remembered in a cookie: never overrule the reader;
 *  2. geolocation: Brazil and the rest of the Lusophone world read Portuguese,
 *     everyone else reads English. This applies to preview crawlers too, so a
 *     card for `/` matches the country the request came from;
 *  3. `Accept-Language`, for edges that strip geo headers and for local dev;
 *  4. the default.
 */
export function resolveLocale({
  cookie,
  headers,
}: {
  cookie: string | undefined;
  headers: Headers;
}): LocaleDecision {
  if (isLocale(cookie)) return { locale: cookie, reason: "cookie" };

  const byCountry = localeFromCountry(countryFromHeaders(headers));
  if (byCountry) return { locale: byCountry, reason: "geo" };

  const byLanguage = localeFromAcceptLanguage(headers.get("accept-language"));
  if (byLanguage) return { locale: byLanguage, reason: "accept-language" };

  return { locale: DEFAULT_LOCALE, reason: "default" };
}
