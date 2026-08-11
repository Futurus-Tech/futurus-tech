import type { MetadataRoute } from "next";

import { DEFAULT_LOCALE, LOCALE_TAG } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

/**
 * The web app manifest.
 *
 * There is exactly one per origin — it is not a routed document and cannot be
 * negotiated per visitor — so it is written in the default locale, the same
 * answer `proxy.ts` gives a request it cannot place. Everything a visitor
 * actually reads is localised elsewhere; this file only names the icon, the
 * ground colour and where an installed shortcut lands.
 *
 * `start_url` points at the bare root rather than at `/pt-br`, so an installed
 * shortcut goes back through the locale negotiation instead of pinning whoever
 * installed it to Portuguese for good.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const dict = await getDictionary(DEFAULT_LOCALE);

  return {
    name: `${siteConfig.name} · ${dict.metadata.ogTagline}`,
    short_name: siteConfig.name,
    description: dict.metadata.description,
    lang: LOCALE_TAG[DEFAULT_LOCALE],
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f3f2f2",
    theme_color: "#f3f2f2",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
