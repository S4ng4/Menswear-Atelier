"use client";

import { useMemo, useState } from "react";
import { FilterChip } from "@/components/ui/FilterChip";
import { LookCard } from "@/components/lookbook/LookCard";
import { LOOKBOOK_CATEGORIES, OUTFITS, getLooksByCategory } from "@/data/outfits";
import type { LookbookCategory } from "@/types";

export default function LookbookPage() {
  const [category, setCategory] = useState<LookbookCategory | "all">("featured");

  const looks = useMemo(() => {
    if (category === "all") return OUTFITS.slice(0, 48);
    return getLooksByCategory(category).slice(0, 48);
  }, [category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-warm-gold">
          Lookbook
        </p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl text-charcoal">
          Curated combinations
        </h1>
        <p className="mt-3 text-charcoal-muted leading-relaxed">
          Browse featured foundations, seasonal cloth, and occasion-led looks —
          each scored against classic style rules.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip
          label="All"
          active={category === "all"}
          onClick={() => setCategory("all")}
        />
        {LOOKBOOK_CATEGORIES.map((c) => (
          <FilterChip
            key={c.id}
            label={c.label}
            active={category === c.id}
            onClick={() => setCategory(c.id)}
          />
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {looks.map((outfit, i) => (
          <LookCard key={outfit.id} outfit={outfit} index={i} />
        ))}
      </div>

      {looks.length === 0 ? (
        <p className="py-20 text-center text-charcoal-muted">
          No looks in this category yet.
        </p>
      ) : null}
    </div>
  );
}
