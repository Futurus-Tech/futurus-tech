import { HeroReel } from "@/components/motion/hero-reel";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ButtonLink } from "@/components/ui/button";
import { AccentSquare } from "@/components/ui/layout-primitives";
import type { Dictionary } from "@/content/types";

export function HeroSection({ content }: { content: Dictionary["hero"] }) {
  return (
    <section id="top" className="mx-auto max-w-page pt-hero-top">
      <div className="px-edge">
        <Reveal className="mb-7 flex items-baseline gap-3.5">
          <AccentSquare />
          <span className="text-eyebrow font-semibold uppercase text-accent-700">
            {content.eyebrow}
          </span>
        </Reveal>

        <SplitHeading
          as="h1"
          lines={content.title}
          accentLine={content.title.length - 1}
          onLoad
          className="ml-[-0.058em] text-hero"
        />

        <div className="mt-11 grid grid-cols-1 items-end gap-8 gap-x-gap-md lg:grid-cols-2">
          <Reveal as="p" className="m-0 max-w-[46ch] text-lead text-text/80">
            {content.lead}
          </Reveal>

          {/* `onLoad` — the actions sit above the fold, so they ride the
              heading's entrance instead of waiting on a trigger line the
              visitor has already scrolled past. */}
          <Reveal onLoad className="flex flex-wrap gap-3.5">
            <ButtonLink href={content.primaryCta.href} variant="primary" size="lg">
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.secondaryCta.href} variant="secondary" size="lg">
              {content.secondaryCta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      <HeroReel
        frames={content.reel.frames}
        captionSuffix={content.reel.captionSuffix}
        scrollCue={content.reel.scrollCue}
      />
    </section>
  );
}
