"use client";

import { gsap } from "@/lib/motion/gsap";
import { PROCESS_PROGRESS } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

/**
 * The rule beside the process steps, filled in proportion to how far through
 * the section the reader is.
 *
 * The trigger is the enclosing `<section>`, resolved from the DOM rather than
 * passed in as a selector — the bar is always rendered inside the section it
 * reports on, so there is nothing to keep in sync.
 */
export function ScrubBar() {
  const ref = useGsapEffect<HTMLDivElement>((root) => {
    const section = root.closest("section");
    const fill = root.firstElementChild;
    if (!section || !fill) return;

    gsap.to(fill, {
      width: "100%",
      ease: PROCESS_PROGRESS.ease,
      scrollTrigger: {
        trigger: section,
        start: PROCESS_PROGRESS.start,
        end: PROCESS_PROGRESS.end,
        scrub: PROCESS_PROGRESS.scrub,
      },
    });
  });

  return (
    <div ref={ref} className="mt-9 h-1 bg-text/15">
      <div className="h-full w-0 bg-accent" />
    </div>
  );
}
