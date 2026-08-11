import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Modernist `.tag` — a small label tinted from one of the tonal ramps.
 * `accent-2` reads the same as `accent` by design: the palette is mono, and
 * the second role only exists so both sets resolve.
 */
export type TagVariant = "accent" | "accent-2" | "neutral" | "outline";

const variants: Record<TagVariant, string> = {
  accent: "bg-accent-100 text-accent-800",
  "accent-2": "bg-accent-2-100 text-accent-2-800",
  neutral: "bg-neutral-100 text-neutral-800",
  outline: "border border-accent text-accent",
};

export function Tag({
  variant = "neutral",
  className,
  children,
}: {
  variant?: TagVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-[3px] text-tag",
        // calc(--radius-md * 0.75) — still zero, kept so retuning the system
        // rounds tags proportionally with everything else.
        "rounded-[calc(var(--radius-md)*0.75)]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
