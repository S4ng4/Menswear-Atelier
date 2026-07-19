import clsx, { type ClassValue } from "clsx";
import type { FormalityLevel } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

const FORMALITY_LABELS: Record<FormalityLevel, string> = {
  1: "Casual",
  2: "Relaxed",
  3: "Smart Casual",
  4: "Business",
  5: "Formal",
};

export function formatFormality(level: FormalityLevel | number): string {
  const clamped = Math.min(5, Math.max(1, Math.round(level))) as FormalityLevel;
  return FORMALITY_LABELS[clamped] ?? `Level ${level}`;
}

/** Turn kebab-case or snake_case ids into Title Case labels. */
export function formatLabel(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
