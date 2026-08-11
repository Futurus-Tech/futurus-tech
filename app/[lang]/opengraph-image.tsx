import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

/**
 * The share card, rendered per locale.
 *
 * Built from the same tokens as the page — the Modernist ground, the accent,
 * Archivo at 800 — so a link preview reads as the site rather than as a
 * generic card. `/pt-br` and `/en-us` each get their own image, which is what makes
 * a shared link's preview match the language the sharer was reading.
 */
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const COLOR = {
  bg: "#f3f2f2",
  surface: "#eae9e9",
  text: "#201e1d",
  accent: "#1d4ed8",
  accent700: "#2552c5",
  divider: "rgba(32,30,29,0.4)",
} as const;

const fontDir = join(process.cwd(), "assets", "fonts");

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);

  const [regular, extraBold] = await Promise.all([
    readFile(join(fontDir, "archivo-400.woff")),
    readFile(join(fontDir, "archivo-800.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: COLOR.bg,
          color: COLOR.text,
          fontFamily: "Archivo",
          padding: "64px 72px",
          justifyContent: "space-between",
          borderBottom: `24px solid ${COLOR.accent}`,
        }}
      >
        {/* Masthead — accent square, wordmark, and the tracked tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 22, height: 22, background: COLOR.accent }} />
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", display: "flex" }}>
            <span>{siteConfig.wordmark.lead}</span>
            <span style={{ color: COLOR.accent }}>.</span>
            <span>{siteConfig.wordmark.tail}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              marginLeft: "-0.058em",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {dict.metadata.ogTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${COLOR.divider}`,
            paddingTop: 26,
          }}
        >
          <div
            style={{
              // Sized so the longest tagline (Portuguese) stays on one line
              // next to the email chip.
              fontSize: 19,
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLOR.accent700,
              display: "flex",
              whiteSpace: "nowrap",
            }}
          >
            {dict.metadata.ogTagline}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              background: COLOR.surface,
              padding: "10px 18px",
              display: "flex",
            }}
          >
            {siteConfig.email}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
