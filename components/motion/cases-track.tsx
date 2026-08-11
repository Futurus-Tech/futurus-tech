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
          /* `scaleX` rather than `width`: a width written on every scroll frame
             lays out and repaints the bar, on the same frames the track is
             already asking for a composite. A transform on a `left` origin is
             the same picture for the compositor alone. */
          onUpdate: (self) => {
            if (progress) progress.style.transform = `scaleX(${self.progress})`;
          },
          /* Promote the track for as long as the pin owns the section, and let
             it go again afterwards. Its layer is then ready before the first
             scrubbed frame rather than being built during it, which is the
             hitch on the way in, and it does not hold memory for the rest of
             the page. */
          onToggle: (self) => {
            track.style.willChange = self.isActive ? "transform" : "auto";
          },
        },
      });

      return () => {
        track.style.willChange = "";
      };
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

      /* A scaling photograph under a `filter` is the most expensive thing in
         the section: the filter has to be re-rasterised at every step of the
         push-in, and the colour drain moves the filter itself. Promoting the
         frame for the length of the hover keeps that off the main thread's
         critical path, and it is released once the pointer has left so a row of
         parked cards does not each hold a layer.

         `overwrite: "auto"` because a pointer crossing cards quickly would
         otherwise leave the enter and leave tweens of one frame fighting over
         the same two properties. */
      const hover = (scale: number, grayscale: number, settled: string) => () => {
        image.style.willChange = "transform, filter";
        gsap.to(image, {
          scale,
          duration: CASES.hover.duration,
          ease: CASES.hover.ease,
          overwrite: "auto",
          // The longer of the two tweens, so this is where the frame is done
          // moving. Held while the pointer stays, dropped once it has left.
          onComplete: () => {
            image.style.willChange = settled;
          },
        });
        gsap.to(image, {
          [CASES.hover.color.property]: grayscale,
          duration: CASES.hover.color.duration,
          ease: CASES.hover.color.ease,
          overwrite: "auto",
        });
      };
      const enter = hover(CASES.hover.scale, CASES.hover.color.to, "transform, filter");
      const leave = hover(1, CASES.hover.color.from, "auto");

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      teardown.push(() => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
        image.style.willChange = "";
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
          {/* Full width, scaled down to nothing: `onUpdate` drives `scaleX`, so
              the resting state has to be expressed the same way. The transform
              is inline rather than a `scale-x-0` class because Tailwind v4
              writes the `scale` property, which would compose with the
              `transform` GSAP's scroll handler writes instead of replacing it,
              and the bar would never appear. */}
          <div
            data-cases-progress
            className="h-full w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
