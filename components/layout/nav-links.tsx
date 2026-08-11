"use client";

import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { MASTHEAD } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";
import type { NavItem } from "@/content/types";

/**
 * The desktop navigation, with the current section highlighted in the accent.
 *
 * Which section counts as current is measured live against a fixed reading
 * line rather than derived from a set of scroll offsets: pinned sections and
 * late-loading photographs both move the offsets around, and measuring the
 * rect each frame means a click and a scroll always resolve to the same
 * section. Colours are read from the design tokens once, so GSAP interpolates
 * real values instead of `var()` strings.
 */
export function NavLinks({ items }: { items: readonly NavItem[] }) {
  const ref = useGsapEffect<HTMLElement>(
    (root) => {
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--color-accent").trim();
      const ink = styles.getPropertyValue("--color-text").trim();

      const pairs = gsap.utils
        .toArray<HTMLAnchorElement>("a", root)
        .map((anchor) => ({
          anchor,
          section: document.querySelector(anchor.getAttribute("href") ?? ""),
        }))
        .filter((pair): pair is { anchor: HTMLAnchorElement; section: Element } =>
          Boolean(pair.section),
        );

      let current: HTMLAnchorElement | null = null;

      const sync = () => {
        let hit: HTMLAnchorElement | null = null;
        for (const { anchor, section } of pairs) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= MASTHEAD.readingLine && rect.bottom > MASTHEAD.readingLine) {
            hit = anchor;
          }
        }
        if (hit === current) return;

        if (current) {
          gsap.to(current, { color: ink, duration: MASTHEAD.navHighlightDuration });
          current.removeAttribute("aria-current");
        }
        if (hit) {
          gsap.to(hit, { color: accent, duration: MASTHEAD.navHighlightDuration });
          hit.setAttribute("aria-current", "true");
        }
        current = hit;
      };

      ScrollTrigger.create({ start: 0, end: "max", onUpdate: sync, onRefresh: sync });
      sync();
    },
    [items],
  );

  return (
    <nav ref={ref} className="hidden items-center gap-[26px] nav:flex">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-nav font-semibold uppercase text-text hover:text-accent"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
