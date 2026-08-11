import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { MotionFlag } from "@/components/motion/motion-flag";
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
    // `suppressHydrationWarning` because `MotionFlag` stamps `data-fx` on this
    // element before the body is parsed. The attribute depends on the visitor's
    // motion preference, which the server cannot know, so the markup React
    // hydrates against will never carry it. Scoped to <html> only — React
    // suppresses one level deep, so real mismatches below still surface.
    <html
      lang={LOCALE_TAG[lang]}
      className={archivo.variable}
      suppressHydrationWarning
    >
      <body>
        <MotionFlag />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
