"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { gsap } from "@/lib/motion/gsap";
import { STAGGER } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

export type StaggerVariant = keyof typeof STAGGER;

type StaggerOwnProps<T extends ElementType> = {
  as?: T;
  variant?: StaggerVariant;
  /** Overrides the variant's own stagger — the card grids each set their own. */
  stagger?: number;
  className?: string;
  children?: ReactNode;
};

type StaggerGroupProps<T extends ElementType> = StaggerOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof StaggerOwnProps<T>>;

/**
 * A container whose items rise in together, offset by a fixed stagger, from a
 * single trigger on the container itself.
 *
 * Items are found by `data-stagger-item`, so the container can render a grid
 * of Server Components and only this wrapper crosses the client boundary.
 */
export function StaggerGroup<T extends ElementType = "div">({
  as,
  variant = "cards",
  stagger,
  className,
  children,
  ...props
}: StaggerGroupProps<T>) {
  const preset = STAGGER[variant];
  const amount = stagger ?? ("stagger" in preset ? preset.stagger : 0);

  const ref = useGsapEffect<HTMLElement>(
    (root) => {
      const items = root.querySelectorAll<HTMLElement>("[data-stagger-item]");
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        preset.from,
        {
          opacity: 1,
          y: 0,
          duration: preset.duration,
          ease: preset.ease,
          stagger: amount,
          scrollTrigger: { trigger: root, start: preset.start },
        },
      );
    },
    [variant, amount],
  );

  const Component = (as ?? "div") as ElementType;

  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
}
