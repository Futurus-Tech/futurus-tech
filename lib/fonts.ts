import { Archivo } from "next/font/google";

/**
 * Modernist is set entirely in Archivo. Self-hosted through `next/font`, so
 * there is no request to Google at runtime and no layout shift on first paint.
 *
 * It lives here rather than in the layout because `app/global-not-found.tsx`
 * renders its own document and never sees the layout at all. Both routes read
 * the same instance, so `--font-archivo` resolves to one self-hosted face
 * instead of two identical copies with different hashed names.
 */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-archivo",
});
