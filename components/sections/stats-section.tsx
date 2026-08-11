import { Counter } from "@/components/motion/counter";
import { Container } from "@/components/ui/layout-primitives";
import type { Dictionary } from "@/content/types";

export function StatsSection({ items }: { items: Dictionary["stats"] }) {
  return (
    <section className="border-b-2 border-divider">
      <Container className="py-section-sm">
        <div className="grid grid-cols-2 gap-y-8 gap-x-gap-xs lg:grid-cols-4">
          {items.map((stat) => (
            <div key={stat.label}>
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="-ml-[0.045em] font-heading text-stat font-extrabold text-accent tnum"
              />
              <p className="mt-3.5 text-nav font-semibold uppercase text-text/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
