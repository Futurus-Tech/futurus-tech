import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { Container, SectionEyebrow } from "@/components/ui/layout-primitives";
import { STAGGER_AMOUNT } from "@/lib/motion/tokens";
import type { Dictionary } from "@/content/types";

export function InsightsSection({ content }: { content: Dictionary["insights"] }) {
  return (
    <section id="insights" className="border-t-2 border-divider bg-surface">
      <Container className="py-section">
        <div className="mb-[34px] flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionEyebrow className="mb-5.5">{content.eyebrow}</SectionEyebrow>
            <SplitHeading lines={content.title} className="-ml-[0.058em] text-title-section" />
          </div>

          <Reveal as="span" className="text-nav font-semibold uppercase text-text/65">
            {content.aside}
          </Reveal>
        </div>

        <StaggerGroup
          stagger={STAGGER_AMOUNT.posts}
          className="grid grid-cols-1 gap-0.5 bg-divider sm:grid-cols-3"
        >
          {content.posts.map((post) => (
            <a
              key={post.title}
              href="#insights"
              data-stagger-item
              className="block bg-bg p-6.5 text-text transition-colors duration-150 hover:bg-accent hover:text-bg"
            >
              <span className="text-kicker font-semibold uppercase">{post.category}</span>
              <h3 className="mb-3 mt-3.5 text-post-title">{post.title}</h3>
              <p className="mb-5.5 text-body-xs">{post.excerpt}</p>
              {/* `<time>` rather than a span: "12 mar 2026" is a date a
                  machine can only guess at, and the guess differs by locale.
                  `dateTime` states it once, unambiguously, and is the same
                  value the article's `datePublished` carries in the
                  structured data. */}
              <time
                dateTime={post.dateTime}
                className="text-[12px] font-semibold uppercase tracking-[0.08em]"
              >
                {post.date}
              </time>
            </a>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
