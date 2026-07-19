"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Outfit } from "@/types";
import { LookIllustration } from "@/components/shared/LookIllustration";
import { scoreOutfit } from "@/lib/scoring";

export interface LookCardProps {
  outfit: Outfit;
  index?: number;
}

export function LookCard({ outfit, index = 0 }: LookCardProps) {
  const score = scoreOutfit(outfit).total;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.36),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/lookbook/${outfit.id}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-gold/50 rounded-[var(--radius)]"
      >
        <div className="overflow-hidden rounded-[var(--radius)] atelier-shadow transition-shadow group-hover:shadow-atelier-lg">
          <LookIllustration outfit={outfit} className="aspect-[3/4] w-full" />
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-warm-gold">
              {outfit.lookbookCategory}
            </p>
            <h3 className="mt-1 font-serif text-xl text-charcoal group-hover:text-navy transition-colors">
              {outfit.name}
            </h3>
          </div>
          <span
            className="shrink-0 rounded-full border border-border-soft bg-surface px-2.5 py-1 text-xs text-charcoal-muted"
            aria-label={`Elegance score ${score}`}
          >
            {score}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
