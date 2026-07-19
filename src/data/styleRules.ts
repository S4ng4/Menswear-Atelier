import type { Garment, StyleRule } from "@/types";

const has = (garments: Garment[], pred: (g: Garment) => boolean) =>
  garments.some(pred);

const footwear = (g: Garment) =>
  g.category === "shoes" ||
  g.category === "loafers" ||
  g.category === "boots" ||
  g.category === "sneakers";

const isLinenHeavy = (g: Garment) =>
  g.fabric === "linen" || g.tags.includes("linen") || g.tags.includes("summer");

/**
 * Twelve classic menswear rules used by the scoring engine.
 * evaluate() returns deduction points (0 = pass).
 */
export const STYLE_RULES: StyleRule[] = [
  {
    id: "brown-with-navy",
    name: "Brown with Navy",
    description: "Brown leather footwear and belts pair beautifully with navy — lean into it.",
    severity: "soft",
    category: "color",
    tip: "Pair brown shoes or a brown belt with navy for warmth and contrast.",
    evaluate: () => 0, // advisory / bonus handled in scoring
  },
  {
    id: "no-black-shoes-linen",
    name: "No Black Shoes with Linen",
    description: "Black dress shoes clash with the relaxed character of linen.",
    severity: "hard",
    category: "fabric",
    tip: "Wear tan suede, brown loafers, or woven leather with linen — never black oxfords.",
    evaluate: (garments) => {
      const linen = has(garments, isLinenHeavy);
      const blackDress = has(
        garments,
        (g) => footwear(g) && g.color === "black" && g.formality >= 4
      );
      return linen && blackDress ? 18 : 0;
    },
  },
  {
    id: "pocket-square-not-match-tie",
    name: "Pocket Square ≠ Tie",
    description: "A pocket square should complement, never identically match, the tie.",
    severity: "hard",
    category: "accessory",
    tip: "Choose a white linen square or a contrasting pattern — avoid matching the tie exactly.",
    evaluate: (garments) => {
      const tie = garments.find((g) => g.category === "ties");
      const sq = garments.find((g) => g.category === "pocket-squares");
      if (!tie || !sq) return 0;
      if (tie.color === sq.color && tie.pattern === sq.pattern && tie.pattern !== "solid") {
        return 15;
      }
      if (tie.color === sq.color && tie.fabric === sq.fabric && sq.pattern === "solid" && tie.pattern === "solid") {
        return 12;
      }
      return 0;
    },
  },
  {
    id: "belt-match-shoes",
    name: "Belt Matches Shoes",
    description: "Belt leather should align with shoe leather in color family.",
    severity: "hard",
    category: "color",
    tip: "Match brown belt to brown shoes; black belt to black shoes.",
    evaluate: (garments) => {
      const belt = garments.find((g) => g.category === "belts");
      const shoe = garments.find(footwear);
      if (!belt || !shoe) return 0;
      if (shoe.category === "sneakers") return 0;
      const brownFamily = ["brown", "tan", "camel", "burgundy", "beige"];
      const beltBrown = brownFamily.includes(belt.color);
      const shoeBrown = brownFamily.includes(shoe.color);
      if (belt.color === "black" && shoe.color === "black") return 0;
      if (beltBrown && shoeBrown) return 0;
      if (belt.color === shoe.color) return 0;
      return 14;
    },
  },
  {
    id: "no-sneakers-with-suit",
    name: "No Sneakers with Full Suit",
    description: "Sneakers undercut the formality of a matched suit.",
    severity: "hard",
    category: "formality",
    tip: "Save sneakers for odd jackets, knits, and denim — use oxfords or derbies with suits.",
    evaluate: (garments) => {
      const suit = has(garments, (g) => g.category === "suits");
      const sneakers = has(garments, (g) => g.category === "sneakers");
      return suit && sneakers ? 20 : 0;
    },
  },
  {
    id: "formality-spread",
    name: "Formality Balance",
    description: "Pieces should sit within a narrow formality band so the look feels intentional.",
    severity: "soft",
    category: "formality",
    tip: "Keep core pieces within two formality levels of each other.",
    evaluate: (garments) => {
      const core = garments.filter(
        (g) =>
          ["blazers", "jackets", "suits", "shirts", "trousers", "jeans", "chinos", "shoes", "loafers", "boots", "sneakers"].includes(
            g.category
          )
      );
      if (core.length < 2) return 0;
      const levels = core.map((g) => g.formality);
      const spread = Math.max(...levels) - Math.min(...levels);
      if (spread >= 4) return 16;
      if (spread === 3) return 8;
      return 0;
    },
  },
  {
    id: "no-double-pattern-clash",
    name: "Pattern Restraint",
    description: "Avoid stacking multiple bold patterns without a solid anchor.",
    severity: "soft",
    category: "proportion",
    tip: "If the jacket is patterned, keep shirt and tie quieter — or vice versa.",
    evaluate: (garments) => {
      const bold = garments.filter(
        (g) =>
          !["solid", "texture", "melange"].includes(g.pattern) &&
          ["blazers", "jackets", "suits", "shirts", "ties"].includes(g.category)
      );
      return bold.length >= 3 ? 12 : bold.length === 2 ? 4 : 0;
    },
  },
  {
    id: "season-fabric",
    name: "Season-Appropriate Fabric",
    description: "Heavy flannel and tweed belong in cold months; linen in warm ones.",
    severity: "soft",
    category: "season",
    tip: "Reserve flannel and heavy tweed for autumn/winter; linen for spring/summer.",
    evaluate: (garments) => {
      const heavy = has(garments, (g) => g.fabric === "flannel" || g.fabric === "tweed");
      const linen = has(garments, (g) => g.fabric === "linen");
      // Mixing heavy winter cloth with linen in one outfit
      return heavy && linen ? 14 : 0;
    },
  },
  {
    id: "denim-with-tailoring",
    name: "Denim & Tailoring Care",
    description: "Dark clean denim can work with a blazer; distressed denim rarely does.",
    severity: "soft",
    category: "fabric",
    tip: "Pair blazers with dark indigo or black jeans; avoid light-wash with structured jackets.",
    evaluate: (garments) => {
      const blazer = has(garments, (g) => g.category === "blazers" || g.category === "suits");
      const lightDenim = has(
        garments,
        (g) => g.category === "jeans" && g.tags.includes("summer")
      );
      return blazer && lightDenim ? 10 : 0;
    },
  },
  {
    id: "tie-needs-collar",
    name: "Tie Requires Collar",
    description: "A necktie needs a collared dress or oxford shirt — not a polo or knit alone.",
    severity: "hard",
    category: "accessory",
    tip: "Wear ties with poplin, oxford, or other collared shirts.",
    evaluate: (garments) => {
      const tie = has(garments, (g) => g.category === "ties");
      if (!tie) return 0;
      const shirt = garments.find((g) => g.category === "shirts");
      if (!shirt) return 10;
      if (shirt.tags.includes("polo") || shirt.fabric === "knit" || shirt.fabric === "jersey") {
        return 18;
      }
      return 0;
    },
  },
  {
    id: "no-black-brown-mix-leather",
    name: "No Black & Brown Leather Mix",
    description: "Mixing black and brown leather accessories in one look reads unfinished.",
    severity: "hard",
    category: "color",
    tip: "Commit to either black or brown leather for shoes, belt, and bag.",
    evaluate: (garments) => {
      const leatherBits = garments.filter(
        (g) =>
          footwear(g) ||
          g.category === "belts" ||
          (g.category === "bags" && (g.fabric === "leather" || g.fabric === "calf"))
      );
      const hasBlack = leatherBits.some((g) => g.color === "black");
      const hasBrown = leatherBits.some((g) =>
        ["brown", "tan", "camel", "burgundy"].includes(g.color)
      );
      return hasBlack && hasBrown ? 12 : 0;
    },
  },
  {
    id: "overaccessorize",
    name: "Accessory Restraint",
    description: "Too many statement accessories compete for attention.",
    severity: "soft",
    category: "proportion",
    tip: "Choose two or three accessories max — e.g. watch, pocket square, and belt.",
    evaluate: (garments) => {
      const accessories = garments.filter((g) =>
        ["ties", "pocket-squares", "scarves", "sunglasses", "bags", "watches"].includes(
          g.category
        )
      );
      if (accessories.length >= 5) return 10;
      if (accessories.length === 4) return 5;
      return 0;
    },
  },
];

export function getStyleRule(id: string): StyleRule | undefined {
  return STYLE_RULES.find((r) => r.id === id);
}
