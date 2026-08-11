import { SplitHeading } from "@/components/motion/split-heading";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { Container, SectionEyebrow } from "@/components/ui/layout-primitives";
import { STAGGER_AMOUNT } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/content/types";

export function PlansSection({ content }: { content: Dictionary["plans"] }) {
  return (
    <section id="planos" className="border-t-2 border-divider">
      <Container className="py-section">
        <SectionEyebrow className="mb-6.5">{content.eyebrow}</SectionEyebrow>

        <SplitHeading
          lines={content.title}
          className="mb-title-gap-sm -ml-[0.058em] max-w-[24ch] text-title-section"
        />

        <StaggerGroup
          stagger={STAGGER_AMOUNT.plans}
          className="grid grid-cols-1 border-t-2 border-divider lg:grid-cols-3"
        >
          {content.items.map((plan, index) => (
            <div
              key={plan.title}
              data-stagger-item
              className={cn(
                "border-b-2 border-divider px-plan-x pb-[34px] pt-8",
                // The last card closes the row, so it carries no right rule.
                index < content.items.length - 1 && "border-r-2",
                plan.featured && "bg-accent text-bg",
              )}
            >
              <span
                className={cn(
                  "text-label font-semibold uppercase",
                  !plan.featured && "text-accent-700",
                )}
              >
                {plan.label}
              </span>

              <h3 className="mb-4 mt-3.5 text-plan-title">{plan.title}</h3>

              <p className={cn("mb-5.5 text-body-sm", !plan.featured && "text-text/78")}>
                {plan.description}
              </p>

              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-baseline gap-2.5 text-body-xs">
                    <span
                      aria-hidden
                      className={cn("size-2 flex-none", plan.featured ? "bg-bg" : "bg-accent")}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
