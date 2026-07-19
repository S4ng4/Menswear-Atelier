/** Menswear Atelier — domain types */

export type GarmentCategory =
  | "jackets"
  | "blazers"
  | "suits"
  | "shirts"
  | "trousers"
  | "jeans"
  | "chinos"
  | "ties"
  | "pocket-squares"
  | "belts"
  | "shoes"
  | "sneakers"
  | "loafers"
  | "boots"
  | "coats"
  | "scarves"
  | "watches"
  | "sunglasses"
  | "bags";

export type ColorFilter =
  | "navy"
  | "charcoal"
  | "grey"
  | "black"
  | "white"
  | "ivory"
  | "cream"
  | "beige"
  | "camel"
  | "brown"
  | "tan"
  | "olive"
  | "forest"
  | "burgundy"
  | "blue"
  | "light-blue"
  | "pink"
  | "green"
  | "gold"
  | "silver"
  | "multicolor";

export type FabricFilter =
  | "wool"
  | "cashmere"
  | "linen"
  | "cotton"
  | "silk"
  | "tweed"
  | "flannel"
  | "oxford"
  | "poplin"
  | "denim"
  | "corduroy"
  | "suede"
  | "leather"
  | "calf"
  | "grenadine"
  | "knit"
  | "jersey"
  | "velvet"
  | "canvas"
  | "technical";

export type OccasionFilter =
  | "business"
  | "business-casual"
  | "smart-casual"
  | "casual"
  | "evening"
  | "wedding"
  | "weekend"
  | "travel"
  | "resort"
  | "formal";

export type Season = "spring" | "summer" | "autumn" | "winter" | "all-season";

export type FormalityLevel = 1 | 2 | 3 | 4 | 5;

export type Fit = "slim" | "tailored" | "regular" | "relaxed" | "oversized";

export type Pattern =
  | "solid"
  | "stripe"
  | "pinstripe"
  | "check"
  | "windowpane"
  | "houndstooth"
  | "herringbone"
  | "prince-of-wales"
  | "dot"
  | "paisley"
  | "floral"
  | "geometric"
  | "melange"
  | "texture";

export type LookbookCategory =
  | "featured"
  | "business"
  | "casual"
  | "seasonal"
  | "evening"
  | "weekend"
  | "travel"
  | "classic";

export type FavoriteCollection =
  | "favorites"
  | "work"
  | "weekend"
  | "travel"
  | "evening"
  | "inspiration";

export type OutfitSlot =
  | "outerwear"
  | "jacket"
  | "blazer"
  | "suit"
  | "shirt"
  | "trousers"
  | "shoes"
  | "belt"
  | "tie"
  | "pocketSquare"
  | "watch"
  | "scarf"
  | "sunglasses"
  | "bag"
  | "accessory";

export interface Garment {
  id: string;
  name: string;
  category: GarmentCategory;
  color: ColorFilter;
  secondaryColors?: ColorFilter[];
  fabric: FabricFilter;
  secondaryFabrics?: FabricFilter[];
  pattern: Pattern;
  fit: Fit;
  formality: FormalityLevel;
  seasons: Season[];
  occasions: OccasionFilter[];
  brandInspiration: string;
  description: string;
  hex: string;
  priceTier: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  image?: string;
  pairsWith?: string[];
  avoidsWith?: string[];
}

export interface Outfit {
  id: string;
  name: string;
  description: string;
  slots: Partial<Record<OutfitSlot, string>>;
  occasions: OccasionFilter[];
  seasons: Season[];
  formality: FormalityLevel;
  lookbookCategory: LookbookCategory;
  featured?: boolean;
  popular?: boolean;
  image?: string;
  tags: string[];
  styleNotes?: string;
}

export interface StyleScoreBreakdown {
  total: number;
  colorHarmony: number;
  fabricHarmony: number;
  formalityBalance: number;
  occasionFit: number;
  proportion: number;
  ruleCompliance: number;
  deductions: { ruleId: string; label: string; points: number }[];
  bonuses: { id: string; label: string; points: number }[];
}

export interface StyleRule {
  id: string;
  name: string;
  description: string;
  severity: "soft" | "hard";
  category: "color" | "fabric" | "formality" | "proportion" | "accessory" | "season";
  /** Returns deduction points (0 = pass, positive = penalty) */
  evaluate: (garments: Garment[], outfit?: Outfit) => number;
  tip: string;
}

export interface SavedOutfit {
  id: string;
  outfitId?: string;
  name: string;
  slots: Partial<Record<OutfitSlot, string>>;
  collection: FavoriteCollection;
  savedAt: string;
  notes?: string;
  score?: number;
}

export interface ModelIdentity {
  id: string;
  label: string;
  ageRange: string;
  heightCm: number;
  build: string;
  facialHair: string;
  hair: string;
  ethnicityPresentation: string;
  locked: true;
}

export interface CombinationSuggestion {
  id: string;
  name: string;
  description: string;
  slots: Partial<Record<OutfitSlot, string>>;
  score?: number;
  rationale: string;
  templateId?: string;
  seedGarmentId?: string;
}
