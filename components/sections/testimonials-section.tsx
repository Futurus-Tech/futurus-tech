import { SplitHeading } from "@/components/motion/split-heading";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { Container, SectionEyebrow } from "@/components/ui/layout-primitives";
import { Photo } from "@/components/ui/photo";
import { QUOTE_MEDIA } from "@/content/media";
import { STAGGER_AMOUNT } from "@/lib/motion/tokens";
import type { Dictionary } from "@/content/types";

export function TestimonialsSection({ content }: { content: Dictionary["testimonials"] }) {
  return (
    <section className="border-t-2 border-divider bg-surface">
      <Container className="py-section">
        <SectionEyebrow className="mb-6.5">{content.eyebrow}</SectionEyebrow>

        <SplitHeading
          lines={content.title}
          className="mb-title-gap-sm -ml-[0.058em] max-w-[24ch] text-title-section"
        />

        {/* A 2px grid gap over the divider colour draws the rules between
            cards — the same trick the design uses for the insights grid. */}
        <StaggerGroup
          stagger={STAGGER_AMOUNT.quotes}
          className="grid grid-cols-1 gap-0.5 bg-divider lg:grid-cols-3"
        >
          {content.items.map((item) => (
            <figure
              key={item.id}
              data-stagger-item
              className="m-0 flex min-h-[300px] flex-col gap-5 bg-bg p-quote"
            >
              <span aria-hidden className="font-heading text-quote-mark font-extrabold text-accent">
                &ldquo;
              </span>

              <blockquote className="m-0 flex-1 text-body/[1.62] text-text/86">
                {item.quote}
              </blockquote>

              <figcaption className="flex items-center gap-3.5 border-t-2 border-divider pt-[18px]">
                <Photo
                  className="size-12 flex-none"
                  image={{
                    src: QUOTE_MEDIA[item.id].src,
                    alt: item.imageAlt,
                    width: QUOTE_MEDIA[item.id].width,
                    height: QUOTE_MEDIA[item.id].height,
                    sizes: "48px",
                  }}
                />
                <span className="flex flex-col gap-[3px]">
                  <span className="font-heading text-[14.5px] font-extrabold">{item.author}</span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.07em] text-text/60">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
