import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionEyebrow } from "@/components/ui/layout-primitives";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/content/types";

/**
 * The closing section, and now also the page's parting statement.
 *
 * It used to be preceded by a full-bleed accent poster carrying that line on
 * its own; folding the two together leaves one ending instead of two. The
 * heading is lifted out of the left column and set across the full measure at
 * the display step it deserves — "Respondemos em 24 horas." cannot breathe in
 * a five-column well — with the details and the form running beneath it.
 */
export function ContactSection({
  content,
  formLabel,
  newTabLabel,
}: {
  content: Dictionary["contact"];
  formLabel: string;
  newTabLabel: string;
}) {
  const term = "text-label font-semibold uppercase text-text/65";

  return (
    <section id="contato" className="border-y-2 border-divider">
      <div className="mx-auto max-w-page px-edge py-section-lg">
        <SectionEyebrow className="mb-5.5">{content.eyebrow}</SectionEyebrow>

        <SplitHeading
          lines={content.title}
          className="mb-title-gap -ml-[0.058em] text-title-services"
        />

        <div className="grid grid-cols-1 gap-gap-xl lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <Reveal as="p" className="mb-7 max-w-[42ch] text-body-lg text-text/78">
              {content.intro}
            </Reveal>

            <Reveal
              as="dl"
              className="m-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-body-xs"
            >
              <dt className={term}>{content.details.emailLabel}</dt>
              <dd className="m-0">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </dd>

              <dt className={term}>{content.details.linkedinLabel}</dt>
              <dd className="m-0">
                {/* Off-site, so it opens beside the page rather than replacing
                    it, and the name says so — the same treatment the footer's
                    copy of this link gets. */}
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.linkedinHandle} (${newTabLabel})`}
                >
                  {siteConfig.linkedinHandle}
                </a>
              </dd>

              <dt className={term}>{content.details.hoursLabel}</dt>
              <dd className="m-0">{content.details.hours}</dd>
            </Reveal>
          </div>

          <ContactForm content={content.form} label={formLabel} />
        </div>
      </div>
    </section>
  );
}
