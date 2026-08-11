import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { AccentSquare, Container, SectionEyebrow } from "@/components/ui/layout-primitives";
import type { Dictionary } from "@/content/types";

export function ClientsSection({ content }: { content: Dictionary["clients"] }) {
  return (
    <section id="clientes" className="border-t-2 border-divider">
      <Container className="py-section">
        <SectionEyebrow className="mb-6.5">{content.eyebrow}</SectionEyebrow>

        <SplitHeading
          lines={content.title}
          className="mb-title-gap-sm -ml-[0.058em] max-w-[26ch] text-title-section"
        />

        <StaggerGroup
          variant="logos"
          className="grid grid-cols-2 border-l-2 border-t-2 border-divider sm:grid-cols-3 lg:grid-cols-4"
        >
          {content.logos.map((logo) => (
            <div
              key={logo.name}
              data-stagger-item
              className="flex aspect-16/9 flex-col justify-center gap-2 border-b-2 border-r-2 border-divider bg-bg px-logo-x transition-colors duration-150 hover:bg-surface"
            >
              <AccentSquare size={9} />
              <span className="font-heading text-logo font-extrabold">
                {logo.name}
                <span className="text-text/65">{logo.suffix}</span>
              </span>
            </div>
          ))}
        </StaggerGroup>

        <Reveal as="p" className="mt-5 max-w-[52ch] text-note text-text/65">
          {content.note}
        </Reveal>
      </Container>
    </section>
  );
}
