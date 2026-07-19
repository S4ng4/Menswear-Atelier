"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  colorSwatch?: string;
  className?: string;
}

export function FilterChip({
  label,
  active = false,
  onClick,
  colorSwatch,
  className,
}: FilterChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors border",
        active
          ? "bg-navy text-ivory border-navy shadow-atelier"
          : "bg-surface/80 text-charcoal-muted border-border-soft hover:border-border-strong hover:text-charcoal",
        className,
      )}
      aria-pressed={active}
    >
      {colorSwatch ? (
        <span
          className="h-3 w-3 shrink-0 rounded-full border border-black/10"
          style={{ backgroundColor: colorSwatch }}
          aria-hidden
        />
      ) : null}
      <span>{label}</span>
    </motion.button>
  );
}
