"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { COLLECTIONS, useFavoritesStore } from "@/store/favoritesStore";
import { useOutfitStore } from "@/store/outfitStore";
import { getGarment } from "@/data/garments";
import { FilterChip } from "@/components/ui/FilterChip";
import { Button } from "@/components/ui/Button";
import type { FavoriteCollection } from "@/types";

export default function FavoritesPage() {
  const saved = useFavoritesStore((s) => s.saved);
  const remove = useFavoritesStore((s) => s.remove);
  const move = useFavoritesStore((s) => s.move);
  const applyCombination = useOutfitStore((s) => s.applyCombination);
  const [collection, setCollection] = useState<FavoriteCollection | "all">("all");

  const filtered = useMemo(() => {
    if (collection === "all") return saved;
    return saved.filter((s) => s.collection === collection);
  }, [saved, collection]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-[11px] uppercase tracking-[0.25em] text-warm-gold">
        Favorites
      </p>
      <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">
        Your collections
      </h1>
      <p className="mt-3 max-w-xl text-sm text-charcoal-muted">
        Save looks from the builder or lookbook into Work, Weekend, Travel,
        Evening, and more.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip
          label="All"
          active={collection === "all"}
          onClick={() => setCollection("all")}
        />
        {COLLECTIONS.map((c) => (
          <FilterChip
            key={c.id}
            label={c.label}
            active={collection === c.id}
            onClick={() => setCollection(c.id)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 rounded-[16px] border border-dashed border-border-soft py-20 text-center">
          <Heart className="mx-auto h-8 w-8 text-sand" strokeWidth={1.25} />
          <p className="mt-4 font-serif text-2xl text-charcoal">No saved looks yet</p>
          <p className="mt-2 text-sm text-charcoal-muted">
            Build an outfit or open a lookbook entry to save it here.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/builder" variant="primary" size="sm">
              Builder
            </Button>
            <Button href="/lookbook" variant="secondary" size="sm">
              Lookbook
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((fav) => {
            const garments = Object.values(fav.slots)
              .map((id) => (id ? getGarment(id) : undefined))
              .filter(Boolean);
            return (
              <article
                key={fav.id}
                className="rounded-[16px] border border-border-soft bg-surface p-6 shadow-[var(--atelier-shadow)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gold">
                      {COLLECTIONS.find((c) => c.id === fav.collection)?.label ??
                        fav.collection}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl text-charcoal">
                      {fav.name}
                    </h2>
                    <p className="mt-1 text-xs text-charcoal-muted">
                      {fav.score != null ? `Elegance ${fav.score} · ` : ""}
                      {new Date(fav.savedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {garments.slice(0, 5).map((g) => (
                      <span
                        key={g!.id}
                        className="h-6 w-6 rounded-full ring-1 ring-black/5"
                        style={{ backgroundColor: g!.hex }}
                        title={g!.name}
                      />
                    ))}
                  </div>
                </div>

                <ul className="mt-4 space-y-1">
                  {garments.map((g) => (
                    <li key={g!.id} className="text-xs text-charcoal-muted">
                      {g!.name}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <Link
                    href="/builder"
                    onClick={() => applyCombination(fav.slots)}
                    className="rounded-[16px] bg-charcoal px-4 py-2 text-[11px] uppercase tracking-wider text-ivory"
                  >
                    Open in Builder
                  </Link>
                  {fav.outfitId && (
                    <Link
                      href={`/lookbook/${fav.outfitId}`}
                      className="rounded-[16px] border border-border-soft px-4 py-2 text-[11px] uppercase tracking-wider text-charcoal-muted hover:text-charcoal"
                    >
                      Details
                    </Link>
                  )}
                  <select
                    value={fav.collection}
                    onChange={(e) =>
                      move(fav.id, e.target.value as FavoriteCollection)
                    }
                    className="rounded-[16px] border border-border-soft bg-ivory px-2 py-1.5 text-[11px] outline-none"
                  >
                    {COLLECTIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => remove(fav.id)}
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-charcoal-muted hover:text-charcoal"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
