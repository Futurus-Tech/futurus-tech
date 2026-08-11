"use client";

import type { ReactNode } from "react";

import { gsap } from "@/lib/motion/gsap";
import { STAGGER, STAGGER_AMOUNT, TEAM_DRIFT } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

/**
 * The team portraits: a staggered entrance, plus a slow vertical drift on the
 * second column that opens the grid up as the reader passes it.
 *
 * Both effects target the same elements and the same property, so they are
 * set up together here — the scrubbed drift is created after the entrance and
 * takes over `y` from it, which is the layering the design file relies on.
 * The drift is scoped to wide viewports, where there are actually two columns
 * to play off each other.
 */
export function TeamGrid({ children }: { children: ReactNode }) {
  const ref = useGsapEffect<HTMLDivElement>((root) => {
    const members = gsap.utils.toArray<HTMLElement>("[data-stagger-item]", root);
    if (members.length === 0) return;

    gsap.fromTo(
      members,
      STAGGER.cards.from,
      {
        opacity: 1,
        y: 0,
        duration: STAGGER.cards.duration,
        ease: STAGGER.cards.ease,
        stagger: STAGGER_AMOUNT.members,
        scrollTrigger: { trigger: root, start: STAGGER.cards.start },
      },
    );

    const media = gsap.matchMedia();
    media.add(`(min-width: ${TEAM_DRIFT.minWidth + 1}px)`, () => {
      members.forEach((member, index) => {
        if (index % 2 === 0) return;
        gsap.fromTo(
          member,
          { y: TEAM_DRIFT.fromY },
          {
            y: TEAM_DRIFT.toY,
            ease: TEAM_DRIFT.ease,
            scrollTrigger: {
              trigger: root,
              start: TEAM_DRIFT.start,
              end: TEAM_DRIFT.end,
              scrub: TEAM_DRIFT.scrub,
            },
          },
        );
      });
    });

    return () => media.revert();
  });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-5">
      {children}
    </div>
  );
}
