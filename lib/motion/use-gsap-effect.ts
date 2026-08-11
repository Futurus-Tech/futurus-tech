"use client";

import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";

import { gsap, prefersReducedMotion } from "./gsap";

/** `useLayoutEffect` warns during SSR; motion only ever runs on the client. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Setup<T extends HTMLElement> = (root: T) => void | (() => void);

/**
 * Runs a GSAP setup function scoped to one element, with cleanup.
 *
 * Every tween and ScrollTrigger created inside the callback is recorded by the
 * `gsap.context` and undone by `ctx.revert()` on unmount — which also restores
 * the inline styles GSAP wrote, so a remount starts from clean markup. A
 * cleanup function returned from `setup` (for DOM listeners GSAP does not know
 * about) is run as part of the same revert.
 *
 * This is what keeps each animation owned by the component that renders it
 * rather than by one global teardown, and it is why the sections themselves can
 * stay Server Components.
 *
 * Returns the ref to attach to the element being animated.
 */
export function useGsapEffect<T extends HTMLElement = HTMLDivElement>(
  setup: Setup<T>,
  deps: DependencyList = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);

  // The setup callback is read through a ref so that passing an inline arrow —
  // which every caller does — does not tear down and rebuild the animation on
  // each render. `deps` stays the explicit contract for when it should.
  const setupRef = useRef(setup);
  useIsomorphicLayoutEffect(() => {
    setupRef.current = setup;
  });

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => setupRef.current(root), root);
    return () => {
      ctx.revert();
    };
  }, deps);

  return ref;
}
