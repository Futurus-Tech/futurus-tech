# Futurus Tech

Landing page built from `design/Futurus Tech.dc.html` on Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, GSAP + ScrollTrigger and Lenis.

## Running

```bash
npm run dev     # http://localhost:3000 → redirects to /pt-br or /en-us
npm run build
npm run start
npm run lint
```

### Environment

| Variable               | Required        | What it does                                                                      |
| ---------------------- | --------------- | --------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | for production  | Origin used for `metadataBase`, canonical URLs, `hreflang`, the sitemap and OG image URLs. Falls back to the Vercel deployment URL, then `http://localhost:3000`. |

Set it to the real origin (`https://futurustech.com`) before deploying, or every absolute URL in
the page metadata will point at localhost.

## Architecture

```
app/
  [lang]/                  Root layout — Archivo, metadata, motion flag, smooth scroll
    page.tsx               The landing page: 14 sections in reading order
    opengraph-image.tsx    Share card, rendered per locale
  globals.css              The design system: tokens, base layer, utilities
  robots.ts  sitemap.ts
proxy.ts                   Locale routing for the unlocalised root
components/
  layout/                  Masthead, navigation, language switch, footer
  motion/                  Client islands — one per effect
  sections/                One Server Component per section
  ui/                      Design-system primitives
content/                   Typed copy (pt-br/en-us) + image assets
lib/
  i18n/                    Locale config, dictionaries, request-time resolution
  motion/                  GSAP setup, motion tokens, the useGsapEffect hook
  seo/                     Metadata builder
```

### Server by default, client only for motion

Every section is a Server Component. The parts that animate are small client components in
`components/motion/`, and sections nest their content inside them — so a section's markup is still
rendered on the server and only the effect crosses the client boundary. `Reveal` renders *as* the
element it animates (`as="p"`, `as="dl"`, …) rather than wrapping it, so no extra boxes enter the
layout.

The interactive islands are the mobile menu, the language switch and the contact form.

### The design system

`app/globals.css` is the only place a colour, size or spacing value is defined. The Modernist
tokens are declared in `@theme`, which makes each one reachable both as a Tailwind utility
(`bg-accent`, `text-lead`, `px-edge`) and as a custom property (`var(--color-accent)`).

- **Strict palette.** Tailwind's stock colours are cleared with `--color-*: initial`, so only
  Modernist roles resolve and a stray `text-blue-500` fails loudly.
- **Type scale by role.** Every size the design uses is a named token carrying its own leading and
  tracking — `text-hero`, `text-title-section`, `text-body-sm`, `text-eyebrow`.
- **Spacing.** The base step is `4px`, which reproduces Modernist's `--space-1…8` as `1 2 3 4 6 8`.
  Fluid rhythms keep their original `clamp()` under names like `--spacing-edge`, `--spacing-section`.
- **Breakpoints.** The design file switched layout from JavaScript at 700/760/880/940/1040px. Those
  exact widths are the system's breakpoints (`sm`, `cases`, `md`, `nav`, `lg`), so the same
  behaviour is now declarative CSS.
- **Ink tints.** The design's `color-mix(in srgb, var(--color-text) N%, transparent)` is written as
  Tailwind's opacity modifier (`text-text/78`), which resolves to the identical `rgba`.

### Motion

`lib/motion/tokens.ts` holds every easing curve, duration, offset and ScrollTrigger boundary,
transcribed one-for-one from the design file's `animate()` block. No component invents a number, so
a timing regression shows up as a diff in that one file.

`useGsapEffect` scopes each animation to its own element through `gsap.context`, and reverts it —
tweens, ScrollTriggers and the inline styles GSAP wrote — on unmount.

Motion is opt-out throughout: with `prefers-reduced-motion: reduce`, Lenis is never created and no
effect is registered. A blocking inline script sets `data-fx` on `<html>` only when motion will
actually run, which is what hides the animated-in elements before first paint without stranding
them when JavaScript or motion is unavailable.

### Locales, geolocation and link previews

`/pt-br` and `/en-us` are the real pages, both statically generated with their own metadata, `hreflang`
alternates and OG image. `/` only decides where to send a request, in `proxy.ts`:

1. an explicit choice remembered in the `NEXT_LOCALE` cookie;
2. a social crawler — served the default locale by **rewrite**, never geolocated, because a bot's
   datacentre says nothing about its audience;
3. geolocation (`x-vercel-ip-country`, `cf-ipcountry`, and others) — Brazil and the rest of the
   Lusophone world get Portuguese;
4. `Accept-Language`;
5. the default, `pt-br`.

People get a **redirect**, so the URL in their address bar is already language-specific. That is
what makes shared links correct: when someone in Brazil pastes their URL into WhatsApp, LinkedIn or
Discord, the crawler fetches `/pt-br` and builds a Portuguese card — even though the crawler itself is
in another country. A bare `/` still renders (rewritten to the default locale) so it always has a
card, with `og:locale:alternate` and `hreflang` declaring the other language.

The decision is echoed on the response as `x-locale` / `x-locale-reason` for debugging.

## Deliberate departures from the design file

The port is otherwise value-for-value. Four places where it isn't:

- **Language switching** is routing rather than a runtime `textContent` swap, which is what allows
  the sections to stay on the server and the previews to be language-correct.
- **Service rows below 880px.** The design's responsive script switches the row to a `56px 1fr`
  grid, which drops the description into the 56px number column. Here the description aligns under
  the title instead.
- **Case cards below 760px.** The design disables the horizontal gallery there and the cards past
  the fold become unreachable. Here the track becomes a plain horizontal scroller.
- **The case gallery's scrub and travel.** The design's `scrub: 1.1` and 1.25 scroll-to-travel
  ratio assumed native scrolling. Under Lenis they smooth an already-smoothed position and move the
  track slower than the wheel, which reads as lag on the way in, through and out. `CASES` in
  `lib/motion/tokens.ts` carries the retuned values and the reasoning.

## Placeholder assets

Photography still points at `picsum.photos` and `i.pravatar.cc`, as in the design file. Replace the
entries in `content/media.ts` — one file — and drop the matching `remotePatterns` from
`next.config.ts`.

The contact form acknowledges locally and posts nowhere. Wiring it up means replacing the
`onSubmit` handler in `components/sections/contact-form.tsx` with a Server Action.
