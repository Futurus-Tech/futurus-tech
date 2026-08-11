"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { gsap } from "@/lib/motion/gsap";
import { ON_LOAD_DELAY, REVEAL } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

export type RevealVariant = keyof typeof REVEAL;

type RevealOwnProps<T extends ElementType> = {
  /**
   * The element to render. `Reveal` becomes the element it animates rather
   * than wrapping it, so it never introduces a box the design did not have.
   */
  as?: T;
  variant?: RevealVariant;
  /**
   * Fire on load instead of on a scroll trigger — for elements that are already
   * in view on first paint, where waiting for a trigger line reads as a stall.
   * Same delay as the hero heading, so the two arrive together.
   */
  onLoad?: boolean;
  className?: string;
  children?: ReactNode;
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

/**
 * A single element that fades and slides in when it crosses its trigger line.
 *
 * `data-reveal` is what the pre-paint rule in globals.css keys off, so the
 * element is already hidden before hydration and there is no flash of the
 * un-animated state.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  variant = "default",
  onLoad = false,
  className,
  children,
  ...props
}: RevealProps<T>) {
  const preset = REVEAL[variant];

  const ref = useGsapEffect<HTMLElement>(
    (root) => {
      gsap.fromTo(
        root,
        preset.from,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: preset.duration,
          ease: preset.ease,
          scrollTrigger: onLoad ? null : { trigger: root, start: preset.start },
          delay: onLoad ? ON_LOAD_DELAY : 0,
        },
      );
    },
    [variant, onLoad],
  );

  const Component = (as ?? "div") as ElementType;

  return (
    <Component ref={ref} data-reveal className={className} {...props}>
      {children}
    </Component>
  );
}
