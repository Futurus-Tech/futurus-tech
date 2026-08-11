"use client";

import type { ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { MARQUEE } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";
import { cn } from "@/lib/utils/cn";

/**
 * A seamless horizontal loop whose speed is eased by how fast the page is
 * being scrolled.
 *
 * The track holds the content twice: the tween travels exactly one copy's
 * width and a modifier wraps `x` back into that range, so the seam never
 * lands on screen and there is no restart to see. Duplicating in the markup
 * (rather than cloning the DOM on mount, as the design file does) keeps the
 * loop correct from the first painted frame.
 *
 * The duplicate is `aria-hidden` — a screen reader should read the list once.
 */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useGsapEffect<HTMLDivElement>((root) => {
    const track = root.querySelector<HTMLElement>("[data-marquee-track]");
    if (!track) return;

    const half = () => track.scrollWidth / 2;

    gsap.set(track, { x: 0 });
    const loop = gsap.to(track, {
      x: () => -half(),
      duration: MARQUEE.duration,
      ease: MARQUEE.ease,
      repeat: -1,
      modifiers: { x: (x: string) => `${(parseFloat(x) % half())}px` },
    });

    const setSpeed = gsap.quickTo(loop, "timeScale", {
      duration: MARQUEE.speed.duration,
      ease: MARQUEE.speed.ease,
    });

    ScrollTrigger.create({
      trigger: root,
      start: MARQUEE.trigger.start,
      end: MARQUEE.trigger.end,
      onUpdate: (self) =>
        setSpeed(1 + Math.min(Math.abs(self.getVelocity()) / MARQUEE.speed.divisor, MARQUEE.speed.max)),
      onLeave: () => setSpeed(1),
      onLeaveBack: () => setSpeed(1),
    });
  });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div data-marquee-track className="flex w-max items-center gap-10">
        {children}
        <span aria-hidden className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}
