"use client";

import { gsap } from "@/lib/motion/gsap";
import { COUNTER } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

/**
 * A figure that counts up to its value the first time it scrolls into view.
 *
 * The final value is rendered on the server, so the number is correct in the
 * HTML, in search results and with JavaScript off — the animation only ever
 * replaces text that is already there.
 */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useGsapEffect<HTMLParagraphElement>(
    (root) => {
      const counter = { current: 0 };
      gsap.to(counter, {
        current: value,
        duration: COUNTER.duration,
        ease: COUNTER.ease,
        scrollTrigger: { trigger: root, start: COUNTER.start },
        onUpdate: () => {
          root.textContent = `${Math.round(counter.current)}${suffix}`;
        },
      });
    },
    [value, suffix],
  );

  return (
    <p ref={ref} className={className}>
      {value}
      {suffix}
    </p>
  );
}
