"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { ScrollTrigger, prefersReducedMotion } from "@/lib/motion/gsap";
import { registerLenis } from "@/lib/motion/scroll-lock";
import { SMOOTH_SCROLL } from "@/lib/motion/tokens";

/**
 * Lenis smooth scrolling, wired to ScrollTrigger.
 *
 * Three jobs, all of which have to happen exactly once for the whole page:
 *  1. drive Lenis from a single rAF loop;
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

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

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
      cancelAnimationFrame(frame);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
