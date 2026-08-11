import { cn } from "@/lib/utils/cn";
import { siteConfig } from "@/lib/site";

/**
 * FUTURUS.TECH — the accent square, the name, and the one red dot that carries
 * the brand. Two sizes: the masthead's and the footer's.
 */
export function Wordmark({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <>
      <span
        aria-hidden
        className={cn("block flex-none bg-accent", size === "md" ? "size-3" : "size-2.5")}
      />
      <span
        className={cn(
          "font-heading font-extrabold",
          size === "md" ? "text-brand" : "text-brand-sm",
        )}
      >
        {siteConfig.wordmark.lead}
        <span className="text-accent">.</span>
        {siteConfig.wordmark.tail}
      </span>
    </>
  );
}
