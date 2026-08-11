import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { ErrorHeader } from "@/components/layout/error-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionFlag } from "@/components/motion/motion-flag";
import { NotFoundSection } from "@/components/sections/not-found-section";
import { archivo } from "@/lib/fonts";
import { LOCALE_COOKIE, LOCALE_TAG, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { resolveLocale } from "@/lib/i18n/resolve-locale";

import "./globals.css";

/**
 * The 404, for every URL the app does not route.
 *
 * `global-not-found` rather than `not-found` because the root layout is
 * `app/[lang]/layout.tsx`, a top-level dynamic segment. There is no
 * `app/layout.tsx` for a root `not-found.tsx` to render inside, which is
 * exactly the case this convention exists for: it bypasses rendering entirely
 * and returns its own complete document, so the stylesheet, the font and the
 * pre-paint motion flag are all imported here.
 */

/**
 * Which language a dead URL is answered in.
 *
 * The same negotiation `proxy.ts` runs for the unlocalised root, for the same
 * reason: the path is gone, so the only things left to go on are what the
 * visitor already chose and where they are. In practice the cookie carries it,
 * because the language switch writes one the moment anybody picks a language,
 * and a visitor who never switched gets the locale that geolocation and
 * `Accept-Language` would have sent them to anyway.
 *
 * Reading request headers makes this page dynamic rather than prerendered.
 * That is the right trade here: a 404 is rendered rarely and never cached
 * publicly (Next.js serves it `no-store`), so the cost is a render nobody
 * waits on, and the alternative is answering half the audience in a language
 * they did not ask for.
 */
async function negotiateLocale(): Promise<Locale> {
  const [headerList, cookieStore] = await Promise.all([headers(), cookies()]);

  return resolveLocale({
    cookie: cookieStore.get(LOCALE_COOKIE)?.value,
    userAgent: headerList.get("user-agent"),
    headers: headerList,
  }).locale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await negotiateLocale();
  const dict = await getDictionary(locale);

  return {
    title: dict.notFound.metaTitle,
    description: dict.notFound.lead,
  };
}

export default async function GlobalNotFound() {
  const locale = await negotiateLocale();
  const dict = await getDictionary(locale);

  return (
    // `suppressHydrationWarning` for the `data-fx` flag `MotionFlag` sets on
    // this element pre-paint; see the same note in `app/[lang]/layout.tsx`.
    <html
      lang={LOCALE_TAG[locale]}
      className={archivo.variable}
      suppressHydrationWarning
    >
      {/* Column layout so the footer sits at the bottom of the viewport on the
          tall screens where this short page would otherwise leave it floating.
          `SmoothScroll` is deliberately absent: there is nothing to scroll
          through, and a 404 should not pay for Lenis to find that out. */}
      <body className="flex min-h-[100svh] flex-col">
        <MotionFlag />
        <ErrorHeader dict={dict} locale={locale} />
        <NotFoundSection content={dict.notFound} nav={dict.nav} locale={locale} />
        <SiteFooter dict={dict} />
      </body>
    </html>
  );
}
