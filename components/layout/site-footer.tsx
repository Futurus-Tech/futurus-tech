import { Wordmark } from "@/components/layout/wordmark";
import type { Dictionary } from "@/content/types";
import { siteConfig } from "@/lib/site";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mx-auto flex max-w-page flex-wrap items-baseline justify-between gap-6 px-edge pb-12 pt-10">
      <div className="flex items-baseline gap-2">
        <Wordmark size="sm" />
      </div>

      <p className="text-fine text-text/65">{dict.footer.copyright}</p>

      {/* Named, because a reader listing the page's landmarks would otherwise
          find a second unlabelled navigation and have to open it to find out
          which one it is. */}
      <nav aria-label={dict.a11y.footerNav} className="flex gap-[18px] text-fine">
        {/* The one link that leaves the site. It opens in a new tab so a reader
            who followed it has not lost the page, and the label says so — a
            tab appearing with no warning is disorienting when the pointer is
            not what noticed it. */}
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${dict.footer.linkedin} (${dict.a11y.opensInNewTab})`}
        >
          {dict.footer.linkedin}
        </a>
        <a href="#top">{dict.footer.backToTop}</a>
      </nav>
    </footer>
  );
}
