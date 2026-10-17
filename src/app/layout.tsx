import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/bricolage-grotesque";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seoulsky.dev"),
  title: "SeoulSKY · Software Engineer",
  description:
    "SeoulSKY is a software engineer building scalable, intuitive products with Python, Rust and TypeScript.",
  icons: "/favicon.ico",
  openGraph: {
    title: "SeoulSKY · Software Engineer",
    description: "Portfolio of SeoulSKY: projects, experience and skills.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b1e",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
