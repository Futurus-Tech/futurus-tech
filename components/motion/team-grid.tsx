"use client";

import type { ReactNode } from "react";

import { gsap } from "@/lib/motion/gsap";
import { STAGGER, STAGGER_AMOUNT, TEAM_DRIFT } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

/**
 * The team portraits: a staggered entrance, plus a slow vertical drift on every
 * other card that opens the roster up as the reader passes it.
 *
 * Both effects target the same elements and the same property, so they are
 * set up together here. The scrubbed drift is created after the entrance and
 * takes over `y` from it, which is the layering the design file relies on, and
 * it is scoped to wide viewports where there are enough columns for the offset
 * to read as a rhythm rather than as one card out of place.
 *
 * Only the odd cards move, so the most a drifting card can ever close on the
 * row beneath it is `TEAM_DRIFT.fromY`. That is what keeps the effect safe once
 * the roster wraps: the row gap below is larger than that at every width the
 * drift runs at.
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

  /* The roster sizes itself: two up on a phone, then as many 200px tracks as
     the measure holds, which lands on five across at the full 1440px page.
     `auto-fit` collapses the tracks a shorter roster does not use, so the cards
     always fill the row instead of leaving a gap at the end, and a sixth or a
     tenth collaborator wraps into the same rhythm with no change here. */
  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-x-5 gap-y-gap-sm sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
    >
      {children}
    </div>
  );
}
