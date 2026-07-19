/**
 * Future architecture stubs — feature flags and interfaces for upcoming modules.
 * Nothing here is wired into the live UI yet.
 */

export interface FutureModuleFlag {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  eta?: string;
}

export interface VirtualTryOnRequest {
  outfitId: string;
  modelId: string;
  pose?: "standing" | "walking" | "seated";
  lighting?: "studio" | "daylight" | "evening";
}

export interface VirtualTryOnResult {
  requestId: string;
  imageUrl: string;
  promptUsed: string;
  generatedAt: string;
}

export interface WardrobeSyncProvider {
  id: "shopify" | "mr-porter" | "manual-csv" | "camera";
  label: string;
  sync(userId: string): Promise<{ imported: number; skipped: number }>;
}

export interface StyleAdvisorMessage {
  role: "user" | "advisor";
  content: string;
  outfitSnapshot?: Record<string, string>;
  timestamp: string;
}

export interface StyleAdvisorSession {
  id: string;
  messages: StyleAdvisorMessage[];
  preferences: {
    formalityBias?: number;
    favoriteColors?: string[];
    avoidFabrics?: string[];
  };
}

export interface SeasonalCapsulePlan {
  season: "spring" | "summer" | "autumn" | "winter";
  corePieces: string[];
  accents: string[];
  estimatedLooks: number;
}

export interface SocialLookShare {
  outfitId: string;
  caption: string;
  visibility: "private" | "unlisted" | "public";
  tags: string[];
}

export interface FabricCareGuide {
  fabricId: string;
  wash: string;
  dry: string;
  store: string;
  notes: string[];
}

export interface SizeProfile {
  userId: string;
  chestCm: number;
  waistCm: number;
  inseamCm: number;
  shoeEu: number;
  preferredFit: "slim" | "tailored" | "regular" | "relaxed";
}

/** Feature flags for future modules — all off by default. */
export const futureModules: Record<string, FutureModuleFlag> = {
  virtualTryOn: {
    id: "virtualTryOn",
    label: "Virtual Try-On",
    description: "Generate photoreal looks on the locked atelier model.",
    enabled: false,
    eta: "Q4",
  },
  wardrobeSync: {
    id: "wardrobeSync",
    label: "Wardrobe Sync",
    description: "Import owned pieces from retailers or a camera roll.",
    enabled: false,
    eta: "Q1",
  },
  styleAdvisor: {
    id: "styleAdvisor",
    label: "AI Style Advisor",
    description: "Conversational coaching grounded in style rules and your wardrobe.",
    enabled: false,
    eta: "Q3",
  },
  seasonalCapsule: {
    id: "seasonalCapsule",
    label: "Seasonal Capsule Planner",
    description: "Build a minimal capsule that yields maximum outfits.",
    enabled: false,
    eta: "Q2",
  },
  socialShare: {
    id: "socialShare",
    label: "Look Sharing",
    description: "Publish looks to a private or public gallery.",
    enabled: false,
  },
  fabricCare: {
    id: "fabricCare",
    label: "Fabric Care Guides",
    description: "Care cards per fabric and brand inspiration.",
    enabled: false,
  },
  sizeProfile: {
    id: "sizeProfile",
    label: "Size Profile",
    description: "Persistent measurements for fit recommendations.",
    enabled: false,
  },
  travelPacking: {
    id: "travelPacking",
    label: "Travel Packing Lists",
    description: "Generate packing lists from destination and occasions.",
    enabled: false,
    eta: "Q2",
  },
};

export function isFutureModuleEnabled(id: string): boolean {
  return futureModules[id]?.enabled ?? false;
}

export function listFutureModules(): FutureModuleFlag[] {
  return Object.values(futureModules);
}
