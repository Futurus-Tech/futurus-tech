/**
 * Single source of truth for identity and absolute URLs.
 *
 * `url` drives `metadataBase`, canonical links, hreflang alternates, the
 * sitemap and the OG image, so every absolute URL in the app derives from one
 * value. Set `NEXT_PUBLIC_SITE_URL` per environment; the Vercel fallback keeps
 * preview deployments self-consistent.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Futurus Tech",
  wordmark: { lead: "FUTURUS", tail: "TECH" },
  url: resolveSiteUrl(),
  email: "contato@futurustech.com",
  linkedin: "https://www.linkedin.com/company/futurus-tech",
  linkedinHandle: "linkedin.com/company/futurus-tech",
} as const;

export const siteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
