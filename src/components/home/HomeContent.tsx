"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { LookCard } from "@/components/lookbook/LookCard";
import { Button } from "@/components/ui/Button";
import {
  getFeaturedLooks,
  getPopularLooks,
  getSeasonalLooks,
} from "@/data/outfits";
import { STYLE_RULES } from "@/data/styleRules";

export function HomeContent() {
  const featured = getFeaturedLooks().slice(0, 4);
  const seasonal = getSeasonalLooks().slice(0, 4);
  const popular = getPopularLooks(4);
  const rulesPreview = STYLE_RULES.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Section
        eyebrow="Lookbook"
        title="Featured looks"
        subtitle="Signature combinations that define the Atelier house style."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((outfit, i) => (
            <LookCard key={outfit.id} outfit={outfit} index={i} />
          ))}
        </div>
        <div className="mt-10">
          <Button href="/lookbook" variant="secondary">
            View full lookbook
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Season"
        title="Seasonal dressing"
        subtitle="Fabrics and weights that respect the weather without losing elegance."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {seasonal.map((outfit, i) => (
            <LookCard key={outfit.id} outfit={outfit} index={i} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Popular"
        title="Most revisited"
        subtitle="Looks readers return to — foundations worth owning."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((outfit, i) => (
            <LookCard key={outfit.id} outfit={outfit} index={i} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Craft"
        title="Style rules that endure"
        subtitle="Soft guidance and hard stops from classic menswear tradition."
        className="pb-24"
      >
        <ul className="grid gap-6 md:grid-cols-2">
          {rulesPreview.map((rule) => (
            <li
              key={rule.id}
              className="border-t border-border-soft pt-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl text-charcoal">{rule.name}</h3>
                <span className="text-[10px] uppercase tracking-[0.16em] text-warm-gold">
                  {rule.severity}
                </span>
              </div>
              <p className="mt-2 text-sm text-charcoal-muted leading-relaxed">
                {rule.description}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link
            href="/rules"
            className="text-sm text-navy underline underline-offset-4 decoration-warm-gold/50 hover:decoration-warm-gold"
          >
            Read all style rules
          </Link>
        </div>
      </Section>
    </div>
  );
}
