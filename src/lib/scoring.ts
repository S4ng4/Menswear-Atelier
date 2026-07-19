import { COLOR_COMPLEMENTS, FABRIC_HARMONY } from "@/data/taxonomy";
import { STYLE_RULES } from "@/data/styleRules";
import { getGarment } from "@/data/garments";
import type {
  Garment,
  OccasionFilter,
  Outfit,
  OutfitSlot,
  StyleScoreBreakdown,
} from "@/types";
import { formatFormality, formatLabel } from "@/lib/utils";

function resolveGarments(
  input: Garment[] | Partial<Record<OutfitSlot, string>> | Outfit
): Garment[] {
  if (Array.isArray(input)) return input.filter(Boolean);
  const slots =
    "slots" in input && input.slots
      ? input.slots
      : (input as Partial<Record<OutfitSlot, string>>);
  return Object.values(slots)
    .filter((id): id is string => Boolean(id))
    .map((id) => getGarment(id))
    .filter((g): g is Garment => Boolean(g));
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function scoreColorHarmony(garments: Garment[]): number {
  if (garments.length < 2) return 85;
  let pairs = 0;
  let good = 0;
  for (let i = 0; i < garments.length; i++) {
    for (let j = i + 1; j < garments.length; j++) {
      const a = garments[i];
      const b = garments[j];
      // Skip watch/bag vs everything for softer scoring
      if (
        (a.category === "watches" || a.category === "bags") &&
        (b.category === "watches" || b.category === "bags")
      ) {
        continue;
      }
      pairs++;
      const complements = COLOR_COMPLEMENTS[a.color] ?? [];
      if (complements.includes(b.color) || a.color === b.color) good++;
    }
  }
  if (!pairs) return 85;
  return Math.round(40 + (good / pairs) * 60);
}

function scoreFabricHarmony(garments: Garment[]): number {
  const core = garments.filter((g) =>
    ["blazers", "jackets", "suits", "shirts", "trousers", "jeans", "chinos", "coats"].includes(
      g.category
    )
  );
  if (core.length < 2) return 88;
  let pairs = 0;
  let good = 0;
  for (let i = 0; i < core.length; i++) {
    for (let j = i + 1; j < core.length; j++) {
      pairs++;
      const harmony = FABRIC_HARMONY[core[i].fabric] ?? [];
      if (harmony.includes(core[j].fabric) || core[i].fabric === core[j].fabric) {
        good++;
      }
    }
  }
  if (!pairs) return 88;
  return Math.round(45 + (good / pairs) * 55);
}

function scoreFormalityBalance(garments: Garment[]): number {
  const core = garments.filter((g) =>
    [
      "blazers",
      "jackets",
      "suits",
      "shirts",
      "trousers",
      "jeans",
      "chinos",
      "shoes",
      "loafers",
      "boots",
      "sneakers",
    ].includes(g.category)
  );
  if (core.length < 2) return 80;
  const levels = core.map((g) => g.formality);
  const spread = Math.max(...levels) - Math.min(...levels);
  if (spread <= 1) return 95;
  if (spread === 2) return 82;
  if (spread === 3) return 65;
  return 45;
}

function scoreOccasionFit(garments: Garment[], occasion?: OccasionFilter): number {
  if (!garments.length) return 50;
  if (!occasion) {
    // Shared occasions across pieces
    const sets = garments.map((g) => new Set(g.occasions));
    const shared = [...sets[0]].filter((o) => sets.every((s) => s.has(o)));
    return shared.length >= 2 ? 90 : shared.length === 1 ? 78 : 60;
  }
  const matching = garments.filter((g) => g.occasions.includes(occasion)).length;
  return Math.round(40 + (matching / garments.length) * 60);
}

function scoreProportion(garments: Garment[]): number {
  let score = 88;
  const hasSuit = garments.some((g) => g.category === "suits");
  const hasOddTrousers = garments.some((g) =>
    ["trousers", "jeans", "chinos"].includes(g.category)
  );
  const hasBlazer = garments.some((g) => g.category === "blazers");
  if (hasSuit && hasOddTrousers) score -= 15; // suit + separate trousers odd
  if (hasBlazer && !hasOddTrousers && !hasSuit) score -= 10;
  const patterns = garments.filter(
    (g) => !["solid", "texture", "melange"].includes(g.pattern)
  ).length;
  if (patterns >= 3) score -= 12;
  else if (patterns === 0) score += 2;
  return Math.max(40, Math.min(100, score));
}

function applyRules(garments: Garment[], outfit?: Outfit) {
  const deductions: StyleScoreBreakdown["deductions"] = [];
  let totalDeduction = 0;
  for (const rule of STYLE_RULES) {
    const points = rule.evaluate(garments, outfit);
    if (points > 0) {
      deductions.push({ ruleId: rule.id, label: rule.name, points });
      totalDeduction += points;
    }
  }
  return { deductions, totalDeduction };
}

function applyBonuses(garments: Garment[]): StyleScoreBreakdown["bonuses"] {
  const bonuses: StyleScoreBreakdown["bonuses"] = [];
  const navy = garments.some((g) => g.color === "navy" && ["blazers", "suits"].includes(g.category));
  const brownShoe = garments.some(
    (g) =>
      ["shoes", "loafers", "boots"].includes(g.category) &&
      ["brown", "tan", "burgundy"].includes(g.color)
  );
  if (navy && brownShoe) {
    bonuses.push({ id: "navy-brown", label: "Navy + brown leather", points: 6 });
  }
  const whiteSq = garments.some((g) => g.id === "psq-white-linen");
  const tie = garments.some((g) => g.category === "ties");
  if (whiteSq && tie) {
    bonuses.push({ id: "white-psq", label: "Classic white pocket square", points: 4 });
  }
  const foundation = garments.filter((g) => g.tags.includes("foundation")).length;
  if (foundation >= 3) {
    bonuses.push({ id: "foundation", label: "Strong wardrobe foundations", points: 5 });
  }
  return bonuses;
}

export function scoreOutfit(
  input: Garment[] | Partial<Record<OutfitSlot, string>> | Outfit,
  occasion?: OccasionFilter
): StyleScoreBreakdown {
  const garments = resolveGarments(input);
  const outfit = !Array.isArray(input) && "slots" in input ? (input as Outfit) : undefined;

  if (garments.length === 0) {
    return {
      total: 0,
      colorHarmony: 0,
      fabricHarmony: 0,
      formalityBalance: 0,
      occasionFit: 0,
      proportion: 0,
      ruleCompliance: 0,
      deductions: [],
      bonuses: [],
    };
  }

  const colorHarmony = scoreColorHarmony(garments);
  const fabricHarmony = scoreFabricHarmony(garments);
  const formalityBalance = scoreFormalityBalance(garments);
  const occasionFit = scoreOccasionFit(garments, occasion ?? outfit?.occasions?.[0]);
  const proportion = scoreProportion(garments);

  const { deductions, totalDeduction } = applyRules(garments, outfit);
  const bonuses = applyBonuses(garments);
  const bonusPts = bonuses.reduce((s, b) => s + b.points, 0);

  const weighted = Math.round(
    colorHarmony * 0.22 +
      fabricHarmony * 0.18 +
      formalityBalance * 0.2 +
      occasionFit * 0.15 +
      proportion * 0.15 +
      100 * 0.1 // baseline rule compliance before deductions
  );

  const ruleCompliance = Math.max(0, 100 - totalDeduction);
  const total = Math.max(
    0,
    Math.min(100, Math.round(weighted - totalDeduction * 0.55 + bonusPts))
  );

  return {
    total,
    colorHarmony,
    fabricHarmony,
    formalityBalance,
    occasionFit,
    proportion,
    ruleCompliance,
    deductions,
    bonuses,
  };
}

export function explainOutfit(
  input: Garment[] | Partial<Record<OutfitSlot, string>> | Outfit,
  occasion?: OccasionFilter
): string {
  const garments = resolveGarments(input);
  const breakdown = scoreOutfit(input, occasion);
  if (!garments.length) {
    return "No garments selected. Start with a foundation piece — a navy blazer or crisp white shirt.";
  }

  const names = garments.map((g) => g.name);
  const avgFormality = Math.round(avg(garments.map((g) => g.formality))) as 1 | 2 | 3 | 4 | 5;
  const colors = [...new Set(garments.map((g) => formatLabel(g.color)))];
  const fabrics = [...new Set(garments.map((g) => formatLabel(g.fabric)))];

  const lines: string[] = [];
  lines.push(
    `This look combines ${names.slice(0, 4).join(", ")}${names.length > 4 ? `, and ${names.length - 4} more` : ""}.`
  );
  lines.push(
    `The palette leans ${colors.slice(0, 3).join(", ").toLowerCase()} in ${fabrics.slice(0, 3).join(" and ").toLowerCase()}, reading as ${formatFormality(avgFormality).toLowerCase()}.`
  );

  if (breakdown.total >= 85) {
    lines.push("Overall harmony is excellent — colors, fabrics, and formality align cleanly.");
  } else if (breakdown.total >= 70) {
    lines.push("A solid, wearable combination with room for one or two refinements.");
  } else if (breakdown.total >= 55) {
    lines.push("The bones are there, but a few tensions hold the look back from feeling fully resolved.");
  } else {
    lines.push("Several conflicts are pulling the outfit in different directions — simplify or swap key pieces.");
  }

  if (breakdown.bonuses.length) {
    lines.push(
      `Strengths: ${breakdown.bonuses.map((b) => b.label.toLowerCase()).join("; ")}.`
    );
  }

  if (breakdown.deductions.length) {
    const tips = breakdown.deductions
      .map((d) => STYLE_RULES.find((r) => r.id === d.ruleId)?.tip)
      .filter(Boolean)
      .slice(0, 2);
    if (tips.length) {
      lines.push(`Watch-outs: ${tips.join(" ")}`);
    }
  } else {
    lines.push("No hard style-rule violations detected.");
  }

  return lines.join(" ");
}
