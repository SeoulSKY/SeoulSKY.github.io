import { METRO_LINES } from "@/lib/metro";

/**
 * The site's design tokens for React Email's `<Tailwind>`, under the same
 * names as in globals.css, so a template's classes read like the site's.
 * They are written out here because globals.css takes them from `:root`
 * variables, which the email cannot import; keep the two in step. The
 * inliner turns every class into a plain style, since mail clients have no
 * stylesheet, and the fonts fall back to ones a reader's device has.
 */
export const emailTheme = `
@theme {
  --color-night-950: #06071a;
  --color-night-900: #0b0d26;
  --color-night-800: #13163a;
  --color-night-700: #1e2152;
  --color-twilight: #3b2f72;
  --color-lavender: #a89bdb;
  --color-dusk: #f4a7b9;
  --color-peach: #ffc3a1;
  --color-amber: #ffb357;
  --color-mist: #f4f0ff;
  --color-muted-foreground: #a7a3c7;
  --color-border: rgb(244 240 255 / 0.1);
${Object.entries(METRO_LINES)
  .map(([line, { color }]) => `  --color-line-${line}: ${color};`)
  .join("\n")}

  --font-sans: "Geist Variable", Geist, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Helvetica, Arial, sans-serif;
  --font-display: "Bricolage Grotesque Variable", "Geist Variable", Geist,
    -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-serif: "Instrument Serif", Georgia, "Times New Roman", serif;
  --font-mono: "Geist Mono Variable", "Geist Mono", ui-monospace,
    SFMono-Regular, Menlo, Consolas, monospace;
  --font-kr: "Pretendard Variable", Pretendard, "Apple SD Gothic Neo",
    "Malgun Gothic", sans-serif;

  --text-3xs: 10px;
  --text-2xs: 11px;
  --text-board: 13px;
  --text-body: 15px;

  --tracking-sign: 0.12em;
  --tracking-label: 0.2em;
  --tracking-caption: 0.25em;
  --tracking-eyebrow: 0.3em;
}
`;
