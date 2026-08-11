import { Disclosure } from "@/components/motion/disclosure";
import { SplitHeading } from "@/components/motion/split-heading";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { SectionEyebrow } from "@/components/ui/layout-primitives";
import { STAGGER_AMOUNT } from "@/lib/motion/tokens";
import type { Dictionary } from "@/content/types";

export function FaqSection({ content }: { content: Dictionary["faq"] }) {
  return (
    <section id="faq" className="border-t-2 border-divider">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-gap-lg px-edge py-section lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div>
          <SectionEyebrow className="mb-5.5">{content.eyebrow}</SectionEyebrow>
          <SplitHeading lines={content.title} className="-ml-[0.058em] text-title-faq" />
        </div>

        <StaggerGroup stagger={STAGGER_AMOUNT.faq} className="border-t-2 border-divider">
          {content.items.map((item) => (
            <Disclosure
              key={item.question}
              question={item.question}
              answer={item.answer}
              group="faq"
            />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
