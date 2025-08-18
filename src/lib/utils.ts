// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` is a utility to merge Tailwind CSS classes conditionally.
 * It uses `clsx` to handle conditional classNames and `twMerge` to merge conflicting Tailwind classes.
 *
 * @param {...ClassValue[]} inputs - class names or conditional className objects
 * @returns {string} merged className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
