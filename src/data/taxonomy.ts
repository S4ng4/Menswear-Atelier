import type {
  ColorFilter,
  FabricFilter,
  GarmentCategory,
  OccasionFilter,
} from "@/types";

export const CATEGORY_LABELS: Record<GarmentCategory, string> = {
  jackets: "Jackets",
  blazers: "Blazers",
  suits: "Suits",
  shirts: "Shirts",
  trousers: "Trousers",
  jeans: "Jeans",
  chinos: "Chinos",
  ties: "Ties",
  "pocket-squares": "Pocket Squares",
  belts: "Belts",
  shoes: "Shoes",
  sneakers: "Sneakers",
  loafers: "Loafers",
  boots: "Boots",
  coats: "Coats",
  scarves: "Scarves",
  watches: "Watches",
  sunglasses: "Sunglasses",
  bags: "Bags",
};

export const CORE_CATEGORIES: GarmentCategory[] = [
  "jackets",
  "blazers",
  "suits",
  "shirts",
  "trousers",
  "jeans",
  "chinos",
  "coats",
];

export const ACCESSORY_CATEGORIES: GarmentCategory[] = [
  "ties",
  "pocket-squares",
  "belts",
  "scarves",
  "watches",
  "sunglasses",
  "bags",
];

export const FOOTWEAR_CATEGORIES: GarmentCategory[] = [
  "shoes",
  "sneakers",
  "loafers",
  "boots",
];

export const ALL_CATEGORIES: GarmentCategory[] = [
  ...CORE_CATEGORIES,
  ...FOOTWEAR_CATEGORIES,
  ...ACCESSORY_CATEGORIES,
];

export const COLOR_FILTERS: { id: ColorFilter; label: string; hex: string }[] = [
  { id: "navy", label: "Navy", hex: "#1b2a4a" },
  { id: "charcoal", label: "Charcoal", hex: "#2c2a28" },
  { id: "grey", label: "Grey", hex: "#8a8580" },
  { id: "black", label: "Black", hex: "#1a1816" },
  { id: "white", label: "White", hex: "#faf8f4" },
  { id: "ivory", label: "Ivory", hex: "#f7f4ef" },
  { id: "cream", label: "Cream", hex: "#f0e8d8" },
  { id: "beige", label: "Beige", hex: "#e8e0d4" },
  { id: "camel", label: "Camel", hex: "#c4a882" },
  { id: "brown", label: "Brown", hex: "#3d2e24" },
  { id: "tan", label: "Tan", hex: "#b8956c" },
  { id: "olive", label: "Olive", hex: "#5c6b4a" },
  { id: "forest", label: "Forest", hex: "#3a4a32" },
  { id: "burgundy", label: "Burgundy", hex: "#6b2d3c" },
  { id: "blue", label: "Blue", hex: "#3a5a8a" },
  { id: "light-blue", label: "Light Blue", hex: "#a8c0d8" },
  { id: "pink", label: "Pink", hex: "#d4a8b0" },
  { id: "green", label: "Green", hex: "#4a6b5a" },
  { id: "gold", label: "Gold", hex: "#b8956c" },
  { id: "silver", label: "Silver", hex: "#c0c0c0" },
  { id: "multicolor", label: "Multicolor", hex: "#a89880" },
];

export const FABRIC_FILTERS: { id: FabricFilter; label: string }[] = [
  { id: "wool", label: "Wool" },
  { id: "cashmere", label: "Cashmere" },
  { id: "linen", label: "Linen" },
  { id: "cotton", label: "Cotton" },
  { id: "silk", label: "Silk" },
  { id: "tweed", label: "Tweed" },
  { id: "flannel", label: "Flannel" },
  { id: "oxford", label: "Oxford" },
  { id: "poplin", label: "Poplin" },
  { id: "denim", label: "Denim" },
  { id: "corduroy", label: "Corduroy" },
  { id: "suede", label: "Suede" },
  { id: "leather", label: "Leather" },
  { id: "calf", label: "Calf" },
  { id: "grenadine", label: "Grenadine" },
  { id: "knit", label: "Knit" },
  { id: "jersey", label: "Jersey" },
  { id: "velvet", label: "Velvet" },
  { id: "canvas", label: "Canvas" },
  { id: "technical", label: "Technical" },
];

export const OCCASION_FILTERS: { id: OccasionFilter; label: string }[] = [
  { id: "business", label: "Business" },
  { id: "business-casual", label: "Business Casual" },
  { id: "smart-casual", label: "Smart Casual" },
  { id: "casual", label: "Casual" },
  { id: "evening", label: "Evening" },
  { id: "wedding", label: "Wedding" },
  { id: "weekend", label: "Weekend" },
  { id: "travel", label: "Travel" },
  { id: "resort", label: "Resort" },
  { id: "formal", label: "Formal" },
];

/** Fabrics that harmonize when worn together (bidirectional). */
export const FABRIC_HARMONY: Record<FabricFilter, FabricFilter[]> = {
  wool: ["wool", "cashmere", "flannel", "silk", "cotton", "leather", "calf", "grenadine"],
  cashmere: ["wool", "cashmere", "silk", "cotton", "leather", "flannel"],
  linen: ["linen", "cotton", "silk", "suede", "canvas", "knit"],
  cotton: ["cotton", "linen", "wool", "denim", "oxford", "poplin", "leather", "calf", "knit"],
  silk: ["wool", "cashmere", "linen", "cotton", "silk", "grenadine"],
  tweed: ["tweed", "wool", "corduroy", "flannel", "leather", "suede", "knit"],
  flannel: ["wool", "cashmere", "flannel", "tweed", "cotton", "leather"],
  oxford: ["oxford", "cotton", "wool", "denim", "leather", "calf"],
  poplin: ["poplin", "cotton", "wool", "silk", "leather"],
  denim: ["denim", "cotton", "oxford", "knit", "leather", "suede", "canvas"],
  corduroy: ["corduroy", "tweed", "wool", "cotton", "suede", "leather"],
  suede: ["suede", "wool", "tweed", "linen", "cotton", "denim", "corduroy"],
  leather: ["leather", "calf", "wool", "cotton", "denim", "cashmere", "flannel"],
  calf: ["calf", "leather", "wool", "cotton", "silk", "grenadine"],
  grenadine: ["grenadine", "silk", "wool", "cotton", "poplin"],
  knit: ["knit", "cotton", "linen", "wool", "denim", "jersey"],
  jersey: ["jersey", "knit", "cotton", "denim"],
  velvet: ["velvet", "wool", "silk", "leather"],
  canvas: ["canvas", "cotton", "linen", "denim"],
  technical: ["technical", "cotton", "wool", "knit"],
};

/** Colors that complement each other in classic menswear pairing. */
export const COLOR_COMPLEMENTS: Record<ColorFilter, ColorFilter[]> = {
  navy: ["navy", "white", "ivory", "cream", "grey", "light-blue", "pink", "burgundy", "tan", "brown", "beige", "camel", "olive"],
  charcoal: ["charcoal", "white", "ivory", "grey", "light-blue", "pink", "burgundy", "navy", "tan", "silver"],
  grey: ["grey", "navy", "charcoal", "white", "ivory", "light-blue", "pink", "burgundy", "brown", "tan", "black"],
  black: ["black", "white", "ivory", "grey", "charcoal", "silver", "burgundy"],
  white: ["white", "navy", "charcoal", "grey", "black", "brown", "olive", "burgundy", "blue", "camel", "tan"],
  ivory: ["ivory", "navy", "charcoal", "brown", "olive", "camel", "burgundy", "blue"],
  cream: ["cream", "navy", "brown", "olive", "camel", "burgundy", "tan"],
  beige: ["beige", "navy", "brown", "olive", "white", "cream", "burgundy", "forest"],
  camel: ["camel", "navy", "brown", "olive", "cream", "white", "burgundy", "forest"],
  brown: ["brown", "navy", "cream", "ivory", "beige", "olive", "tan", "light-blue", "pink", "green"],
  tan: ["tan", "navy", "brown", "olive", "cream", "white", "burgundy", "light-blue"],
  olive: ["olive", "navy", "brown", "cream", "beige", "tan", "burgundy", "white"],
  forest: ["forest", "cream", "beige", "camel", "brown", "tan", "burgundy"],
  burgundy: ["burgundy", "navy", "grey", "charcoal", "cream", "ivory", "tan", "beige", "olive"],
  blue: ["blue", "white", "cream", "grey", "tan", "brown", "navy"],
  "light-blue": ["light-blue", "navy", "charcoal", "grey", "brown", "tan", "burgundy", "white"],
  pink: ["pink", "navy", "charcoal", "grey", "brown", "burgundy"],
  green: ["green", "cream", "beige", "brown", "navy", "tan"],
  gold: ["gold", "navy", "brown", "cream", "charcoal", "burgundy"],
  silver: ["silver", "charcoal", "navy", "grey", "black", "white"],
  multicolor: ["navy", "charcoal", "grey", "brown", "cream", "white"],
};
