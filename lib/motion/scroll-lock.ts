"use client";

import type Lenis from "lenis";

/**
 * A tiny registry for the page's single Lenis instance.
 *
 * The full-screen menu has to stop the page behind it, but it is mounted in a
 * different branch of the tree from `SmoothScroll`. Threading the instance
 * through context would put a provider around the whole app for one call, so
 * the instance is registered here instead. Anything that only needs to lock
 * scrolling — and works fine if smooth scrolling is off — reads it from here.
 */
let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function lockScroll(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();

  // Native scrolling still has to be stopped: reduced-motion visitors never
  // get a Lenis instance at all.
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
