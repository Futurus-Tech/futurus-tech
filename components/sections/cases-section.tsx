import { CasesTrack } from "@/components/motion/cases-track";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ButtonLink } from "@/components/ui/button";
import { Container, SectionEyebrow } from "@/components/ui/layout-primitives";
import { Photo } from "@/components/ui/photo";
import { CASE_MEDIA } from "@/content/media";
import type { CaseStudy, Dictionary } from "@/content/types";

// `w-case` resolves the --container-case token: clamp(280px, 32vw, 420px).
const CARD = "w-case flex-none border-2";

function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article
      data-case
      className={`${CARD} border-divider bg-bg transition-colors duration-150 hover:border-accent`}
    >
      <div className="h-case-media overflow-hidden border-b-2 border-divider bg-surface">
        <Photo
          data-case-image
          className="h-full w-full"
          image={{
            src: CASE_MEDIA[study.id].src,
            alt: study.imageAlt,
            width: CASE_MEDIA[study.id].width,
            height: CASE_MEDIA[study.id].height,
            sizes: "(max-width: 760px) 90vw, 420px",
          }}
        />
      </div>

      <div className="p-card">
        <span className="text-kicker font-semibold uppercase text-accent-700">{study.meta}</span>

        <h3 className="my-card-title text-case-title">{study.title}</h3>

        <p className="mb-card-gap line-clamp-3 text-case-body text-text/78">{study.description}</p>

        <p className="m-0 border-t-2 border-divider pt-card-rule font-heading text-case-metric font-extrabold text-accent-700">
          {study.metric}
        </p>
      </div>
    </article>
  );
}

function NextCaseCard({ content }: { content: Dictionary["cases"]["next"] }) {
  return (
    <article className={`${CARD} border-accent bg-accent text-bg`}>
      <div className="flex h-case-media items-end border-b-2 border-bg p-card">
        <span className="font-heading text-case-num font-extrabold">{content.number}</span>
      </div>

      <div className="p-card">
        <span className="text-kicker font-semibold uppercase">{content.kicker}</span>
        <h3 className="mb-3.5 mt-card-title text-case-title">{content.title}</h3>
        <p className="mb-card-gap text-[clamp(13px,2vh,15px)]/[1.55]">{content.description}</p>
        <ButtonLink href={content.cta.href} variant="ghost" tone="inverse">
          {content.cta.label}
        </ButtonLink>
      </div>
    </article>
  );
}

export function CasesSection({ content }: { content: Dictionary["cases"] }) {
  const header = (
    <Container>
      <SectionEyebrow className="mb-cases-eyebrow">{content.eyebrow}</SectionEyebrow>

      <div className="mb-cases-head flex flex-wrap items-end justify-between gap-cases-gap">
        <SplitHeading lines={content.title} className="-ml-[0.058em] text-title-cases" />
        <Reveal as="p" className="m-0 max-w-[34ch] text-body-xs text-text/70">
          {content.intro}
        </Reveal>
      </div>
    </Container>
  );

  return (
    <CasesTrack id="cases" header={header}>
      {content.items.map((study) => (
        <CaseCard key={study.id} study={study} />
      ))}
      <NextCaseCard content={content.next} />
    </CasesTrack>
  );
}
