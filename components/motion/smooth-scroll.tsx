"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { registerLenis } from "@/lib/motion/scroll-lock";
import { SMOOTH_SCROLL } from "@/lib/motion/tokens";

/**
 * Lenis smooth scrolling, wired to ScrollTrigger.
 *
 * Three jobs, all of which have to happen exactly once for the whole page:
 *  1. drive Lenis from GSAP's ticker, so scroll and tweens share one loop;
 *  2. tell ScrollTrigger to re-measure on every Lenis frame, otherwise pinned
 *     sections drift away from the smoothed scroll position;
 *  3. take over in-page anchor jumps, resolving the target from its live rect
 *     — pin spacers make element-relative resolution unreliable.
 *
 * Renders nothing. Skipped entirely when reduced motion is requested, which
 * leaves the browser's native scrolling in place.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: SMOOTH_SCROLL.lerp,
      wheelMultiplier: SMOOTH_SCROLL.wheelMultiplier,
      touchMultiplier: SMOOTH_SCROLL.touchMultiplier,
      smoothWheel: SMOOTH_SCROLL.smoothWheel,
      syncTouch: SMOOTH_SCROLL.syncTouch,
    });

    registerLenis(lenis);

    /* Lenis rides GSAP's ticker rather than a rAF loop of its own.

       Two independent rAF loops resolve in registration order, so Lenis would
       write a new scroll position in one callback and every scrubbed tween
       would render the *previous* one in the next: a frame of skew that reads
       as stutter, worst exactly where a pin engages or releases. On one ticker
       the scroll and the tweens it drives settle in the same frame. GSAP's
       clock is in seconds, Lenis wants milliseconds.

       `lagSmoothing(0)` for the same reason: after a long frame GSAP would
       otherwise adjust its internal time to hide the gap, which desynchronises
       it from a scroll position Lenis did not adjust. */
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const y = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - SMOOTH_SCROLL.anchor.offset,
      );
      lenis.scrollTo(y, {
        duration: SMOOTH_SCROLL.anchor.duration,
        lock: SMOOTH_SCROLL.anchor.lock,
        onComplete: update,
      });
    };

    document.addEventListener("click", onAnchorClick);

    // Late-loading photographs change section offsets; keep triggers honest.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      // GSAP's documented defaults, restored so unmounting this does not leave
      // the rest of the page's motion without lag smoothing.
      gsap.ticker.lagSmoothing(500, 33);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
