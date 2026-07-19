import { getGarment, GARMENTS, getGarmentsByCategory } from "@/data/garments";
import { scoreOutfit } from "@/lib/scoring";
import type {
  CombinationSuggestion,
  Garment,
  GarmentCategory,
  OutfitSlot,
} from "@/types";

export interface ClassicTemplate {
  id: string;
  name: string;
  description: string;
  slots: Partial<Record<OutfitSlot, string>>;
}

/** Classic outfit templates used by the combination engine. */
export const CLASSIC_TEMPLATES: ClassicTemplate[] = [
  {
    id: "navy-blazer-foundation",
    name: "Navy Blazer Foundation",
    description: "The eternal smart-casual base: navy blazer, grey trousers, white OCBD, brown penny loafers.",
    slots: {
      blazer: "blz-navy-wool",
      shirt: "shr-white-oxford",
      trousers: "trs-grey-wool",
      shoes: "lof-brown-penny",
      belt: "blt-brown-calf",
      tie: "tie-navy-grenadine",
      pocketSquare: "psq-white-linen",
      watch: "wch-silver-dress",
    },
  },
  {
    id: "riviera-linen",
    name: "Riviera Linen",
    description: "Warm-weather ease in beige linen with ivory shirt and tan suede loafers.",
    slots: {
      blazer: "blz-beige-linen",
      shirt: "shr-linen-ivory",
      trousers: "trs-beige-linen",
      shoes: "lof-suede-tan",
      belt: "blt-tan-suede",
      sunglasses: "sgg-gold-wire",
      watch: "wch-gold-dress",
    },
  },
  {
    id: "winter-flannel",
    name: "Winter Flannel",
    description: "Charcoal flannel blazer and trousers with Chelsea boots for cold months.",
    slots: {
      blazer: "blz-charcoal-flannel",
      shirt: "shr-white-poplin",
      trousers: "trs-charcoal-flannel",
      shoes: "bts-chelsea-brown",
      belt: "blt-brown-calf",
      tie: "tie-burgundy-silk",
      pocketSquare: "psq-ivory-silk",
      outerwear: "coat-camel-hair",
      scarf: "scf-cashmere-grey",
    },
  },
  {
    id: "quiet-cashmere",
    name: "Quiet Cashmere",
    description: "Unstructured cashmere layers with cream trousers and white sneakers.",
    slots: {
      jacket: "jkt-cashmere-grey",
      shirt: "shr-polo-camel",
      trousers: "trs-cream-wool",
      shoes: "snk-white-leather",
      watch: "wch-sport-steel",
      outerwear: "coat-cashmere-charcoal",
    },
  },
  {
    id: "old-money-weekend",
    name: "Old Money Weekend",
    description: "Cream trousers, navy polo, brown loafers — understated leisure.",
    slots: {
      shirt: "shr-navy-polo",
      trousers: "trs-cream-wool",
      shoes: "lof-brown-penny",
      belt: "blt-brown-calf",
      watch: "wch-silver-dress",
      sunglasses: "sgg-tortoiseshell",
    },
  },
  {
    id: "parisian",
    name: "Parisian Tailoring",
    description: "Navy suit, pale pink shirt, burgundy tie — Left Bank polish.",
    slots: {
      suit: "sut-navy-wool",
      shirt: "shr-pink-poplin",
      shoes: "sho-brown-derby",
      belt: "blt-brown-calf",
      tie: "tie-burgundy-silk",
      pocketSquare: "psq-white-linen",
      watch: "wch-silver-dress",
    },
  },
  {
    id: "camel-polo",
    name: "Camel Polo Evening",
    description: "Camel knit polo with olive trousers and burgundy tassels.",
    slots: {
      shirt: "shr-polo-camel",
      trousers: "trs-olive-cotton",
      shoes: "lof-tassel-burgundy",
      belt: "blt-brown-calf",
      jacket: "jkt-suede-tan",
      watch: "wch-gold-dress",
    },
  },
  {
    id: "denim-oxford",
    name: "Denim & Oxford",
    description: "White OCBD, indigo jeans, brown loafers — American classics.",
    slots: {
      shirt: "shr-white-oxford",
      trousers: "jns-indigo-slim",
      shoes: "lof-brown-penny",
      belt: "blt-brown-calf",
      jacket: "jkt-bomber-navy",
      watch: "wch-sport-steel",
    },
  },
  {
    id: "boardroom",
    name: "Boardroom Charcoal",
    description: "Charcoal pinstripe suit with black oxfords and silver watch.",
    slots: {
      suit: "sut-charcoal-pinstripe",
      shirt: "shr-white-poplin",
      shoes: "sho-black-oxford",
      belt: "blt-black-calf",
      tie: "tie-navy-dot",
      pocketSquare: "psq-white-linen",
      watch: "wch-silver-dress",
      bag: "bag-brief-brown",
    },
  },
  {
    id: "country-weekend",
    name: "Country Weekend",
    description: "Olive field jacket, chambray, chinos, and suede chukkas.",
    slots: {
      jacket: "jkt-field-olive",
      shirt: "shr-chambray-blue",
      trousers: "chn-khaki",
      shoes: "bts-chukka-suede",
      belt: "blt-woven-brown",
      scarf: "scf-burgundy-check",
      bag: "bag-tote-canvas",
    },
  },
];

function slotsToSuggestion(
  template: ClassicTemplate,
  score?: number
): CombinationSuggestion {
  return {
    id: `tpl-${template.id}`,
    name: template.name,
    description: template.description,
    slots: { ...template.slots },
    score: score ?? scoreOutfit(template.slots).total,
    rationale: template.description,
    templateId: template.id,
  };
}

export function suggestCombinations(limit = 8): CombinationSuggestion[] {
  return CLASSIC_TEMPLATES.map((t) => slotsToSuggestion(t))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

const SLOT_FOR_CATEGORY: Partial<Record<GarmentCategory, OutfitSlot>> = {
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

function pickBest(
  candidates: Garment[],
  seed: Garment,
  excludeIds: Set<string>
): Garment | undefined {
  const scored = candidates
    .filter((g) => !excludeIds.has(g.id))
    .map((g) => {
      let s = 50;
      if (seed.pairsWith?.includes(g.id)) s += 30;
      if (g.pairsWith?.includes(seed.id)) s += 20;
      if (g.color === seed.color) s += 5;
      if (Math.abs(g.formality - seed.formality) <= 1) s += 15;
      else if (Math.abs(g.formality - seed.formality) <= 2) s += 5;
      else s -= 10;
      const sharedOcc = g.occasions.filter((o) => seed.occasions.includes(o)).length;
      s += sharedOcc * 4;
      if (seed.avoidsWith?.includes(g.id)) s -= 40;
      return { g, s };
    })
    .sort((a, b) => b.s - a.s);
  return scored[0]?.g;
}

/** Build a complete outfit around a seed garment. */
export function buildAroundSeed(seedId: string): CombinationSuggestion | null {
  const seed = getGarment(seedId);
  if (!seed) return null;

  const slots: Partial<Record<OutfitSlot, string>> = {};
  const seedSlot = SLOT_FOR_CATEGORY[seed.category];
  if (seedSlot) slots[seedSlot] = seed.id;

  const used = new Set<string>([seed.id]);

  const needs: { slot: OutfitSlot; categories: GarmentCategory[] }[] = [
    { slot: "shirt", categories: ["shirts"] },
    { slot: "trousers", categories: ["trousers", "chinos", "jeans"] },
    { slot: "shoes", categories: ["loafers", "shoes", "boots", "sneakers"] },
    { slot: "belt", categories: ["belts"] },
    { slot: "blazer", categories: ["blazers"] },
    { slot: "watch", categories: ["watches"] },
  ];

  // If seed is a suit, skip blazer/trousers
  if (seed.category === "suits") {
    // suit covers jacket + trousers
  }

  for (const need of needs) {
    if (slots[need.slot]) continue;
    if (seed.category === "suits" && (need.slot === "blazer" || need.slot === "trousers")) {
      continue;
    }
    if (
      ["blazers", "jackets", "suits"].includes(seed.category) &&
      need.slot === "blazer"
    ) {
      continue;
    }

    const pool = need.categories.flatMap((c) => getGarmentsByCategory(c));
    const pick = pickBest(pool, seed, used);
    if (pick) {
      slots[need.slot] = pick.id;
      used.add(pick.id);
    }
  }

  // Optional accessories for higher-formality seeds
  if (seed.formality >= 3 && !slots.tie && seed.category !== "jeans") {
    const tie = pickBest(getGarmentsByCategory("ties"), seed, used);
    if (tie && slots.shirt) {
      const shirt = getGarment(slots.shirt);
      if (shirt && !shirt.tags.includes("polo") && shirt.fabric !== "knit") {
        slots.tie = tie.id;
        used.add(tie.id);
        const psq = pickBest(getGarmentsByCategory("pocket-squares"), seed, used);
        if (psq) slots.pocketSquare = psq.id;
      }
    }
  }

  const breakdown = scoreOutfit(slots);
  return {
    id: `seed-${seedId}-${Date.now()}`,
    name: `Built around ${seed.name}`,
    description: `An outfit composed to showcase the ${seed.name}.`,
    slots,
    score: breakdown.total,
    rationale: `Anchored on ${seed.name} (${seed.brandInspiration} inspiration), balanced for color and formality.`,
    seedGarmentId: seedId,
  };
}

/** Suggest alternative garments for a given slot in the current selection. */
export function suggestAlternatives(
  currentSlots: Partial<Record<OutfitSlot, string>>,
  slot: OutfitSlot,
  limit = 5
): Garment[] {
  const categoryMap: Partial<Record<OutfitSlot, GarmentCategory[]>> = {
    outerwear: ["coats"],
    jacket: ["jackets"],
    blazer: ["blazers"],
    suit: ["suits"],
    shirt: ["shirts"],
    trousers: ["trousers", "jeans", "chinos"],
    shoes: ["shoes", "loafers", "boots", "sneakers"],
    belt: ["belts"],
    tie: ["ties"],
    pocketSquare: ["pocket-squares"],
    watch: ["watches"],
    scarf: ["scarves"],
    sunglasses: ["sunglasses"],
    bag: ["bags"],
  };

  const cats = categoryMap[slot] ?? [];
  const currentId = currentSlots[slot];
  const others = Object.entries(currentSlots)
    .filter(([s, id]) => s !== slot && id)
    .map(([, id]) => getGarment(id!))
    .filter((g): g is Garment => Boolean(g));

  const pool = cats
    .flatMap((c) => getGarmentsByCategory(c))
    .filter((g) => g.id !== currentId);

  const ranked = pool
    .map((g) => {
      const testSlots = { ...currentSlots, [slot]: g.id };
      const score = scoreOutfit(testSlots).total;
      let boost = 0;
      for (const o of others) {
        if (o.pairsWith?.includes(g.id)) boost += 8;
        if (Math.abs(o.formality - g.formality) <= 1) boost += 3;
      }
      return { g, score: score + boost };
    })
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, limit).map((r) => r.g);
}

export function getTemplateById(id: string): ClassicTemplate | undefined {
  return CLASSIC_TEMPLATES.find((t) => t.id === id);
}

/** All garments — re-exported for engine consumers. */
export { GARMENTS };
