/**
 * The hosts content photography is served from.
 *
 * One list, read twice: `next.config.ts` turns it into `images.remotePatterns`
 * so the optimiser will fetch from them at all, and the layout turns it into
 * `preconnect` hints so the TLS handshake for the hero frame is already done by
 * the time the optimiser asks for it. Keeping both off the same array means
 * swapping the placeholder set for a production asset host is one edit and the
 * hint cannot end up pointing at a host nothing is loaded from — a preconnect
 * to somewhere unused is a wasted connection, not a free one.
 */
export const IMAGE_HOSTS = ["picsum.photos", "i.pravatar.cc"] as const;
