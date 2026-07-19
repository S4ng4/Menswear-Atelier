"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import type {
  FavoriteCollection,
  Garment,
  GarmentCategory,
  OutfitSlot,
} from "@/types";
import {
  CATEGORY_LABELS,
  COLOR_FILTERS,
  FABRIC_FILTERS,
  OCCASION_FILTERS,
  ALL_CATEGORIES,
} from "@/data/taxonomy";
import { getGarmentsByCategory } from "@/data/garments";
import { suggestCombinations } from "@/lib/combinationEngine";
import { useOutfitStore } from "@/store/outfitStore";
import { useFavoritesStore, COLLECTIONS } from "@/store/favoritesStore";
import { FilterChip } from "@/components/ui/FilterChip";
import { Button } from "@/components/ui/Button";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { ModelPreview } from "@/components/builder/ModelPreview";
import { formatLabel } from "@/lib/utils";

const CATEGORY_TO_SLOT: Partial<Record<GarmentCategory, OutfitSlot>> = {
  coats: "outerwear",
  jackets: "jacket",
  blazers: "blazer",
  suits: "suit",
  shirts: "shirt",
  trousers: "trousers",
  jeans: "trousers",
  chinos: "trousers",
  shoes: "shoes",
  loafers: "shoes",
  boots: "shoes",
  sneakers: "shoes",
  belts: "belt",
  ties: "tie",
  "pocket-squares": "pocketSquare",
  watches: "watch",
  scarves: "scarf",
  sunglasses: "sunglasses",
  bags: "bag",
};

const BREAKDOWN_KEYS = [
  { key: "colorHarmony", label: "Color" },
  { key: "fabricHarmony", label: "Fabric" },
  { key: "formalityBalance", label: "Formality" },
  { key: "occasionFit", label: "Occasion" },
  { key: "proportion", label: "Proportion" },
  { key: "ruleCompliance", label: "Rules" },
] as const;

function BreakdownBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-charcoal-muted">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-sand/80">
        <motion.div
          className="h-full rounded-full bg-navy"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function OutfitBuilder() {
  const selection = useOutfitStore((s) => s.selection);
  const enabledCategories = useOutfitStore((s) => s.enabledCategories);
  const filters = useOutfitStore((s) => s.filters);
  const toggleCategory = useOutfitStore((s) => s.toggleCategory);
  const setFilters = useOutfitStore((s) => s.setFilters);
  const selectGarment = useOutfitStore((s) => s.selectGarment);
  const applyCombination = useOutfitStore((s) => s.applyCombination);
  const resetToFoundation = useOutfitStore((s) => s.resetToFoundation);
  const getSelectedGarments = useOutfitStore((s) => s.getSelectedGarments);
  const getScore = useOutfitStore((s) => s.getScore);
  const getExplanation = useOutfitStore((s) => s.getExplanation);

  const saveFavorite = useFavoritesStore((s) => s.save);

  const [activeCategory, setActiveCategory] = useState<GarmentCategory>("blazers");
  const [collection, setCollection] = useState<FavoriteCollection>("favorites");
  const [savedFlash, setSavedFlash] = useState(false);

  const garments = getSelectedGarments();
  const score = getScore();
  const explanation = getExplanation();
  const suggestions = useMemo(() => suggestCombinations(6), []);

  const filteredItems = useMemo(() => {
    let items = getGarmentsByCategory(activeCategory);
    if (filters.colors.length) {
      items = items.filter((g) => filters.colors.includes(g.color));
    }
    if (filters.fabrics.length) {
      items = items.filter((g) => filters.fabrics.includes(g.fabric));
    }
    if (filters.occasions.length) {
      items = items.filter((g) =>
        g.occasions.some((o) => filters.occasions.includes(o)),
      );
    }
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      items = items.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.brandInspiration.toLowerCase().includes(q) ||
          g.tags.some((t) => t.includes(q)),
      );
    }
    return items;
  }, [activeCategory, filters]);

  const activeSlot = CATEGORY_TO_SLOT[activeCategory];
  const selectedId = activeSlot ? selection[activeSlot] : undefined;

  function onPick(garment: Garment) {
    const slot = CATEGORY_TO_SLOT[garment.category];
    if (!slot) return;
    if (selection[slot] === garment.id) {
      selectGarment(slot, null);
    } else {
      selectGarment(slot, garment.id);
    }
  }

  function onSave() {
    const name =
      garments.map((g) => g.name).slice(0, 2).join(" · ") || "Untitled look";
    saveFavorite({
      name,
      slots: { ...selection },
      collection,
      score: score.total,
    });
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1800);
  }

  function toggleFilter<T extends string>(
    key: "colors" | "fabrics" | "occasions",
    id: T,
  ) {
    const current = filters[key] as T[];
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    setFilters({ [key]: next });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-warm-gold">
          Outfit Builder
        </p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">
          Compose with intention
        </h1>
        <p className="mt-3 text-charcoal-muted leading-relaxed">
          Enable categories, refine by color and cloth, then lock a combination
          that scores against classic menswear rules.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-8 min-w-0">
          {/* Category toggles */}
          <section>
            <h2 className="mb-3 text-xs uppercase tracking-[0.18em] text-charcoal-muted">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((cat) => {
                const on = enabledCategories.includes(cat);
                return (
                  <FilterChip
                    key={cat}
                    label={CATEGORY_LABELS[cat]}
                    active={on && activeCategory === cat}
                    onClick={() => {
                      if (!on) toggleCategory(cat);
                      setActiveCategory(cat);
                      if (on && activeCategory === cat) toggleCategory(cat);
                    }}
                  />
                );
              })}
            </div>
            <p className="mt-2 text-xs text-charcoal-muted">
              Click a category to browse. Active chip is the current grid.
              Toggle off to hide from filters.
            </p>
          </section>

          {/* Filters */}
          <section className="space-y-4">
            <div>
              <h2 className="mb-2 text-xs uppercase tracking-[0.18em] text-charcoal-muted">
                Color
              </h2>
              <div className="flex flex-wrap gap-2">
                {COLOR_FILTERS.map((c) => (
                  <FilterChip
                    key={c.id}
                    label={c.label}
                    colorSwatch={c.hex}
                    active={filters.colors.includes(c.id)}
                    onClick={() => toggleFilter("colors", c.id)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-xs uppercase tracking-[0.18em] text-charcoal-muted">
                Fabric
              </h2>
              <div className="flex flex-wrap gap-2">
                {FABRIC_FILTERS.map((f) => (
                  <FilterChip
                    key={f.id}
                    label={f.label}
                    active={filters.fabrics.includes(f.id)}
                    onClick={() => toggleFilter("fabrics", f.id)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-xs uppercase tracking-[0.18em] text-charcoal-muted">
                Occasion
              </h2>
              <div className="flex flex-wrap gap-2">
                {OCCASION_FILTERS.map((o) => (
                  <FilterChip
                    key={o.id}
                    label={o.label}
                    active={filters.occasions.includes(o.id)}
                    onClick={() => toggleFilter("occasions", o.id)}
                  />
                ))}
              </div>
            </div>
            <input
              type="search"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder="Search name, brand, tag…"
              className="w-full max-w-md rounded-[var(--radius)] border border-border-soft bg-surface px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/60 focus:border-warm-gold/50 focus:outline-none focus:ring-2 focus:ring-warm-gold/25"
            />
          </section>

          {/* Item grid */}
          <section>
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="font-serif text-2xl text-charcoal">
                {CATEGORY_LABELS[activeCategory]}
              </h2>
              <span className="text-xs text-charcoal-muted">
                {filteredItems.length} pieces
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {filteredItems.map((g) => {
                const selected = selectedId === g.id;
                return (
                  <motion.button
                    key={g.id}
                    type="button"
                    onClick={() => onPick(g)}
                    whileHover={{ y: -2 }}
                    className={`text-left rounded-[var(--radius)] border p-3 transition-colors ${
                      selected
                        ? "border-navy bg-navy/5 atelier-shadow"
                        : "border-border-soft bg-surface/80 hover:border-border-strong"
                    }`}
                  >
                    <span
                      className="mb-3 block aspect-[4/3] rounded-xl border border-black/5"
                      style={{
                        background: `linear-gradient(145deg, ${g.hex} 0%, ${g.hex}cc 100%)`,
                      }}
                    />
                    <span className="block font-medium text-sm text-charcoal leading-snug">
                      {g.name}
                    </span>
                    <span className="mt-1 block text-xs text-charcoal-muted">
                      {formatLabel(g.fabric)} · {g.brandInspiration}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            {filteredItems.length === 0 ? (
              <p className="py-10 text-center text-sm text-charcoal-muted">
                No pieces match these filters.
              </p>
            ) : null}
          </section>

          {/* Suggestions */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-warm-gold" />
              <h2 className="font-serif text-2xl text-charcoal">
                Combination suggestions
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => applyCombination(s.slots)}
                  className="rounded-[var(--radius)] border border-border-soft bg-surface/90 p-4 text-left hover:border-warm-gold/40 transition-colors atelier-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-serif text-lg text-charcoal">{s.name}</p>
                    <span className="text-xs text-charcoal-muted tabular-nums">
                      {s.score}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-charcoal-muted leading-relaxed">
                    {s.rationale}
                  </p>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky preview column */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
          <ModelPreview garments={garments} />

          <div className="rounded-[var(--radius)] border border-border-soft bg-surface/95 p-5 atelier-shadow">
            <div className="flex items-center justify-center">
              <ScoreRing score={score.total} />
            </div>

            <div className="mt-5 space-y-3">
              {BREAKDOWN_KEYS.map(({ key, label }) => (
                <BreakdownBar key={key} label={label} value={score[key]} />
              ))}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-charcoal-muted">
              {explanation}
            </p>

            {(score.deductions.length > 0 || score.bonuses.length > 0) && (
              <ul className="mt-4 space-y-1.5 text-xs">
                {score.bonuses.map((b) => (
                  <li key={b.id} className="text-navy">
                    +{b.points} {b.label}
                  </li>
                ))}
                {score.deductions.map((d) => (
                  <li key={d.ruleId} className="text-charcoal-muted">
                    −{d.points} {d.label}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 space-y-3">
              <label className="block text-xs uppercase tracking-[0.16em] text-charcoal-muted">
                Save to collection
                <select
                  value={collection}
                  onChange={(e) =>
                    setCollection(e.target.value as FavoriteCollection)
                  }
                  className="mt-2 w-full rounded-[var(--radius)] border border-border-soft bg-ivory px-3 py-2 text-sm text-charcoal normal-case tracking-normal"
                >
                  {COLLECTIONS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="gold"
                  size="sm"
                  onClick={onSave}
                  className="flex-1"
                >
                  <Heart size={14} />
                  {savedFlash ? "Saved" : "Save look"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetToFoundation}
                  aria-label="Reset to foundation"
                >
                  <RotateCcw size={14} />
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
