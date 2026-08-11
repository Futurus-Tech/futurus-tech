/**
 * Image assets, keyed by the same ids the dictionaries use for alt text.
 *
 * Copy is localised, photography is not — keeping the two apart means a new
 * locale never has to restate a `src`, and swapping the placeholder set for
 * real photography touches exactly one file.
 */

export type MediaAsset = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

export const REEL_MEDIA = [
  { src: "https://picsum.photos/id/1/1800/1000", width: 1800, height: 1000 },
  { src: "https://picsum.photos/id/20/1800/1000", width: 1800, height: 1000 },
  { src: "https://picsum.photos/id/4/1800/1000", width: 1800, height: 1000 },
] as const satisfies readonly MediaAsset[];

export const CASE_MEDIA = {
  "kairo-bank": { src: "https://picsum.photos/id/180/1200/800", width: 1200, height: 800 },
  "meridian-log": { src: "https://picsum.photos/id/60/1200/800", width: 1200, height: 800 },
  "orbita-saude": { src: "https://picsum.photos/id/0/1200/800", width: 1200, height: 800 },
  "cerrado-agro": { src: "https://picsum.photos/id/2/1200/800", width: 1200, height: 800 },
  "vallar-energia": { src: "https://picsum.photos/id/3/1200/800", width: 1200, height: 800 },
  "tenda-digital": { src: "https://picsum.photos/id/8/1200/800", width: 1200, height: 800 },
} as const satisfies Record<string, MediaAsset>;

export const QUOTE_MEDIA = {
  "marina-alcantara": { src: "https://i.pravatar.cc/300?img=44", width: 300, height: 300 },
  "rafael-duarte": { src: "https://i.pravatar.cc/300?img=11", width: 300, height: 300 },
  "helena-prado": { src: "https://i.pravatar.cc/300?img=26", width: 300, height: 300 },
} as const satisfies Record<string, MediaAsset>;

export const TEAM_MEDIA = {
  "gabriel-ferreira": { src: "https://i.pravatar.cc/800?img=12", width: 800, height: 800 },
  "rafael-ruddy": { src: "https://i.pravatar.cc/800?img=33", width: 800, height: 800 },
  "fabio-junior": { src: "https://i.pravatar.cc/800?img=59", width: 800, height: 800 },
  "larissa-moreira": { src: "https://i.pravatar.cc/800?img=45", width: 800, height: 800 },
} as const satisfies Record<string, MediaAsset>;

export type CaseId = keyof typeof CASE_MEDIA;
export type QuoteId = keyof typeof QUOTE_MEDIA;
export type TeamMemberId = keyof typeof TEAM_MEDIA;
