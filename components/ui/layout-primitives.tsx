import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

/**
 * The page's structural vocabulary.
 *
 * Modernist organises by alignment and by the strength of its rules: a 1440px
 * measure, a fluid `--edge` gutter, and 2px dividers between major sections.
 * These three components are the only places those decisions are written down.
 */

/** The 1440px measure with the fluid page gutter. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-page px-edge", className)}>{children}</div>;
}

export type SectionProps = {
  id?: string;
  /** The 2px rule that separates major sections. */
  ruled?: boolean;
  /** Fills the band with `--color-surface` instead of the page ground. */
  surface?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, ruled = true, surface = false, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(ruled && "border-t-2 border-divider", surface && "bg-surface", className)}
    >
      {children}
    </section>
  );
}

/**
 * The solid accent square that opens every eyebrow, bullet and wordmark.
 * Sizes are the ones the design uses: 12px in the masthead, 10px on section
 * eyebrows, 9px in the client grid, 8px on plan bullets, 7px in the marquee.
 */
export function AccentSquare({
  size = 10,
  className,
}: {
  size?: 7 | 8 | 9 | 10 | 12;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cn("block flex-none bg-accent", className)}
    />
  );
}

/** Accent square + tracked uppercase label: the opening line of every section. */
export function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex items-baseline gap-3.5", className)}>
      <AccentSquare />
      <span className="text-eyebrow font-semibold uppercase text-accent-700">{children}</span>
    </Reveal>
  );
}
