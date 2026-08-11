/**
 * The escape hatch for the visitor whose motion never arrives.
 *
 * Everything that animates in starts hidden, declared in `globals.css` under
 * `@media (prefers-reduced-motion: no-preference)`. That rule covers the
 * visitor who asked for reduced motion. It cannot cover the visitor whose
 * scripting is off, because CSS has no way to ask, and for them GSAP never
 * runs to reveal anything: the page would render permanently blank.
 *
 * `<noscript>` is that missing question. Its contents apply only when
 * scripting is unavailable, so the rules below hand every animated element
 * back its resting state. They match at the same specificity as the ones in
 * the stylesheet and sit later in the document, so they win on order alone.
 *
 * This replaces a blocking inline script that stamped a `data-fx` flag on
 * <html> through `dangerouslySetInnerHTML`. Same behaviour in all four
 * combinations of scripting and motion preference, with no injected script,
 * no `suppressHydrationWarning` on the documents, and nothing to audit.
 *
 * Every document in the app needs it, and there is more than one: the layout
 * serves the landing page, `app/global-not-found.tsx` serves its own.
 */
export function MotionFallback() {
  return (
    <noscript>
      <style>
        {"[data-reveal],[data-stagger-item]{opacity:1}[data-split]{visibility:visible}"}
      </style>
    </noscript>
  );
}
