/**
 * Motion tokens.
 *
 * Every easing curve, duration, offset and ScrollTrigger boundary in the app
 * is declared here, transcribed one-for-one from the `animate()` block of
 * design/Futurus Tech.dc.html. Nothing in `components/motion/` invents a
 * number: if the timing of the port ever drifts from the design, the diff is
 * in this file.
 */

export const EASE = {
  none: "none",
  expoOut: "expo.out",
  power2In: "power2.in",
  power2Out: "power2.out",
  power2InOut: "power2.inOut",
  power3Out: "power3.out",
} as const;

/** Lenis — smooth scroll feel and the programmatic jump used by anchors. */
export const SMOOTH_SCROLL = {
  lerp: 0.075,
  wheelMultiplier: 0.95,
  touchMultiplier: 1.6,
  smoothWheel: true,
  syncTouch: true,
  anchor: {
    duration: 1.4,
    lock: true,
    /** Clears the fixed masthead. */
    offset: 66,
  },
} as const;

/** Line-masked heading reveal. */
export const SPLIT = {
  /**
   * Far enough below the mask to sit outside it entirely before the tween.
   * The design's 112 assumed a mask exactly one line box tall; `mask-line` now
   * carries 0.18em of descender padding, so at the tightest leading in the
   * system (0.95) the line has to travel (0.95 + 0.18) / 0.95 = 119% of its own
   * height to clear the window. 122 keeps a margin over that.
   */
  fromYPercent: 122,
  duration: 1.5,
  ease: EASE.expoOut,
  stagger: 0.11,
  start: "top 88%",
  /** The hero heading fires on load instead of on scroll. */
  heroDelay: 0.25,
} as const;

/**
 * Shared by everything above the fold that fires on load rather than on its own
 * trigger. Reading the heading's delay keeps the hero's parts in one beat: the
 * lines rise and the actions land together, not one after the other.
 */
export const ON_LOAD_DELAY = SPLIT.heroDelay;

/** Single-element reveals. Each variant carries its own trigger. */
export const REVEAL = {
  default: {
    from: { opacity: 0, y: 26 },
    duration: 1.25,
    ease: EASE.expoOut,
    start: "top 92%",
  },
  service: {
    from: { opacity: 0, x: -34 },
    duration: 1.15,
    ease: EASE.expoOut,
    start: "top 93%",
  },
  step: {
    from: { opacity: 0, y: 44 },
    duration: 1.2,
    ease: EASE.expoOut,
    start: "top 90%",
  },
} as const;

/** Grouped reveals — one trigger on the container, staggered across children. */
export const STAGGER = {
  cards: {
    from: { opacity: 0, y: 38 },
    duration: 1.15,
    ease: EASE.expoOut,
    start: "top 90%",
  },
  logos: {
    from: { opacity: 0, y: 18 },
    duration: 0.95,
    ease: EASE.expoOut,
    stagger: 0.07,
    start: "top 88%",
  },
} as const;

/** Per-group stagger amounts, as set in the design file. */
export const STAGGER_AMOUNT = {
  quotes: 0.12,
  plans: 0.12,
  members: 0.1,
  posts: 0.12,
  faq: 0.07,
} as const;

/** Hero reel — pinned three-frame crossfade with a slow push-in. */
export const REEL = {
  trigger: { start: "top top", end: "+=280%", scrub: 1.1, anticipatePin: 1 },
  frame: {
    fromScale: 1.22,
    toScale: 1.02,
    transformOrigin: "50% 55%",
    /**
     * Equal to `step` on purpose: the push-in spans a frame's entire life, so
     * it is still moving when the next frame takes over and nothing ever sits
     * frozen. The design's 1.2 was tied to the old 1.05 step.
     */
    pushDuration: 1.55,
    /**
     * Seconds of timeline between one frame wiping in and the next.
     *
     * The design's 1.05 left `step - wipe.duration` = 0.2s of frame that was
     * not either arriving or being covered — fine for a reel that only wiped
     * and pushed, but the grayscale drain needs somewhere to live. 1.55 gives
     * it 0.7s.
     */
    step: 1.55,
    wipe: { duration: 0.85, ease: EASE.power2InOut },
    /**
     * Grayscale draining out of the frame, one pass per frame.
     *
     * It waits out the whole wipe, so the frame arrives as a black-and-white
     * print and is fully open before any colour appears, then drains across the
     * rest of the push-in and lands at full colour exactly as the next frame
     * starts wiping over it. The cut always happens on a colour image, and the
     * frame taking over restarts from the print. Hence the timing is derived,
     * not declared: it starts at `wipe.duration` into the frame and runs for
     * `step - wipe.duration`.
     *
     * Drives `--photo-grayscale`, read by the `grayscale-photo` utility;
     * reverting the context restores the print.
     */
    color: { property: "--photo-grayscale", from: 1, to: 0 },
  },
  caption: { fromXPercent: -105, duration: 0.7, ease: EASE.power3Out, at: 0.1 },
  cue: {
    exit: { yPercent: 130, opacity: 0, duration: 0.4, ease: EASE.power2In, at: 0.05 },
    rule: { scaleX: 0.25, duration: 1.1, ease: EASE.power2InOut },
  },
} as const;

/** Technology marquee — one seamless loop, eased by scroll speed. */
export const MARQUEE = {
  duration: 56,
  ease: EASE.none,
  speed: {
    /** How quickly the loop settles into its new rate. */
    duration: 1.1,
    ease: EASE.power2Out,
    /** velocity / divisor, clamped to max, added to the base rate of 1. */
    divisor: 2600,
    max: 1.3,
  },
  trigger: { start: "top bottom", end: "bottom top" },
} as const;

/** Counting figures in the numbers band. */
export const COUNTER = {
  duration: 1.9,
  ease: EASE.power2Out,
  start: "top 90%",
} as const;

/** Scrubbed progress rule beside the process steps. */
export const PROCESS_PROGRESS = {
  ease: EASE.none,
  start: "top 62%",
  end: "bottom 82%",
  scrub: 0.8,
} as const;

/** Cases — horizontal pinned gallery. */
export const CASES = {
  ease: EASE.none,
  scrub: 1.1,
  anticipatePin: 1,
  start: "top top",
  /** Trailing slack past the last card, as a fraction of the viewport height. */
  endViewportFactor: 0.5,
  /** Scroll distance per pixel of horizontal travel. */
  endDistanceFactor: 1.25,
  /** Right-hand breathing room kept past the final card. */
  trailingGap: 48,
  /** Below this width the gallery stacks and the pin is skipped entirely. */
  minWidth: 760,
  hover: {
    scale: 1.07,
    duration: 1.1,
    ease: EASE.power3Out,
    /**
     * Colour draining in under the pointer, on the same property the hero reel
     * drives. Shorter than the push-in on purpose: the card should read as
     * colour almost as soon as it is pointed at, while the scale keeps creeping
     * for the rest of the second, and the print comes back on the same curve
     * when the pointer leaves.
     */
    color: { property: "--photo-grayscale", from: 1, to: 0, duration: 0.5, ease: EASE.power2Out },
  },
} as const;

/** Column drift in the team grid — second column only, above 1040px. */
export const TEAM_DRIFT = {
  fromY: 34,
  toY: -34,
  ease: EASE.none,
  scrub: 1,
  start: "top bottom",
  end: "bottom top",
  minWidth: 1040,
} as const;

/** FAQ disclosure. */
export const FAQ = {
  sign: { openRotation: 135, duration: 0.4, ease: EASE.power2Out },
  body: {
    from: { opacity: 0, y: -10 },
    duration: 0.6,
    ease: EASE.power3Out,
  },
} as const;

/** Masthead: reading progress rule and the active-section highlight. */
export const MASTHEAD = {
  navHighlightDuration: 0.3,
  /** Distance from the top of the viewport that decides the current section. */
  readingLine: 140,
} as const;
