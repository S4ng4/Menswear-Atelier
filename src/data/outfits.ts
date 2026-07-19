import type {
  LookbookCategory,
  OccasionFilter,
  Outfit,
  OutfitSlot,
  Season,
} from "@/types";
import { getGarment } from "@/data/garments";

/** Featured look seeds — image paths under /images/looks/ */
export const SEEDS: Outfit[] = [
  {
    id: "look-navy-foundation",
    name: "Navy Foundation",
    description: "The house classic — navy blazer, grey wool, white oxford, brown pennies.",
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
    occasions: ["business-casual", "smart-casual", "business"],
    seasons: ["all-season"],
    formality: 4,
    lookbookCategory: "featured",
    featured: true,
    popular: true,
    image: "/images/looks/navy-foundation.jpg",
    tags: ["foundation", "classic", "navy"],
    styleNotes: "Start here. Swap the tie for knit when the day softens.",
  },
  {
    id: "look-riviera-linen",
    name: "Riviera Linen",
    description: "Beige linen tailoring with ivory shirt and tan suede loafers.",
    slots: {
      blazer: "blz-beige-linen",
      shirt: "shr-linen-ivory",
      trousers: "trs-beige-linen",
      shoes: "lof-suede-tan",
      belt: "blt-tan-suede",
      sunglasses: "sgg-gold-wire",
      watch: "wch-gold-dress",
    },
    occasions: ["resort", "smart-casual", "wedding", "weekend"],
    seasons: ["spring", "summer"],
    formality: 3,
    lookbookCategory: "featured",
    featured: true,
    popular: true,
    image: "/images/looks/riviera-linen.jpg",
    tags: ["summer", "linen", "resort"],
    styleNotes: "Embrace the crease — linen should look lived-in.",
  },
  {
    id: "look-winter-flannel",
    name: "Winter Flannel",
    description: "Charcoal flannel layers under a camel overcoat.",
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
    occasions: ["business", "evening", "smart-casual"],
    seasons: ["autumn", "winter"],
    formality: 4,
    lookbookCategory: "featured",
    featured: true,
    popular: true,
    image: "/images/looks/winter-flannel.jpg",
    tags: ["winter", "flannel", "coat"],
  },
  {
    id: "look-quiet-cashmere",
    name: "Quiet Cashmere",
    description: "Soft grey cashmere overshirt, camel polo, cream trousers.",
    slots: {
      jacket: "jkt-cashmere-grey",
      shirt: "shr-polo-camel",
      trousers: "trs-cream-wool",
      shoes: "snk-white-leather",
      watch: "wch-sport-steel",
      outerwear: "coat-cashmere-charcoal",
    },
    occasions: ["smart-casual", "weekend", "travel"],
    seasons: ["autumn", "winter"],
    formality: 2,
    lookbookCategory: "featured",
    featured: true,
    popular: true,
    image: "/images/looks/quiet-cashmere.jpg",
    tags: ["quiet-luxury", "cashmere"],
  },
  {
    id: "look-old-money-weekend",
    name: "Old Money Weekend",
    description: "Navy polo, cream trousers, brown loafers, tortoiseshell frames.",
    slots: {
      shirt: "shr-navy-polo",
      trousers: "trs-cream-wool",
      shoes: "lof-brown-penny",
      belt: "blt-brown-calf",
      watch: "wch-silver-dress",
      sunglasses: "sgg-tortoiseshell",
    },
    occasions: ["weekend", "casual", "smart-casual", "resort"],
    seasons: ["spring", "summer", "autumn"],
    formality: 2,
    lookbookCategory: "featured",
    featured: true,
    popular: true,
    image: "/images/looks/old-money-weekend.jpg",
    tags: ["old-money", "weekend"],
  },
  {
    id: "look-parisian",
    name: "Parisian",
    description: "Navy suit, pale pink shirt, burgundy silk — understated Left Bank.",
    slots: {
      suit: "sut-navy-wool",
      shirt: "shr-pink-poplin",
      shoes: "sho-brown-derby",
      belt: "blt-brown-calf",
      tie: "tie-burgundy-silk",
      pocketSquare: "psq-white-linen",
      watch: "wch-silver-dress",
    },
    occasions: ["business", "evening", "wedding", "formal"],
    seasons: ["all-season"],
    formality: 5,
    lookbookCategory: "featured",
    featured: true,
    popular: true,
    image: "/images/looks/parisian.jpg",
    tags: ["suit", "evening", "paris"],
  },
  {
    id: "look-camel-polo",
    name: "Camel Polo",
    description: "Camel knit polo, olive trousers, burgundy tassels, tan suede jacket.",
    slots: {
      shirt: "shr-polo-camel",
      trousers: "trs-olive-cotton",
      shoes: "lof-tassel-burgundy",
      belt: "blt-brown-calf",
      jacket: "jkt-suede-tan",
      watch: "wch-gold-dress",
    },
    occasions: ["smart-casual", "evening", "weekend"],
    seasons: ["spring", "autumn"],
    formality: 3,
    lookbookCategory: "featured",
    featured: true,
    popular: true,
    image: "/images/looks/camel-polo.jpg",
    tags: ["polo", "evening"],
  },
  {
    id: "look-denim-oxford",
    name: "Denim Oxford",
    description: "White OCBD, indigo jeans, brown pennies, navy bomber.",
    slots: {
      shirt: "shr-white-oxford",
      trousers: "jns-indigo-slim",
      shoes: "lof-brown-penny",
      belt: "blt-brown-calf",
      jacket: "jkt-bomber-navy",
      watch: "wch-sport-steel",
    },
    occasions: ["casual", "weekend", "smart-casual"],
    seasons: ["all-season"],
    formality: 2,
    lookbookCategory: "featured",
    featured: true,
    popular: true,
    image: "/images/looks/denim-oxford.jpg",
    tags: ["denim", "casual", "american"],
  },
];

/** Variation axes for combinatorial generation. */
export const VARIATION_SETS: {
  id: string;
  label: string;
  lookbookCategory: LookbookCategory;
  occasions: OccasionFilter[];
  seasons: Season[];
  formality: Outfit["formality"];
  slots: Partial<Record<OutfitSlot, string[]>>;
}[] = [
  {
    id: "navy-blazer-matrix",
    label: "Navy Blazer Matrix",
    lookbookCategory: "classic",
    occasions: ["business-casual", "smart-casual"],
    seasons: ["all-season"],
    formality: 4,
    slots: {
      blazer: ["blz-navy-wool"],
      shirt: ["shr-white-oxford", "shr-lightblue-oxford", "shr-pink-poplin", "shr-stripe-blue"],
      trousers: ["trs-grey-wool", "trs-navy-wool", "trs-olive-cotton", "chn-khaki"],
      shoes: ["lof-brown-penny", "sho-brown-derby", "lof-tassel-burgundy"],
      belt: ["blt-brown-calf"],
      tie: ["tie-navy-grenadine", "tie-burgundy-silk", "tie-grey-knit", ""],
      pocketSquare: ["psq-white-linen", "psq-burgundy-paisley", ""],
      watch: ["wch-silver-dress", "wch-gold-dress"],
    },
  },
  {
    id: "summer-linen-matrix",
    label: "Summer Linen Matrix",
    lookbookCategory: "seasonal",
    occasions: ["resort", "weekend", "smart-casual"],
    seasons: ["spring", "summer"],
    formality: 2,
    slots: {
      blazer: ["blz-beige-linen", ""],
      shirt: ["shr-linen-ivory", "shr-chambray-blue", "shr-navy-polo"],
      trousers: ["trs-beige-linen", "trs-cream-wool", "chn-khaki"],
      shoes: ["lof-suede-tan", "lof-brown-penny", "snk-white-leather"],
      belt: ["blt-tan-suede", "blt-woven-brown"],
      sunglasses: ["sgg-gold-wire", "sgg-tortoiseshell", ""],
      watch: ["wch-gold-dress", "wch-sport-steel"],
    },
  },
  {
    id: "winter-city-matrix",
    label: "Winter City Matrix",
    lookbookCategory: "seasonal",
    occasions: ["business", "smart-casual", "evening"],
    seasons: ["autumn", "winter"],
    formality: 4,
    slots: {
      blazer: ["blz-charcoal-flannel", "blz-grey-houndstooth", "blz-navy-wool"],
      shirt: ["shr-white-poplin", "shr-lightblue-oxford", "shr-pink-poplin"],
      trousers: ["trs-charcoal-flannel", "trs-grey-wool", "trs-navy-wool"],
      shoes: ["bts-chelsea-brown", "sho-brown-derby", "sho-black-oxford"],
      belt: ["blt-brown-calf", "blt-black-calf"],
      outerwear: ["coat-camel-hair", "coat-navy-wool", "coat-cashmere-charcoal"],
      scarf: ["scf-cashmere-grey", "scf-navy-wool", ""],
      tie: ["tie-burgundy-silk", "tie-olive-wool", "tie-navy-grenadine", ""],
    },
  },
  {
    id: "casual-weekend-matrix",
    label: "Casual Weekend Matrix",
    lookbookCategory: "weekend",
    occasions: ["casual", "weekend", "smart-casual"],
    seasons: ["all-season"],
    formality: 2,
    slots: {
      jacket: ["jkt-bomber-navy", "jkt-field-olive", "jkt-suede-tan", ""],
      shirt: ["shr-white-oxford", "shr-chambray-blue", "shr-navy-polo", "shr-polo-camel"],
      trousers: ["jns-indigo-slim", "chn-khaki", "chn-navy", "chn-olive", "trs-cream-wool"],
      shoes: ["lof-brown-penny", "snk-white-leather", "bts-chukka-suede", "snk-grey-suede"],
      belt: ["blt-brown-calf", "blt-woven-brown", "blt-tan-suede"],
      watch: ["wch-sport-steel", "wch-silver-dress"],
      sunglasses: ["sgg-tortoiseshell", "sgg-black-aviator", ""],
    },
  },
  {
    id: "suit-formal-matrix",
    label: "Suit Formal Matrix",
    lookbookCategory: "business",
    occasions: ["business", "formal", "wedding", "evening"],
    seasons: ["all-season"],
    formality: 5,
    slots: {
      suit: ["sut-navy-wool", "sut-charcoal-pinstripe", "sut-grey-flannel"],
      shirt: ["shr-white-poplin", "shr-pink-poplin", "shr-lightblue-oxford"],
      shoes: ["sho-black-oxford", "sho-brown-derby"],
      belt: ["blt-black-calf", "blt-brown-calf"],
      tie: ["tie-navy-grenadine", "tie-burgundy-silk", "tie-navy-dot"],
      pocketSquare: ["psq-white-linen", "psq-ivory-silk"],
      watch: ["wch-silver-dress", "wch-gold-dress"],
      bag: ["bag-brief-brown", ""],
    },
  },
  {
    id: "olive-earth-matrix",
    label: "Olive & Earth Matrix",
    lookbookCategory: "casual",
    occasions: ["smart-casual", "weekend", "travel"],
    seasons: ["spring", "autumn"],
    formality: 3,
    slots: {
      blazer: ["blz-olive-cotton", ""],
      jacket: ["jkt-field-olive", "jkt-suede-tan", ""],
      shirt: ["shr-chambray-blue", "shr-linen-ivory", "shr-lightblue-oxford"],
      trousers: ["trs-olive-cotton", "chn-olive", "chn-khaki"],
      shoes: ["bts-chukka-suede", "lof-suede-tan", "lof-brown-penny"],
      belt: ["blt-tan-suede", "blt-woven-brown"],
      pocketSquare: ["psq-olive-cotton", "psq-white-linen", ""],
      watch: ["wch-silver-dress", "wch-gold-dress"],
    },
  },
  {
    id: "evening-smart-matrix",
    label: "Evening Smart Matrix",
    lookbookCategory: "evening",
    occasions: ["evening", "smart-casual"],
    seasons: ["all-season"],
    formality: 3,
    slots: {
      blazer: ["blz-navy-wool", "blz-charcoal-flannel"],
      shirt: ["shr-white-poplin", "shr-polo-camel", "shr-pink-poplin"],
      trousers: ["trs-grey-wool", "trs-charcoal-flannel", "jns-black-selvedge"],
      shoes: ["lof-tassel-burgundy", "sho-brown-derby", "sho-black-oxford"],
      belt: ["blt-brown-calf", "blt-black-calf"],
      watch: ["wch-gold-dress", "wch-silver-dress"],
      pocketSquare: ["psq-ivory-silk", "psq-burgundy-paisley", ""],
    },
  },
  {
    id: "travel-matrix",
    label: "Travel Matrix",
    lookbookCategory: "travel",
    occasions: ["travel", "smart-casual", "casual"],
    seasons: ["all-season"],
    formality: 2,
    slots: {
      jacket: ["jkt-bomber-navy", "jkt-cashmere-grey", ""],
      shirt: ["shr-navy-polo", "shr-polo-camel", "shr-white-oxford"],
      trousers: ["chn-navy", "chn-khaki", "jns-indigo-slim"],
      shoes: ["snk-white-leather", "snk-grey-suede", "lof-brown-penny"],
      belt: ["blt-brown-calf", "blt-woven-brown"],
      bag: ["bag-messenger-navy", "bag-tote-canvas"],
      watch: ["wch-sport-steel"],
      sunglasses: ["sgg-black-aviator", "sgg-tortoiseshell", ""],
    },
  },
];

function cartesianLimited(
  axes: { slot: OutfitSlot; options: string[] }[],
  max: number
): Partial<Record<OutfitSlot, string>>[] {
  const results: Partial<Record<OutfitSlot, string>>[] = [];

  function walk(index: number, current: Partial<Record<OutfitSlot, string>>) {
    if (results.length >= max) return;
    if (index >= axes.length) {
      results.push({ ...current });
      return;
    }
    const { slot, options } = axes[index];
    for (const opt of options) {
      if (results.length >= max) return;
      const next = { ...current };
      if (opt) next[slot] = opt;
      else delete next[slot];
      walk(index + 1, next);
    }
  }

  walk(0, {});
  return results;
}

function inferFormality(slots: Partial<Record<OutfitSlot, string>>): Outfit["formality"] {
  const garments = Object.values(slots)
    .map((id) => getGarment(id!))
    .filter(Boolean);
  if (!garments.length) return 3;
  const avg =
    garments.reduce((s, g) => s + (g!.formality as number), 0) / garments.length;
  return Math.min(5, Math.max(1, Math.round(avg))) as Outfit["formality"];
}

function beltShoeCompatible(slots: Partial<Record<OutfitSlot, string>>): boolean {
  const belt = slots.belt ? getGarment(slots.belt) : undefined;
  const shoe = slots.shoes ? getGarment(slots.shoes) : undefined;
  if (!belt || !shoe) return true;
  if (shoe.category === "sneakers") return true;
  const brown = ["brown", "tan", "camel", "burgundy", "beige"];
  if (belt.color === "black" && shoe.color === "black") return true;
  if (brown.includes(belt.color) && brown.includes(shoe.color)) return true;
  return belt.color === shoe.color;
}

function generateFromVariations(targetCount: number): Outfit[] {
  const generated: Outfit[] = [];
  let counter = 0;

  for (const set of VARIATION_SETS) {
    const axes = Object.entries(set.slots).map(([slot, options]) => ({
      slot: slot as OutfitSlot,
      options: options as string[],
    }));

    // Cap per set so we distribute across matrices
    const perSet = Math.ceil(targetCount / VARIATION_SETS.length) + 20;
    const combos = cartesianLimited(axes, perSet * 3);

    for (const slots of combos) {
      if (!beltShoeCompatible(slots)) continue;
      // Require shirt + bottom + shoes at minimum
      if (!slots.shirt || !slots.trousers || !slots.shoes) continue;
      // Suit shouldn't also have blazer/trousers conflict — trousers ok empty with suit
      if (slots.suit && slots.blazer) continue;

      counter++;
      const id = `gen-${set.id}-${counter}`;
      generated.push({
        id,
        name: `${set.label} #${counter}`,
        description: `Generated variation from the ${set.label.toLowerCase()}.`,
        slots,
        occasions: set.occasions,
        seasons: set.seasons,
        formality: inferFormality(slots) || set.formality,
        lookbookCategory: set.lookbookCategory,
        featured: false,
        popular: counter % 17 === 0,
        tags: [set.id, "generated"],
      });

      if (generated.length >= targetCount) return generated;
    }
  }

  return generated;
}

const GENERATED = generateFromVariations(220);

/** Full outfit catalog: featured seeds + 200+ generated looks. */
export const OUTFITS: Outfit[] = [...SEEDS, ...GENERATED];

export const LOOKBOOK_CATEGORIES: {
  id: LookbookCategory;
  label: string;
  description: string;
}[] = [
  { id: "featured", label: "Featured", description: "Editor-selected signature looks." },
  { id: "classic", label: "Classic", description: "Timeless navy-and-grey foundations." },
  { id: "business", label: "Business", description: "Boardroom and client-day tailoring." },
  { id: "casual", label: "Casual", description: "Relaxed everyday combinations." },
  { id: "seasonal", label: "Seasonal", description: "Fabric-led looks for heat and cold." },
  { id: "evening", label: "Evening", description: "After-dark polish." },
  { id: "weekend", label: "Weekend", description: "Leisure without losing the plot." },
  { id: "travel", label: "Travel", description: "Airport-to-dinner adaptable kits." },
];

const outfitsById: Record<string, Outfit> = Object.fromEntries(
  OUTFITS.map((o) => [o.id, o])
);

export function getOutfit(id: string): Outfit | undefined {
  return outfitsById[id];
}

export function getFeaturedLooks(): Outfit[] {
  return OUTFITS.filter((o) => o.featured);
}

export function getSeasonalLooks(season?: Season): Outfit[] {
  if (!season) {
    return OUTFITS.filter(
      (o) =>
        o.lookbookCategory === "seasonal" ||
        o.seasons.some((s) => s !== "all-season")
    );
  }
  return OUTFITS.filter(
    (o) => o.seasons.includes(season) || o.seasons.includes("all-season")
  );
}

export function getPopularLooks(limit = 12): Outfit[] {
  return OUTFITS.filter((o) => o.popular || o.featured).slice(0, limit);
}

export function getLooksByCategory(category: LookbookCategory): Outfit[] {
  return OUTFITS.filter((o) => o.lookbookCategory === category);
}
