import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Turns on `app/global-not-found.tsx`. The root layout is a top-level
    // dynamic segment (`app/[lang]/layout.tsx`), so there is no plain
    // `app/layout.tsx` for a root `not-found.tsx` to render inside — this is
    // the convention Next.js provides for exactly that shape.
    globalNotFound: true,
  },

  images: {
    // Placeholder sources used by the design file. Replace these with the
    // production asset host once real photography is available.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
