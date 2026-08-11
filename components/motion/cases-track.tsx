"use client";

import type { ReactNode } from "react";

import { gsap } from "@/lib/motion/gsap";
import { CASES } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

/**
 * The horizontal case gallery: the section pins and the card track travels
 * sideways for as long as the reader keeps scrolling down.
 *
 * `gsap.matchMedia` scopes the whole effect to viewports wide enough for it —
 * below 760px the track simply scrolls horizontally on its own, and the pin
 * (which would trap a touch reader) is never created. All measurements are
 * function-based with `invalidateOnRefresh`, so a resize or a late-loading
 * photograph re-measures instead of drifting.
 *
 * Card hover lives here too, so the cards themselves stay Server Components.
 */
export function CasesTrack({
  id,
  header,
  children,
}: {
  id: string;
  header: ReactNode;
  children: ReactNode;
}) {
  const ref = useGsapEffect<HTMLElement>((root) => {
    const track = root.querySelector<HTMLElement>("[data-cases-track]");
    const panel = root.querySelector<HTMLElement>("[data-cases-panel]");
    const progress = root.querySelector<HTMLElement>("[data-cases-progress]");
    if (!track || !panel) return;

    const media = gsap.matchMedia();

    media.add(`(min-width: ${CASES.minWidth}px)`, () => {
      const distance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + CASES.trailingGap);

      gsap.to(track, {
        x: () => -distance(),
        ease: CASES.ease,
        scrollTrigger: {
          trigger: root,
          start: CASES.start,
          end: () =>
            `+=${distance() * CASES.endDistanceFactor + window.innerHeight * CASES.endViewportFactor}`,
          pin: panel,
          scrub: CASES.scrub,
          invalidateOnRefresh: true,
          anticipatePin: CASES.anticipatePin,
          onUpdate: (self) => {
            if (progress) progress.style.width = `${self.progress * 100}%`;
          },
        },
      });
    });

    // Slow push-in on the card being pointed at, with the print draining to
    // colour underneath it.
    const cards = gsap.utils.toArray<HTMLElement>("[data-case]", root);
    const teardown: (() => void)[] = [];

    cards.forEach((card) => {
      const image = card.querySelector<HTMLElement>("[data-case-image]");
      if (!image) return;

      // Explicit, because a custom property that was never set computes to an
      // empty string and GSAP would have no start value to interpolate from.
      gsap.set(image, { [CASES.hover.color.property]: CASES.hover.color.from });

      const hover = (scale: number, grayscale: number) => () => {
        gsap.to(image, { scale, duration: CASES.hover.duration, ease: CASES.hover.ease });
        gsap.to(image, {
          [CASES.hover.color.property]: grayscale,
          duration: CASES.hover.color.duration,
          ease: CASES.hover.color.ease,
        });
      };
      const enter = hover(CASES.hover.scale, CASES.hover.color.to);
      const leave = hover(1, CASES.hover.color.from);

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      teardown.push(() => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    });

    return () => {
      media.revert();
      teardown.forEach((off) => off());
    };
  });

  return (
    <section ref={ref} id={id} className="overflow-hidden border-t-2 border-divider">
      <div
        data-cases-panel
        className="relative flex h-svh min-h-135 flex-col justify-center pb-cases-bottom pt-cases-top"
      >
        {header}

        {/* Below the pin breakpoint the track becomes a plain horizontal
            scroller, so the cards past the fold stay reachable on touch —
            the design file clips them there. */}
        <div className="overflow-x-auto cases:overflow-x-visible">
          <div data-cases-track className="flex w-max gap-6 px-edge">
            {children}
          </div>
        </div>

        <div className="mx-edge mt-cases-prog h-0.75 bg-text/14">
          <div data-cases-progress className="h-full w-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
