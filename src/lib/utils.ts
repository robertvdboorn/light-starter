import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes without conflicts.
 *
 * `clsx` handles conditional/array inputs; `twMerge` resolves Tailwind
 * class conflicts (e.g. `p-4` + `p-2` → `p-2`). Import and use `cn`
 * anywhere you need to combine class strings.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
