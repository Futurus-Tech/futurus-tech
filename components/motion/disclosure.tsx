"use client";

import { gsap } from "@/lib/motion/gsap";
import { FAQ } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";

/**
 * One FAQ row, built on native `<details>` — the open/close state, keyboard
 * handling and in-page find all come from the browser. The only thing added is
 * motion: the `+` rotates into an `×` and the answer eases in.
 *
 * `group` renders as the `name` attribute, which is what makes the set behave
 * as an accordion: opening one row closes whichever sibling shares the name,
 * and the browser fires `toggle` on the row it closed, so that row's sign
 * animates back to a `+` on its own. Older engines that ignore `name` simply
 * leave the rows independent rather than breaking.
 */
export function Disclosure({
  question,
  answer,
  group,
}: {
  question: string;
  answer: string;
  group: string;
}) {
  const ref = useGsapEffect<HTMLDetailsElement>((root) => {
    const sign = root.querySelector<HTMLElement>("[data-disclosure-sign]");
    const body = root.querySelector("p");

    const onToggle = () => {
      if (sign) {
        gsap.to(sign, {
          rotate: root.open ? FAQ.sign.openRotation : 0,
          duration: FAQ.sign.duration,
          ease: FAQ.sign.ease,
        });
      }
      if (root.open && body) {
        gsap.fromTo(body, FAQ.body.from, {
          opacity: 1,
          y: 0,
          duration: FAQ.body.duration,
          ease: FAQ.body.ease,
        });
      }
    };

    root.addEventListener("toggle", onToggle);
    return () => root.removeEventListener("toggle", onToggle);
  });

  return (
    <details
      ref={ref}
      name={group}
      data-stagger-item
      className="border-b-2 border-divider py-5.5"
    >
      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-5 font-heading text-faq-q font-extrabold">
        <span>{question}</span>
        <span data-disclosure-sign aria-hidden className="flex-none text-[20px] text-accent">
          +
        </span>
      </summary>
      <p className="mt-4 max-w-[60ch] text-body-sm/[1.65] text-text/78">{answer}</p>
    </details>
  );
}
