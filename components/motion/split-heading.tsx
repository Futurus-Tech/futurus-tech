"use client";

import type { CSSProperties, ElementType } from "react";

import { gsap } from "@/lib/motion/gsap";
import { CSS_EASE, SPLIT } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";
import { cn } from "@/lib/utils/cn";

/**
 * A display heading whose lines rise into view from behind their own mask.
 *
 * The design file splits the heading at runtime by moving each line's children
 * into a generated inner span. Rendering that inner span directly means the
 * markup is already in its final shape on the server: no DOM surgery on
 * hydration, and the masked structure is visible in View Source.
 *
 * `data-split` hides the heading before paint (see globals.css); the effect
 * makes it visible in the same frame it sets the lines' starting offset.
 *
 * `onLoad` hands the whole thing to the stylesheet instead. The hero heading is
 * the first thing on the page, so making it wait for GSAP is making the page's
 * headline wait for a bundle — the CSS animation runs from the first painted
 * frame and needs no script at all.
 */
export function SplitHeading({
  as: Component = "h2",
  lines,
  /** Index of the line set in the accent — the hero's third line. */
  accentLine,
  /** The hero fires on load; every other heading waits for its trigger. */
  onLoad = false,
  className,
  lineClassName,
}: {
  as?: ElementType;
  lines: readonly string[];
  accentLine?: number;
  onLoad?: boolean;
  className?: string;
  lineClassName?: string;
}) {
  const ref = useGsapEffect<HTMLHeadingElement>(
    (root) => {
      // Owned by the stylesheet — see the class comment and globals.css.
      if (onLoad) return;

      const inner = root.querySelectorAll<HTMLElement>("[data-split-line]");
      if (inner.length === 0) return;

      root.style.visibility = "visible";

      // One `fromTo` rather than a `set` plus a `to`: the offset has to belong
      // to the tween that clears it. Written as two tweens, the `set` bakes the
      // offset into the inline transform, and a ScrollTrigger refresh re-reads
      // that as the line's natural `y` — so the reveal animates its `yPercent`
      // half back to zero while the pixel half stays, leaving every scroll-
      // triggered heading parked below its own mask.
      gsap.fromTo(
        inner,
        { yPercent: SPLIT.fromYPercent },
        {
          yPercent: 0,
          duration: SPLIT.duration,
          ease: SPLIT.ease,
          stagger: SPLIT.stagger,
          scrollTrigger: { trigger: root, start: SPLIT.start },
        },
      );
    },
    [onLoad],
  );

  /* Same numbers the tween above uses, handed to the stylesheet. `fromYPercent`
     becomes a percentage because that is what `yPercent` already meant. */
  const loadStyle = {
    "--split-from-y": `${SPLIT.fromYPercent}%`,
    "--split-duration": `${SPLIT.duration}s`,
    "--split-delay": `${SPLIT.heroDelay}s`,
    "--split-stagger": `${SPLIT.stagger}s`,
    "--split-ease": CSS_EASE[SPLIT.ease],
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      data-split={onLoad ? "load" : true}
      className={className}
      style={onLoad ? loadStyle : undefined}
    >
      {lines.map((line, index) => (
        <span key={line} className={cn("mask-line", lineClassName)}>
          <span
            data-split-line
            // The line's place in the stagger. Read by the CSS animation's
            // delay; ignored entirely when GSAP is the one animating.
            style={onLoad ? ({ "--split-index": index } as CSSProperties) : undefined}
            className={cn("block will-change-transform", index === accentLine && "text-accent")}
          >
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
}
