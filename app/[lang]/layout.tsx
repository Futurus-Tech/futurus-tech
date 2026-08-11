import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { MotionFallback } from "@/components/motion/motion-fallback";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { archivo } from "@/lib/fonts";
import { LOCALES, LOCALE_TAG, isLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";

import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** Only `pt-br` and `en-us` exist; anything else is a 404 rather than a render. */
export const dynamicParams = false;

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

  return (
    // Nothing touches this element before hydration any more: the pre-paint
    // motion state is a stylesheet rule now, so the server markup and the
    // client's first render agree and no hydration warning has to be
    // suppressed here.
    <html lang={LOCALE_TAG[lang]} className={archivo.variable}>
      <body>
        <MotionFallback />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
