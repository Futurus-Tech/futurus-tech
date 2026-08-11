import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE } from "@/lib/i18n/config";
import { isSocialCrawler, resolveLocale } from "@/lib/i18n/resolve-locale";

/**
 * Locale routing for the unlocalised root.
 *
 * `/pt-br` and `/en-us` are the real, statically generated pages, and this
 * never runs for them: an explicitly named language is served as asked, so a
 * reader in Brazil who opens `/en-us` reads English and the card for that link
 * is English too. `/` is the only undecided URL, and it is decided by country:
 * Brazil and the rest of the Lusophone world get `/pt-br`, everyone else gets
 * `/en-us`. Two different treatments of that decision:
 *
 *  - **People get a redirect.** They land on `/pt-br` or `/en-us` and that is
 *    the URL in their address bar, so pasting it anywhere shares a
 *    language-specific link whose card is fixed at that language.
 *
 *  - **Crawlers get a rewrite.** A bare `/` shared anywhere still needs a card,
 *    and rewriting keeps the URL that was actually shared as the one that gets
 *    it. The language and the OG image follow the same geolocation as a reader,
 *    which means the IP that fetches the card decides it: for a preview that is
 *    the platform's datacentre, not the person who pasted the link. Anyone who
 *    needs a card in a specific language shares the localised URL.
 *
 * `Vary` is set because the response body depends on request headers. Without
 * it a CDN would serve one visitor's language to everybody.
 */
export function proxy(request: NextRequest) {
  const { locale, reason } = resolveLocale({
    cookie: request.cookies.get(LOCALE_COOKIE)?.value,
    headers: request.headers,
  });

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;

  const response = isSocialCrawler(request.headers.get("user-agent"))
    ? NextResponse.rewrite(url)
    : NextResponse.redirect(url, 307);

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
