import type { MetadataRoute } from "next";
import { site } from "@/data/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    // night-950, the page background
    background_color: "#06071a",
    theme_color: "#06071a",
    icons: [{ src: "/logo.png", sizes: "256x256", type: "image/png" }],
  };
}
