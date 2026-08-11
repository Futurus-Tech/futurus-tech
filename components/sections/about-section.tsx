import type { ElementType } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { TeamGrid } from "@/components/motion/team-grid";
import { Container, SectionEyebrow } from "@/components/ui/layout-primitives";
import { Photo } from "@/components/ui/photo";
import { TEAM_MEDIA, TEAM_PROFILES } from "@/content/media";
import type { Dictionary } from "@/content/types";

/**
 * About: the argument on top, the people underneath.
 *
 * The section reads as two bands. The first is the editorial split the rest of
 * the page uses, title on the left and the copy on the right. The second is the
 * roster, given the full measure and opened by a rule so the portraits are a
 * statement rather than an illustration hung beside a paragraph.
 *
 * The roster is sized by the grid, not by a column count (see `TeamGrid`), so
 * a new collaborator is one entry in `TEAM_MEDIA` and one per locale. Nothing
 * in this file counts the team, including the tally beside the label.
 *
 * A card with a profile behind it is a link, whole card, not a small icon: the
 * photograph is already the target and its hover already reads as one. A card
 * without a profile is the same box with no anchor around it, so the roster
 * never shows a link that leads nowhere.
 */
export function AboutSection({
  content,
  newTabLabel,
}: {
  content: Dictionary["about"];
  newTabLabel: string;
}) {
  return (
    <section id="sobre" className="border-t-2 border-divider">
      <Container className="py-section">
        <div className="grid grid-cols-1 items-start gap-gap-xl lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <SectionEyebrow className="mb-6.5">{content.eyebrow}</SectionEyebrow>

            <SplitHeading
              lines={content.title}
              className="-ml-[0.058em] text-title-section"
            />
          </div>

          <div>
            {content.paragraphs.map((paragraph, index) => (
              <Reveal
                key={paragraph}
                as="p"
                className={
                  index === content.paragraphs.length - 1
                    ? "m-0 max-w-[58ch] text-body-lg text-text/82"
                    : "mb-[18px] max-w-[58ch] text-body-lg text-text/82"
                }
              >
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-gap-lg border-t-2 border-divider pt-5">
          <Reveal className="mb-7 flex items-baseline justify-between gap-6">
            <span className="text-nav font-semibold uppercase text-text/65">
              {content.teamLabel}
            </span>
            <span className="tnum text-nav font-semibold text-text/65">
              {String(content.team.length).padStart(2, "0")}
            </span>
          </Reveal>

          <TeamGrid>
            {content.team.map((member) => {
              const profile = TEAM_PROFILES[member.id];

              // The card is an anchor when there is somewhere to go and a plain
              // box when there is not, so both keep the same footprint in the
              // grid. `group` rides on whichever one it is, which is what lets
              // the keyboard get the same colour the pointer gets.
              const Card = (profile ? "a" : "div") as ElementType;
              const link = profile
                ? {
                    href: profile,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": `${member.name} ${content.profile.aria} (${newTabLabel})`,
                  }
                : {};

              return (
                <Card key={member.id} data-stagger-item className="group block" {...link}>
                  <figure className="m-0">
                    {/* The print is black and white until the pointer settles on
                        it, which is the one place the page lets a photograph
                        carry its own colour. `--photo-grayscale` is the same
                        handle the hero reel and the case cards drive, so the
                        drain is one value changing and `filter` transitions
                        across it. */}
                    <Photo
                      className="aspect-4/5 border-2 border-divider bg-surface transition-[filter] duration-500 ease-out group-hover:[--photo-grayscale:0] group-focus-visible:[--photo-grayscale:0]"
                      imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                      image={{
                        src: TEAM_MEDIA[member.id].src,
                        alt: member.imageAlt,
                        width: TEAM_MEDIA[member.id].width,
                        height: TEAM_MEDIA[member.id].height,
                        sizes: "(max-width: 700px) 45vw, (max-width: 1040px) 30vw, 260px",
                      }}
                    />
                    <figcaption className="mt-3.5 border-t-2 border-divider pt-3">
                      <p className="m-0 font-heading text-brand-sm font-extrabold transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">
                        {member.name}
                      </p>
                      <p className="mt-1.5 text-label font-semibold uppercase text-text/65">
                        {member.role}
                      </p>
                      {profile ? (
                        <p className="mt-2.5 flex items-center gap-1.5 text-kicker font-semibold uppercase text-text/65 transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">
                          {content.profile.label}
                          <span aria-hidden>↗</span>
                        </p>
                      ) : null}
                    </figcaption>
                  </figure>
                </Card>
              );
            })}
          </TeamGrid>
        </div>
      </Container>
    </section>
  );
}
