"use client";

import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

import { gsap } from "@/lib/motion/gsap";
import { CSS_EASE, ON_LOAD_DELAY, REVEAL } from "@/lib/motion/tokens";
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
   *
   * It also changes *who* animates: an element marked this way is animated by
   * the stylesheet rather than by GSAP, because it is on screen before the
   * script exists and should not have to wait for it. See the "first paint"
   * block in globals.css.
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
  style,
  children,
  ...props
}: RevealProps<T>) {
  const preset = REVEAL[variant];

  const ref = useGsapEffect<HTMLElement>(
    (root) => {
      // The stylesheet owns this one. Running the tween as well would set the
      // opening frame a second time, after the CSS animation had already
      // played it, and the element would drop back and rise twice.
      if (onLoad) return;

      gsap.fromTo(root, preset.from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: preset.duration,
        ease: preset.ease,
        scrollTrigger: { trigger: root, start: preset.start },
      });
    },
    [variant, onLoad],
  );

  const from: { x?: number; y?: number } = preset.from;

  /* The stylesheet declares which properties move; the distances, the duration
     and the curve all come from the tokens, handed over as custom properties so
     no motion number is ever written twice. */
  const loadStyle = {
    "--reveal-from-x": `${from.x ?? 0}px`,
    "--reveal-from-y": `${from.y ?? 0}px`,
    "--reveal-duration": `${preset.duration}s`,
    "--reveal-delay": `${ON_LOAD_DELAY}s`,
    "--reveal-ease": CSS_EASE[preset.ease],
  } as CSSProperties;

  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      ref={ref}
      data-reveal={onLoad ? "load" : true}
      className={className}
      style={onLoad ? { ...loadStyle, ...style } : style}
      {...props}
    >
      {children}
    </Component>
  );
}
