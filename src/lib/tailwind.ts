import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge CSS ClassNames
 * Accepts multiple class names, arrays, and conditional objects, and merges them into a single string.
 *
 * @param {...ClassValue[]} inputs
 * @returns {string}
 *
 * @example
 * console.log(cn("text-base", "bg-white")) // "text-base bg-white"
 *
 * @example
 * console.log(cn("text-base", ["bg-white", "rounded-lg"])) // "text-base bg-white rounded-lg"
 *
 * @example
 *
 * const isAuthenticated = true;
 * cn("text-base", ["bg-white", "rounded-lg"], { hidden: !isAuthenticated, block: isAuthenticated }); // "text-base bg-white rounded-lg block"
 *
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
