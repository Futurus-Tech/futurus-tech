import { Marquee } from "@/components/motion/marquee";
import type { Dictionary } from "@/content/types";

/**
 * The technology band between the hero and the numbers. The terms are the same
 * in every language — the design leaves them untranslated.
 */
export function MarqueeSection({ items }: { items: Dictionary["marquee"] }) {
  return (
    <Marquee className="border-b-2 border-divider bg-bg py-4">
      {items.map((item) => (
        <span key={item} className="contents">
          <span className="whitespace-nowrap font-heading text-marquee font-extrabold uppercase">
            {item}
          </span>
          <span aria-hidden className="block size-[7px] flex-none bg-accent" />
        </span>
      ))}
    </Marquee>
  );
}
