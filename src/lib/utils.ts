import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * `count` evenly spaced positions from `start`, `step` apart. Repeated SVG
 * shapes key on these, since a shape's position is what tells it apart.
 */
export function evenlySpaced(
  count: number,
  start: number,
  step: number,
): number[] {
  return Array.from({ length: count }, (_, i) => start + i * step);
}
