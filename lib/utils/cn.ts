import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge does not know about the Modernist type scale, so without this
 * it treats `text-hero` and `text-lead` as unrelated and lets both survive a
 * merge. Registering the scale keeps "last one wins" true for every token.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "hero",
            "poster",
            "menu",
            "title-services",
            "title-cases",
            "title-process",
            "title-section",
            "title-faq",
            "stat",
            "step-num",
            "case-num",
            "plan-title",
            "step-title",
            "service-title",
            "case-title",
            "faq-q",
            "post-title",
            "case-metric",
            "brand",
            "brand-sm",
            "logo",
            "lead",
            "body-lg",
            "body",
            "body-sm",
            "body-xs",
            "case-body",
            "note",
            "fine",
            "eyebrow",
            "nav",
            "label",
            "kicker",
            "marquee",
            "tag",
            "quote-mark",
          ],
        },
      ],
    },
  },
});

/** Compose conditional class names, resolving Tailwind conflicts last-wins. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
