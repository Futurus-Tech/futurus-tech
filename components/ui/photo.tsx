import Image, { type ImageProps } from "next/image";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type PhotoProps = {
  /** Props forwarded to `next/image`. */
  image: ImageProps;
  imageClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

/**
 * The frame every content photograph goes through.
 *
 * Modernist prints photography in pure black and white, so the grayscale
 * treatment lives here instead of being re-applied per section. The frame is
 * also what the case-card hover and the hero reel's push-in transform, which
 * is why it is a real element and takes its own props.
 */
export function Photo({ image, imageClassName, className, ...props }: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden grayscale-photo", className)} {...props}>
      {/* `alt` is required by ImageProps, so it is always present here — the
          lint rule just cannot see through the spread. */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...image} className={cn("h-full w-full object-cover", imageClassName)} />
    </div>
  );
}
