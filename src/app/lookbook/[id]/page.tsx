"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";
import { getOutfit } from "@/data/outfits";
import { getGarment } from "@/data/garments";
import { explainOutfit, scoreOutfit } from "@/lib/scoring";
import { suggestAlternatives } from "@/lib/combinationEngine";
import { LookIllustration } from "@/components/shared/LookIllustration";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/ui/FilterChip";
import { useFavoritesStore, COLLECTIONS } from "@/store/favoritesStore";
import { useOutfitStore } from "@/store/outfitStore";
import { formatLabel } from "@/lib/utils";
import type { FavoriteCollection, Garment, OutfitSlot } from "@/types";

export default function LookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const outfitOrUndef = getOutfit(id);
  if (!outfitOrUndef) notFound();
  const outfit = outfitOrUndef;

  const save = useFavoritesStore((s) => s.save);
  const isSaved = useFavoritesStore((s) => s.isSavedOutfit(id));
  const applyCombination = useOutfitStore((s) => s.applyCombination);

  const [collection, setCollection] = useState<FavoriteCollection>("favorites");
  const [flash, setFlash] = useState(false);

  const garments = useMemo(
    () =>
      Object.values(outfit.slots)
        .map((gid) => getGarment(gid!))
        .filter((g): g is Garment => Boolean(g)),
    [outfit],
  );

  const score = scoreOutfit(outfit);
  const explanation = explainOutfit(outfit);

  const palettes = useMemo(() => {
    const colors = [...new Set(garments.map((g) => g.hex))];
    return colors;
  }, [garments]);

  const altSlot: OutfitSlot =
    (Object.keys(outfit.slots)[0] as OutfitSlot) || "blazer";
  const alternatives = suggestAlternatives(outfit.slots, altSlot, 4);

  function onSave() {
    save({
      name: outfit.name,
      slots: { ...outfit.slots },
      outfitId: outfit.id,
      collection,
      score: score.total,
      notes: outfit.styleNotes,
    });
    setFlash(true);
    window.setTimeout(() => setFlash(false), 1600);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-warm-gold">
        {outfit.lookbookCategory}
      </p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl text-charcoal">
        {outfit.name}
      </h1>
      <p className="mt-3 max-w-2xl text-charcoal-muted leading-relaxed">
        {outfit.description}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <LookIllustration
          outfit={outfit}
          garments={garments}
          priority
          className="aspect-[3/4] w-full max-h-[720px] atelier-shadow"
        />

        <div className="space-y-8">
          <div className="flex flex-wrap items-start gap-8">
            <ScoreRing score={score.total} />
            <div className="flex-1 min-w-[200px]">
              <h2 className="font-serif text-2xl text-charcoal">Why it works</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                {explanation}
              </p>
              {outfit.styleNotes ? (
                <p className="mt-3 text-sm italic text-navy/80">
                  {outfit.styleNotes}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Garments</h2>
            <ul className="mt-4 space-y-3">
              {garments.map((g) => (
                <li
                  key={g.id}
                  className="flex items-center gap-3 border-b border-border-soft pb-3"
                >
                  <span
                    className="h-8 w-8 shrink-0 rounded-lg border border-black/5"
                    style={{ backgroundColor: g.hex }}
                  />
                  <div>
                    <p className="text-sm font-medium text-charcoal">{g.name}</p>
                    <p className="text-xs text-charcoal-muted">
                      {formatLabel(g.category)} · {formatLabel(g.fabric)} ·{" "}
                      {g.brandInspiration}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Palette</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {palettes.map((hex) => (
                <span
                  key={hex}
                  className="h-10 w-10 rounded-full border border-border-soft atelier-shadow"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>
          </div>

          {alternatives.length > 0 ? (
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Alternatives</h2>
              <p className="mt-1 text-sm text-charcoal-muted">
                Nearby pieces that keep the same spirit.
              </p>
              <ul className="mt-4 space-y-2">
                {alternatives.map((g) => (
                  <li
                    key={g.id}
                    className="flex items-center gap-3 text-sm text-charcoal"
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: g.hex }}
                    />
                    {g.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <Button
              href="/builder"
              variant="primary"
              onClick={() => applyCombination(outfit.slots)}
            >
              Open in builder
            </Button>
            {/* Button with href ignores onClick on the Link — apply via separate control */}
            <Button
              variant="secondary"
              onClick={() => {
                applyCombination(outfit.slots);
                window.location.href = "/builder";
              }}
            >
              Load &amp; edit
            </Button>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={collection}
                onChange={(e) =>
                  setCollection(e.target.value as FavoriteCollection)
                }
                className="rounded-[var(--radius)] border border-border-soft bg-surface px-3 py-2 text-sm"
              >
                {COLLECTIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Button variant="gold" onClick={onSave}>
                <Heart size={14} />
                {flash ? "Saved" : isSaved ? "Save again" : "Save"}
              </Button>
            </div>
          </div>

          <Link
            href="/lookbook"
            className="inline-block text-sm text-navy underline underline-offset-4 decoration-warm-gold/40"
          >
            ← Back to lookbook
          </Link>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-2">
        {outfit.occasions.map((o) => (
          <FilterChip key={o} label={formatLabel(o)} active={false} />
        ))}
        {outfit.seasons.map((s) => (
          <FilterChip key={s} label={formatLabel(s)} active={false} />
        ))}
      </div>
    </div>
  );
}
