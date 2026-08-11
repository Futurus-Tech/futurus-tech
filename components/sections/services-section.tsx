import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Container, SectionEyebrow } from "@/components/ui/layout-primitives";
import type { Dictionary } from "@/content/types";

export function ServicesSection({ content }: { content: Dictionary["services"] }) {
  return (
    <section id="servicos">
      <Container className="pb-section-end pt-section-lg">
        <SectionEyebrow className="mb-[34px]">{content.eyebrow}</SectionEyebrow>

        <SplitHeading
          lines={content.title}
          className="mb-title-gap -ml-[0.058em] max-w-[20ch] text-title-services"
        />

        <div className="border-t-2 border-divider">
          {content.items.map((service, index) => (
            <Reveal
              key={service.title}
              variant="service"
              className="grid grid-cols-[56px_minmax(0,1fr)] items-baseline gap-4 gap-x-gap-sm border-b-2 border-divider py-6.5 transition-colors duration-150 hover:bg-text/4 md:grid-cols-[88px_minmax(0,300px)_minmax(0,1fr)]"
            >
              <span className="font-heading text-[14px] font-extrabold text-accent tnum">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-service-title">{service.title}</h3>

              {/* The paragraph aligns under the title on narrow viewports
                  instead of dropping into the 56px number column. */}
              <p className="col-start-2 max-w-[56ch] text-body-sm text-text/78 md:col-start-3">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
