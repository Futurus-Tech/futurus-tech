"use client";

import { gsap } from "@/lib/motion/gsap";
import { EASE, REEL } from "@/lib/motion/tokens";
import { useGsapEffect } from "@/lib/motion/use-gsap-effect";
import { Photo } from "@/components/ui/photo";
import { REEL_MEDIA } from "@/content/media";

/**
 * The pinned hero reel: three frames wiping over one another while each one
 * pushes slowly in and bleeds from black and white into colour, driven by
 * scroll over roughly three viewport heights.
 *
 * Frames after the first start fully clipped from the bottom and open upward,
 * so the outgoing frame is never uncovered — the wipe reads as one image
 * replacing another rather than a crossfade.
 */
export function HeroReel({
  frames,
  captionSuffix,
  scrollCue,
}: {
  frames: readonly { readonly alt: string }[];
  captionSuffix: string;
  scrollCue: string;
}) {
  const ref = useGsapEffect<HTMLDivElement>((root) => {
    const frameEls = gsap.utils.toArray<HTMLElement>("[data-reel-frame]", root);
    const number = root.querySelector<HTMLElement>("[data-reel-number]");
    const caption = root.querySelector<HTMLElement>("[data-reel-caption]");
    const cue = root.querySelector<HTMLElement>("[data-reel-cue]");
    const cueRule = root.querySelector<HTMLElement>("[data-reel-cue-rule]");
    if (frameEls.length === 0) return;

    const label = (index: number) => String(index + 1).padStart(2, "0");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: REEL.trigger.start,
        end: REEL.trigger.end,
        pin: true,
        scrub: REEL.trigger.scrub,
        anticipatePin: REEL.trigger.anticipatePin,
      },
    });

    gsap.set(frameEls, {
      scale: REEL.frame.fromScale,
      transformOrigin: REEL.frame.transformOrigin,
      // Explicit, because a custom property that was never set computes to an
      // empty string and GSAP would have no start value to interpolate from.
      [REEL.frame.color.property]: REEL.frame.color.from,
    });

    /* Both built per call rather than shared: GSAP writes its own bookkeeping
       into the vars object it is handed, so one object cannot back two tweens. */
    const push = () => ({
      scale: REEL.frame.toScale,
      ease: EASE.none,
      duration: REEL.frame.pushDuration,
    });
    /* Colour waits out the wipe, so a frame is fully open and still in black
       and white before any of it drains, and then rides the rest of the
       push-in. The first frame never wipes, but keeps the same schedule so all
       three colour on one rhythm. */
    const colorize = () => ({
      [REEL.frame.color.property]: REEL.frame.color.to,
      ease: EASE.none,
      duration: REEL.frame.step - REEL.frame.wipe.duration,
    });
    const colorAt = (index: number) => index * REEL.frame.step + REEL.frame.wipe.duration;

    timeline.to(frameEls[0], push(), 0).to(frameEls[0], colorize(), colorAt(0));

    for (let i = 1; i < frameEls.length; i += 1) {
      const at = i * REEL.frame.step;
      timeline
        .to(
          frameEls[i],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: REEL.frame.wipe.ease,
            duration: REEL.frame.wipe.duration,
            onStart: () => {
              if (number) number.textContent = label(i);
            },
            onReverseComplete: () => {
              if (number) number.textContent = label(i - 1);
            },
          },
          at,
        )
        .to(frameEls[i], push(), at)
        .to(frameEls[i], colorize(), colorAt(i));
    }

    if (caption) {
      timeline.fromTo(
        caption,
        { xPercent: REEL.caption.fromXPercent },
        { xPercent: 0, ease: REEL.caption.ease, duration: REEL.caption.duration },
        REEL.caption.at,
      );
    }

    if (cue) {
      if (cueRule) {
        gsap.to(cueRule, {
          scaleX: REEL.cue.rule.scaleX,
          transformOrigin: "left center",
          duration: REEL.cue.rule.duration,
          ease: REEL.cue.rule.ease,
          repeat: -1,
          yoyo: true,
        });
      }
      timeline.to(
        cue,
        {
          yPercent: REEL.cue.exit.yPercent,
          opacity: REEL.cue.exit.opacity,
          ease: REEL.cue.exit.ease,
          duration: REEL.cue.exit.duration,
        },
        REEL.cue.exit.at,
      );
    }
  });

  return (
    <div ref={ref} className="mt-reel-top border-y-2 border-divider">
      <div className="relative h-svh min-h-[420px] overflow-hidden bg-surface">
        {frames.map((frame, index) => (
          <Photo
            key={frame.alt}
            data-reel-frame
            className="absolute inset-0"
            // Frames after the first start fully clipped and open upward.
            style={index === 0 ? undefined : { clipPath: "inset(100% 0 0 0)" }}
            image={{
              src: REEL_MEDIA[index].src,
              alt: frame.alt,
              fill: true,
              priority: index === 0,
              sizes: "100vw",
            }}
          />
        ))}

        <div
          data-reel-caption
          className="pointer-events-none absolute bottom-0 left-0 flex items-baseline gap-2.5 bg-accent px-4.5 py-3 font-heading text-[13px] font-extrabold uppercase tracking-[0.1em] text-bg"
        >
          <span data-reel-number className="tnum">
            01
          </span>
          <span>{captionSuffix}</span>
        </div>

        <div
          data-reel-cue
          className="pointer-events-none absolute bottom-0 right-0 flex items-center gap-3 border-l-2 border-t-2 border-divider bg-bg px-4.5 py-[13px] font-heading text-[12px] font-extrabold uppercase tracking-[0.14em]"
        >
          <span>{scrollCue}</span>
          <span data-reel-cue-rule className="block h-0.5 w-9 bg-accent" />
        </div>
      </div>
    </div>
  );
}
