import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes
 * @param classes The classes to merge
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}
