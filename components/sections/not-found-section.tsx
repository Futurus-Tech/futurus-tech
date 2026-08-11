import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { ButtonLink } from "@/components/ui/button";
import { CurrentPath } from "@/components/ui/current-path";
import { AccentSquare, Container } from "@/components/ui/layout-primitives";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n/config";
import { STAGGER_AMOUNT } from "@/lib/motion/tokens";

/**
 * The 404 page's body.
 *
 * Assembled from the landing page's own vocabulary — the accent-square eyebrow,
 * the masked display heading, the hero's action pair, the hairline card grid —
 * so a visitor who arrives on a dead link is still unmistakably on the same
 * site. The one element the landing page does not have is the status plate: an
 * accent field carrying the code itself, which states the page's whole message
 * once, large, and gives the second column something to be.
 *
 * Everything animates `onLoad` rather than on a scroll trigger: the page is
 * barely taller than the viewport, so a trigger line below the fold would leave
 * half of it waiting on a scroll that never comes.
 */
export function NotFoundSection({
  content,
  nav,
  locale,
}: {
  content: Dictionary["notFound"];
  nav: Dictionary["nav"];
  locale: Locale;
}) {
  /**
   * Every link out of here leaves the document, so the in-page anchors the
   * masthead uses on the landing page have to be qualified with the locale
   * root — `#servicos` alone would only scroll this page nowhere.
   */
  const home = `/${locale}`;

  /** The desktop bar's sections, plus the entry only the full-screen menu shows. */
  const suggestions = [...nav.items, nav.contact];

  return (
    // `tabIndex={-1}` so the skip link's jump moves focus here and not only the
    // scroll position. The id stays `top`, which the footer's back-to-top link
    // already points at, rather than growing a second one for the same element.
    <main id="top" tabIndex={-1} className="flex-1 font-body text-[16px]/[1.6]">
      <div className="mx-auto max-w-page px-edge pb-section pt-hero-top">
        <Reveal onLoad className="mb-7 flex items-baseline gap-3.5">
          <AccentSquare />
          <span className="text-eyebrow font-semibold uppercase text-accent-700">
            {content.eyebrow}
          </span>
        </Reveal>

        <SplitHeading
          as="h1"
          lines={content.title}
          accentLine={content.title.length - 1}
          onLoad
          className="ml-[-0.058em] text-poster"
        />

        <div className="mt-12 grid grid-cols-1 items-start gap-11 gap-x-gap-md lg:grid-cols-2">
          <div>
            <Reveal as="p" onLoad className="m-0 max-w-[46ch] text-lead text-text/80">
              {content.lead}
            </Reveal>

            <Reveal onLoad className="mt-9 flex flex-wrap gap-3.5">
              <ButtonLink href={home} variant="primary" size="lg">
                {content.homeCta}
              </ButtonLink>
              <ButtonLink href={`${home}${nav.cta.href}`} variant="secondary" size="lg">
                {nav.cta.label}
              </ButtonLink>
            </Reveal>
          </div>

          {/* The status plate. Ink and ground swap here, as they do on the
              "next case" card, so the one place on the page that repeats the
              error verbatim is also the only filled field. */}
          <Reveal onLoad className="bg-accent text-bg">
            <div className="flex items-center justify-between border-b-2 border-bg/25 px-6 py-3.5">
              <span className="text-label font-semibold uppercase">HTTP</span>
              <span aria-hidden className="block size-2.5 flex-none bg-bg" />
            </div>

            <p className="tnum m-0 px-6 py-9 text-center font-heading text-hero font-extrabold">
              {content.code}
            </p>

            <dl className="m-0">
              <div className="flex items-baseline justify-between gap-6 border-t-2 border-bg/25 px-6 py-4">
                <dt className="text-label font-semibold uppercase text-bg/70">
                  {content.statusLabel}
                </dt>
                <dd className="m-0 font-heading text-note font-extrabold">{content.status}</dd>
              </div>

              <div className="flex items-baseline justify-between gap-6 border-t-2 border-bg/25 px-6 py-4">
                <dt className="flex-none text-label font-semibold uppercase text-bg/70">
                  {content.pathLabel}
                </dt>
                {/* `min-w-0` so a long address truncates instead of forcing the
                    plate wider than its column. */}
                <dd className="m-0 min-w-0 truncate font-heading text-note font-extrabold">
                  <CurrentPath fallback={content.pathFallback} />
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>

      <section className="border-t-2 border-divider bg-surface">
        <Container className="py-section-sm">
          <Reveal className="mb-title-gap-sm flex items-baseline gap-3.5">
            <AccentSquare />
            <h2 className="text-eyebrow font-semibold uppercase text-accent-700">
              {content.linksTitle}
            </h2>
          </Reveal>

          {/* `gap-0.5` over a divider-coloured ground is how the insights grid
              draws its hairlines; the same stagger keeps the two in one beat. */}
          <StaggerGroup
            stagger={STAGGER_AMOUNT.posts}
            as="ul"
            className="m-0 grid list-none grid-cols-1 gap-0.5 bg-divider p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {suggestions.map((item, index) => (
              <li key={item.href} data-stagger-item>
                <a
                  href={`${home}${item.href}`}
                  className="block h-full bg-bg p-6.5 text-text transition-colors duration-150 hover:bg-accent hover:text-bg"
                >
                  <span className="tnum text-kicker font-semibold uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3.5 block font-heading text-post-title font-extrabold">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </main>
  );
}
