"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The single place ScrollTrigger is registered.
 *
 * Registration happens at module scope, so it is done by the time any motion
 * component's effect runs — React flushes child effects before parent effects,
 * which makes a provider-level `registerPlugin` too late for the components
 * nested inside it.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Motion is opt-out: everything animated respects this at the entry point. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
