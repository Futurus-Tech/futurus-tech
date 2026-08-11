# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # http://localhost:3000, redirects to /pt-br or /en-us
npm run build   # the real check: type errors and prerender failures surface here
npm run start
npm run lint    # eslint (flat config, eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit
```

There is no test framework and no `test` script. `npm run build` plus `npm run lint` is the whole verification story, so run both after any non-trivial change.

`NEXT_PUBLIC_SITE_URL` drives `metadataBase`, canonicals, `hreflang`, the sitemap and OG image URLs (`lib/site.ts`). Unset, it falls back to the Vercel URL and then `http://localhost:3000`.

## Next.js 16 specifics

Read `node_modules/next/dist/docs/` before writing routing or config code. Conventions already in use here that differ from older Next.js:

- `proxy.ts` at the repo root is the middleware file. It matches `/` only.
- `params` is a Promise in layouts, pages and `generateMetadata`, and must be awaited.
- `app/global-not-found.tsx` renders its own complete `<html>` document, enabled by `experimental.globalNotFound` in `next.config.ts`. It exists because the root layout is `app/[lang]/layout.tsx`, a top-level dynamic segment, so there is no `app/layout.tsx` for a plain `not-found.tsx` to render inside. Anything global (stylesheet, font, `MotionFallback`) has to be added to both documents.

Path alias: `@/*` maps to the repo root.

## Architecture

`README.md` documents the structure, the locale routing decision table and the deliberate departures from the design file. Read it first. What follows is the part that constrains how you write code.

### Server by default, client only for motion

Every section in `components/sections/` is a Server Component that takes a slice of the dictionary as a prop. The only Client Components are `components/motion/*`, the mobile menu, the language toggle and the contact form.

Motion wrappers render *as* the element they animate rather than around it: `<Reveal as="p">` produces one `<p>`, and `StaggerGroup` finds its children through the `data-stagger-item` attribute so a grid of Server Components can stay on the server. When adding motion, nest the client island inside the server section rather than marking the section `"use client"`.

Animations go through `useGsapEffect` (`lib/motion/use-gsap-effect.ts`), which scopes them to one element via `gsap.context` and reverts tweens, ScrollTriggers and GSAP's inline styles on unmount. Register no GSAP plugin anywhere but `lib/motion/gsap.ts`.

### Three files own all the numbers

- `app/globals.css` owns every colour, size, spacing and breakpoint, declared in `@theme`. Tailwind's stock palette, radii, shadows and breakpoints are cleared with `--color-*: initial` and friends, so `text-blue-500` does not resolve at all and `sm:` means the design's 700px rather than Tailwind's 640px. Add a token here rather than a literal at the call site. When you add a `--text-*` token, also add its name to the `font-size` class group in `lib/utils/cn.ts`, or `cn()` will stop resolving conflicts between it and the rest of the scale.
- `lib/motion/tokens.ts` owns every easing curve, duration, offset and ScrollTrigger boundary, transcribed from the design file. No component invents a timing number.
- `content/media.ts` owns every image `src`, keyed by ids that `content/types.ts` re-exports (`CaseId`, `QuoteId`, `TeamMemberId`). Copy is localised, photography is not.

### Content is typed, not free-form

`content/types.ts` defines `Dictionary`; `content/pt-br.ts` and `content/en-us.ts` both satisfy it. Adding a section, a field or an FAQ entry means editing the type first, then both locale files, and the compiler catches the one you forgot. Sections read copy only through `getDictionary(locale)` (`lib/i18n/dictionaries.ts`), never by importing a locale file directly.

`lib/i18n/config.ts` is imported by `proxy.ts`, which runs before the app, so it must stay free of React and Node imports.

## Gotchas

- **Pre-paint motion state.** CSS at the bottom of `globals.css` hides `[data-reveal]`, `[data-split]` and `[data-stagger-item]` under `@media (prefers-reduced-motion: no-preference)`, so there is no flash before GSAP takes over. Anything animated in must carry one of those attributes. `MotionFallback` renders the matching `<noscript>` override that reveals them when scripting is off; both documents render it. No inline script and no `dangerouslySetInnerHTML` anywhere in the app: do not reintroduce one for this.
- **Above the fold animates in CSS, not GSAP.** `data-reveal="load"` and `data-split="load"` are driven by the `reveal-rise` / `split-rise` keyframes in `globals.css`, and `Reveal` / `SplitHeading` return early from `useGsapEffect` when `onLoad` is set. This exists because the hero was the Largest Contentful Paint and was waiting on hydration to become visible. The keyframes name only which properties move; every distance, duration, delay and curve arrives as a custom property read from `lib/motion/tokens.ts`, so that file is still the only place a motion number is written. Animating an `onLoad` element in GSAP as well makes it fall back and rise twice.
- **Structured data is a `<script type="application/ld+json">` with a string child** (`components/seo/json-ld.tsx`), the same technique `MotionFallback` uses for its `<style>`. `<`, `>` and `&` are escaped to their `\u` forms so a value containing `</script>` cannot close the block. Build the graph in `lib/seo/structured-data.ts` from the dictionary — never assert anything the page does not also say in words.
- **Ink tints below 65% are for fields and hairlines, never for type.** The ink is near-black, so `text-text/62` is already 4.37:1 on the surface. `--color-control-border` exists for the borders that are the only edge of a form control, which WCAG holds to 3:1; `--color-divider` stays where it is for the decorative section rules.
- **Reduced motion is opt-out at the entry point.** `useGsapEffect` bails and Lenis is never constructed under `prefers-reduced-motion: reduce`. Do not add an animation that runs outside that gate.
- **`mask-line` and `SPLIT.fromYPercent` move together.** The utility's descender padding sets how far a masked heading line has to travel to clear its window; changing one without the other clips glyphs or reveals the line early.
- **Remote images.** Placeholder photography points at `picsum.photos` and `i.pravatar.cc`, allowed through `images.remotePatterns` in `next.config.ts`. A new host needs an entry there.
- **The design source is not in the repo.** `design/Futurus Tech.dc.html`, cited throughout the comments and ignored in `eslint.config.mjs`, is reference material that is not checked in. Treat the comments as the record of what it said.
- **The contact form posts nowhere.** `components/sections/contact-form.tsx` acknowledges locally; wiring it up means replacing `onSubmit` with a Server Action.
