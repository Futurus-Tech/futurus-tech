import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE } from "@/lib/i18n/config";
import { resolveLocale } from "@/lib/i18n/resolve-locale";

/**
 * Locale routing for the unlocalised root.
 *
 * `/pt-br` and `/en-us` are the real, statically generated pages; `/` only
 * exists to send each visitor to the right one. Two different treatments:
 *
 *  - **People get a redirect.** They land on `/pt-br` or `/en-us` and that is the URL
 *    in their address bar, so when they paste the link into WhatsApp, LinkedIn
 *    or Discord, the crawler fetches a language-specific URL and the preview
 *    card matches what the sharer was reading — even though the crawler itself
 *    is sitting in another country.
 *
 *  - **Crawlers get a rewrite.** A bare `/` shared anywhere still needs a card,
 *    and geolocating a bot tells us where its datacentre is, not where its
 *    audience is. So `/` is rendered as the default locale under its own URL,
 *    with `og:locale:alternate` and `hreflang` declaring the other language.
 *    Rewriting rather than redirecting also keeps whatever URL was shared as
 *    the one that gets the card.
 *
 * `Vary` is set because the response body depends on request headers — without
 * it a CDN would serve one visitor's language to everybody.
 */
export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const { locale, reason } = resolveLocale({
    cookie: request.cookies.get(LOCALE_COOKIE)?.value,
    userAgent,
    headers: request.headers,
  });

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;

  const response =
    reason === "crawler" ? NextResponse.rewrite(url) : NextResponse.redirect(url, 307);

  response.headers.set("x-locale", locale);
  response.headers.set("x-locale-reason", reason);
  response.headers.set("Vary", "Accept-Language, User-Agent, X-Vercel-IP-Country");

  return response;
}

export const config = {
  // Only the bare root needs deciding. Every other path is either already
  // localised or a static asset, and must not pay for this.
  matcher: "/",
};
