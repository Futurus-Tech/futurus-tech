import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Modernist `.btn` — the action primitive.
 *
 * Geometry, type and padding come straight from the system stylesheet:
 * 14px/1.2 heading type, `--space-2` block padding, `--space-3 * 1.2` inline
 * padding, square corners. Hover and pressed states come from the accent ramp,
 * never from browser defaults.
 */

export type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * `inverse` is the variant set used on an accent field — the "next case" card —
 * where the ground and the ink swap roles.
 */
export type ButtonTone = "default" | "inverse";

/**
 * `md` is the system's button, unchanged. `lg` is the hero pair: one step up in
 * type and a proportionally wider box, so the actions hold their own under a
 * 120px display heading without reading as a second, competing element.
 */
export type ButtonSize = "md" | "lg";

const base = cn(
  "inline-flex cursor-pointer items-center justify-center gap-[6px]",
  "border border-transparent no-underline",
  "font-heading font-extrabold",
  "rounded-md transition-colors duration-150",
  "disabled:cursor-not-allowed disabled:opacity-45",
  "[&_svg]:block",
);

const sizes: Record<ButtonSize, string> = {
  // --space-2 block, --space-3 * 1.2 inline (8px / 14.4px on the 4px base step).
  // Written as calc() because Tailwind's spacing scale only takes .5 steps.
  md: "text-[14px]/[1.2] px-[calc(var(--spacing)*3.6)] py-2",
  lg: "text-[15.5px]/[1.2] px-[calc(var(--spacing)*5)] py-2.5",
};

const variants: Record<ButtonTone, Record<ButtonVariant, string>> = {
  default: {
    // The base accent already sits at the ramp's 700 step, so the pressed
    // states step to 800/900 to stay perceptible.
    primary: "bg-accent text-bg hover:bg-accent-800 active:bg-accent-900",
    secondary: "border-divider text-text hover:bg-text/7 active:bg-text/14",
    ghost: "px-1 text-accent hover:bg-accent/10 active:bg-accent/18",
  },
  inverse: {
    primary: "bg-bg text-accent hover:bg-accent-100 active:bg-accent-200",
    secondary: "border-bg text-bg hover:bg-bg/15 active:bg-bg/25",
    ghost: "border-bg px-1 text-bg hover:bg-bg/10 active:bg-bg/18",
  },
};

type SharedProps = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  /** Full-width, label flush left — Modernist's `.btn-block`. */
  block?: boolean;
  children: ReactNode;
  className?: string;
};

export function buttonClassName({
  variant = "secondary",
  tone = "default",
  size = "md",
  block = false,
  className,
}: Omit<SharedProps, "children"> = {}) {
  return cn(
    base,
    sizes[size],
    // After the size, so `ghost` keeps its own flush inline padding.
    variants[tone][variant],
    block && "mt-2 w-full justify-start text-left",
    className,
  );
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, tone, size, block, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonClassName({ variant, tone, size, block, className })} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>;

/** The same affordance rendered as an anchor — used for every in-page jump. */
export function ButtonLink({
  variant,
  tone,
  size,
  block,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClassName({ variant, tone, size, block, className })} {...props}>
      {children}
    </a>
  );
}
