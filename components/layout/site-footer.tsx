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

      <div className="flex gap-[18px] text-fine">
        <a href={siteConfig.linkedin}>{dict.footer.linkedin}</a>
        <a href="#top">{dict.footer.backToTop}</a>
      </div>
    </footer>
  );
}
