import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * The home-screen icon. iOS fills transparency with black and rounds the
 * corners itself, so the round logo sits on the night instead.
 */
export default async function AppleIcon() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#06071a",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse draws plain img tags */}
      <img
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={152}
        height={152}
        alt=""
      />
    </div>,
    size,
  );
}
