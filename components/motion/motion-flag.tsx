/**
 * `data-fx` marks the document as "motion is coming".
 *
 * It runs before the body is parsed, so anything that animates in is already
 * hidden by the time it is painted — no flash of the un-animated state. The
 * flag is deliberately never set when the visitor prefers reduced motion or
 * when scripting is unavailable, in which case every section renders plainly
 * and stays visible.
 *
 * Every document in the app needs it, and there is more than one document:
 * the layout serves the landing page, `app/global-not-found.tsx` serves its
 * own. Written once here so the two cannot drift apart.
 *
 * Both documents mark their `<html>` `suppressHydrationWarning`: the flag is
 * on the element by the time React hydrates, and the server HTML cannot have
 * predicted it. Any new document rendering this component needs the same.
 */
const MOTION_FLAG = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.fx='';`;

export function MotionFlag() {
  return <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />;
}
