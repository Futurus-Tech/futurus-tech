import { Reveal } from "@/components/motion/reveal";
import { ScrubBar } from "@/components/motion/scrub-bar";
import { SplitHeading } from "@/components/motion/split-heading";
import { SectionEyebrow } from "@/components/ui/layout-primitives";
import type { Dictionary } from "@/content/types";

export function ProcessSection({ content }: { content: Dictionary["process"] }) {
  return (
    <section id="processo" className="border-t-2 border-divider bg-surface">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-gap-xl px-edge py-section-lg lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          {/* Sticky only where there is a second column to stay beside. */}
          <div className="static top-[120px] lg:sticky">
            <SectionEyebrow className="mb-7">{content.eyebrow}</SectionEyebrow>

            <SplitHeading
              lines={content.title}
              className="mb-6 -ml-[0.058em] text-title-process"
            />

            <Reveal as="p" className="m-0 max-w-[40ch] text-body text-text/78">
              {content.intro}
            </Reveal>

            <ScrubBar />
          </div>
        </div>

        <div className="border-t-2 border-divider">
          {content.steps.map((step, index) => (
            <Reveal
              key={step.title}
              variant="step"
              className="border-b-2 border-divider py-7.5"
            >
              <div className="flex items-baseline gap-4.5">
                <span className="font-heading text-step-num font-extrabold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-step-title">{step.title}</h3>
              </div>
              <p className="mt-4 max-w-[54ch] text-body-sm text-text/78">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
