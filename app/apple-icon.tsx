import { ImageResponse } from "next/og";

/**
 * The home-screen icon iOS asks for.
 *
 * Safari ignores `icon.svg` and the favicon here and wants a square raster, so
 * this route draws the same mark the SVG does, at the size Apple documents, out
 * of the same three tokens. It is generated rather than checked in because a
 * binary that has to be re-exported whenever the accent moves is a binary that
 * eventually disagrees with the stylesheet.
 *
 * iOS composites the icon onto its own rounded square and does not honour
 * transparency, so the ground is painted rather than left empty.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const COLOR = {
  bg: "#f3f2f2",
  text: "#201e1d",
  accent: "#ec3013",
} as const;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: COLOR.bg,
          padding: 28,
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: 40, height: 40, background: COLOR.accent }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ width: 84, height: 17, background: COLOR.text }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 56, height: 17, background: COLOR.text }} />
            <div style={{ width: 28, height: 28, background: COLOR.accent }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
