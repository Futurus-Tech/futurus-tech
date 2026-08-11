import "server-only";

import type { Dictionary } from "@/content/types";
import type { Locale } from "./config";

/**
 * Dictionaries are loaded per locale so a build only pulls the copy a route
 * actually renders. Every section reads from here, never from `pt-br`/`en-us`
 * directly, which is what keeps the locale a parameter rather than a fork.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  "pt-br": () => import("@/content/pt-br").then((mod) => mod.ptBR),
  "en-us": () => import("@/content/en-us").then((mod) => mod.enUS),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
