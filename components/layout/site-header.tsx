import { LanguageToggle } from "@/components/layout/language-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavLinks } from "@/components/layout/nav-links";
import { Wordmark } from "@/components/layout/wordmark";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ButtonLink } from "@/components/ui/button";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n/config";

/**
 * The fixed masthead.
 *
 * A Server Component that composes four small client islands — the navigation
 * highlight, the language switch, the narrow-viewport menu and the reading
 * progress rule. Everything else here is static markup.
 */
export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b-2 border-divider bg-bg">
      <div className="mx-auto flex max-w-page items-center gap-8 px-edge py-3.5">
        <a href="#top" className="mr-auto flex items-baseline gap-2 text-text hover:text-text">
          <Wordmark />
        </a>

        <NavLinks items={dict.nav.items} />

        <LanguageToggle locale={locale} label={dict.nav.languageLabel} />

        <ButtonLink href={dict.nav.cta.href} variant="primary" className="hidden nav:inline-flex">
          {dict.nav.cta.label}
        </ButtonLink>

        <MobileMenu
          items={dict.nav.items}
          contact={dict.nav.contact}
          menuLabel={dict.nav.menuLabel}
          closeLabel={dict.nav.closeLabel}
        />
      </div>

      <ScrollProgress />
    </header>
  );
}
