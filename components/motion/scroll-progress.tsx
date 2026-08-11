"use client";

import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

/**
 * Reading progress, drawn into the masthead's own bottom rule.
 */
export function ScrollProgress() {
  const ref = useGsapEffect<HTMLDivElement>((root) => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(root, { width: `${self.progress * 100}%` }),
    });
  });

  return <div ref={ref} className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent" />;
}
