import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";

// @ts-expect-error Javascript has no types
import tailwindConfig from "../../tailwind.config";
import type { Config } from "tailwindcss";

export const twConfig = resolveConfig(tailwindConfig as Config);

/**
 * Merge Tailwind CSS classes
 * @param classes The classes to merge
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}
