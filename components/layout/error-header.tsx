import { LanguageToggle } from "@/components/layout/language-toggle";
import { Wordmark } from "@/components/layout/wordmark";
import { ButtonLink } from "@/components/ui/button";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n/config";

/**
 * The masthead for pages that stand outside the landing page.
 *
 * `SiteHeader` is built around the landing page: it pins itself over a long
 * scroll, tracks the section under the reading line, and its links are in-page
 * anchors. None of that has anything to hold on to here, so this is the same
 * three fixed elements — wordmark, language switch, one action — in a plain
 * band that scrolls with the document.
 */
export function ErrorHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const home = `/${locale}`;

  return (
    <header className="border-b-2 border-divider bg-bg">
      <div className="mx-auto flex max-w-page items-center gap-6 px-edge py-3.5">
        <a href={home} className="mr-auto flex items-baseline gap-2 text-text hover:text-text">
          <Wordmark />
        </a>

        <LanguageToggle locale={locale} label={dict.nav.languageLabel} />

        {/* No narrow-viewport menu stands in for this one, so it is held until
            there is room for it rather than being folded away at `nav`. */}
        <ButtonLink
          href={`${home}${dict.nav.cta.href}`}
          variant="primary"
          className="hidden sm:inline-flex"
        >
          {dict.nav.cta.label}
        </ButtonLink>
      </div>
    </header>
  );
}
