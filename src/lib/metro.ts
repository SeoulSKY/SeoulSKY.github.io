/**
 * Official Seoul Metropolitan Subway line colours, Lines 1 to 9, and the ink
 * that reads on each. The same colours are the `--line-N` tokens in
 * globals.css, for use from CSS; keep the two in step.
 */
export const METRO_LINES = {
  1: { color: "#0052a4", ink: "#ffffff" },
  2: { color: "#00a84d", ink: "#ffffff" },
  3: { color: "#ef7c1c", ink: "#ffffff" },
  4: { color: "#00a4e3", ink: "#ffffff" },
  5: { color: "#996cac", ink: "#ffffff" },
  6: { color: "#cd7c2f", ink: "#ffffff" },
  7: { color: "#747f00", ink: "#ffffff" },
  8: { color: "#e6186c", ink: "#ffffff" },
  9: { color: "#bdb092", ink: "#06071a" },
} as const;

/** A line number that has a colour, 1 to 9. */
export type MetroLineNumber = keyof typeof METRO_LINES;
