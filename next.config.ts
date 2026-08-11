import type { NextConfig } from "next";

import { IMAGE_HOSTS } from "./lib/images";

const nextConfig: NextConfig = {
  experimental: {
    // Turns on `app/global-not-found.tsx`. The root layout is a top-level
    // dynamic segment (`app/[lang]/layout.tsx`), so there is no plain
    // `app/layout.tsx` for a root `not-found.tsx` to render inside — this is
    // the convention Next.js provides for exactly that shape.
    globalNotFound: true,
  },

  images: {
    // Placeholder sources used by the design file, listed in `lib/images.ts`
    // because the layout preconnects to the same hosts. Replace them there
    // with the production asset host once real photography is available.
    remotePatterns: IMAGE_HOSTS.map((hostname) => ({ protocol: "https" as const, hostname })),

    // AVIF first: the hero frame is a full-bleed photograph, and it is the one
    // request on the page where the extra encoding time is repaid several
    // times over in bytes on the wire.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
