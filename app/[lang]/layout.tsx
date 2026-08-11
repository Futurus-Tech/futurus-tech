import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SkipLink } from "@/components/layout/skip-link";
import { MotionFallback } from "@/components/motion/motion-fallback";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { archivo } from "@/lib/fonts";
import { IMAGE_HOSTS } from "@/lib/images";
import { LOCALES, LOCALE_TAG, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildStructuredData } from "@/lib/seo/structured-data";

import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** Only `pt-br` and `en-us` exist; anything else is a 404 rather than a render. */
export const dynamicParams = false;

/**
 * `themeColor` paints the browser's own chrome — Android's status bar, Safari's
 * toolbar — in the page's ground, so the frame around the document stops
 * disagreeing with it. `colorScheme` is `light` because the palette is: the
 * design has one ground and no dark counterpart, and claiming otherwise would
 * have the browser render form controls and scrollbars for a scheme the
 * stylesheet never answers.
 */
export const viewport: Viewport = {
  themeColor: "#f3f2f2",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return buildMetadata(lang);
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    // Nothing touches this element before hydration any more: the pre-paint
    // motion state is a stylesheet rule now, so the server markup and the
    // client's first render agree and no hydration warning has to be
    // suppressed here.
    <html lang={LOCALE_TAG[lang]} className={archivo.variable}>
      <head>
        {/* The hero frame is the largest paint on the page and comes from a
            different origin than the document, so its connection is opened on
            the first request rather than after the optimiser's URL has been
            parsed out of the markup. React hoists these into <head> wherever
            they are written; they are written here because that is where they
            are read. */}
        {IMAGE_HOSTS.map((host) => (
          <link key={host} rel="preconnect" href={`https://${host}`} crossOrigin="" />
        ))}
      </head>
      <body>
        {/* First in the document, so it is first in the tab order. */}
        <SkipLink label={dict.a11y.skipToContent} />
        <MotionFallback />
        <SmoothScroll />
        {children}
        <JsonLd data={buildStructuredData(dict, lang)} />
      </body>
    </html>
  );
}
