import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { TeamGrid } from "@/components/motion/team-grid";
import { Container, SectionEyebrow } from "@/components/ui/layout-primitives";
import { Photo } from "@/components/ui/photo";
import { TEAM_MEDIA } from "@/content/media";
import type { Dictionary } from "@/content/types";

export function AboutSection({ content }: { content: Dictionary["about"] }) {
  return (
    <section id="sobre" className="border-t-2 border-divider">
      <Container className="py-section">
        <div className="grid grid-cols-1 items-start gap-gap-xl lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <div>
            <SectionEyebrow className="mb-6.5">{content.eyebrow}</SectionEyebrow>

            <SplitHeading
              lines={content.title}
              className="mb-6 -ml-[0.058em] text-title-section"
            />

            {content.paragraphs.map((paragraph, index) => (
              <Reveal
                key={paragraph}
                as="p"
                className={
                  index === content.paragraphs.length - 1
                    ? "m-0 max-w-[50ch] text-body-lg text-text/82"
                    : "mb-[18px] max-w-[50ch] text-body-lg text-text/82"
                }
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          <TeamGrid>
            {content.team.map((member) => (
              <figure key={member.id} data-stagger-item className="m-0">
                <Photo
                  className="aspect-4/5 border-2 border-divider bg-surface"
                  image={{
                    src: TEAM_MEDIA[member.id].src,
                    alt: member.imageAlt,
                    width: TEAM_MEDIA[member.id].width,
                    height: TEAM_MEDIA[member.id].height,
                    sizes: "(max-width: 1040px) 45vw, 320px",
                  }}
                />
                <figcaption className="mt-3">
                  <p className="m-0 font-heading text-[15px] font-extrabold">{member.name}</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.08em] text-text/62">
                    {member.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </TeamGrid>
        </div>
      </Container>
    </section>
  );
}
