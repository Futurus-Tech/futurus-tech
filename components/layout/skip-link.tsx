/**
 * The first thing in the tab order: a way past the masthead.
 *
 * A keyboard reader landing on this page would otherwise tab the wordmark, five
 * navigation links, the language switch and the call to action before reaching
 * a word of the content, on every visit. WCAG calls that a block to bypass;
 * this is the bypass.
 *
 * It is a real anchor rendered in the document rather than something a script
 * inserts, so it works before hydration and with scripting off. `sr-only` keeps
 * it out of the visual design until it takes focus, at which point it prints
 * itself over the masthead in the accent — visible focus is the whole point of
 * a control that only exists while focused.
 */
export function SkipLink({ label, target = "#main" }: { label: string; target?: string }) {
  return (
    <a
      href={target}
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-edge focus-visible:top-3.5 focus-visible:z-[70] focus-visible:inline-flex focus-visible:items-center focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2.5 focus-visible:font-heading focus-visible:text-[13px] focus-visible:font-extrabold focus-visible:uppercase focus-visible:tracking-[0.08em] focus-visible:text-bg focus-visible:no-underline"
    >
      {label}
    </a>
  );
}
