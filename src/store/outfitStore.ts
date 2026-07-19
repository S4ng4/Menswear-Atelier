"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ColorFilter,
  FabricFilter,
  Garment,
  GarmentCategory,
  OccasionFilter,
  OutfitSlot,
  StyleScoreBreakdown,
} from "@/types";
import { getGarment } from "@/data/garments";
import { ALL_CATEGORIES } from "@/data/taxonomy";
import { explainOutfit, scoreOutfit } from "@/lib/scoring";
import { CLASSIC_TEMPLATES } from "@/lib/combinationEngine";

const NAVY_FOUNDATION =
  CLASSIC_TEMPLATES.find((t) => t.id === "navy-blazer-foundation")?.slots ?? {
    blazer: "blz-navy-wool",
    shirt: "shr-white-oxford",
    trousers: "trs-grey-wool",
    shoes: "lof-brown-penny",
    belt: "blt-brown-calf",
    tie: "tie-navy-grenadine",
    pocketSquare: "psq-white-linen",
    watch: "wch-silver-dress",
  };

export interface OutfitFilters {
  colors: ColorFilter[];
  fabrics: FabricFilter[];
  occasions: OccasionFilter[];
  search: string;
}

interface OutfitState {
  selection: Partial<Record<OutfitSlot, string>>;
  enabledCategories: GarmentCategory[];
  filters: OutfitFilters;
  activeSlot: OutfitSlot | null;

  selectGarment: (slot: OutfitSlot, garmentId: string | null) => void;
  toggleCategory: (category: GarmentCategory) => void;
  setEnabledCategories: (categories: GarmentCategory[]) => void;
  setFilters: (partial: Partial<OutfitFilters>) => void;
  clearFilters: () => void;
  setActiveSlot: (slot: OutfitSlot | null) => void;
  applyCombination: (slots: Partial<Record<OutfitSlot, string>>) => void;
  clearSelection: () => void;
  resetToFoundation: () => void;

  getSelectedGarments: () => Garment[];
  getScore: () => StyleScoreBreakdown;
  getExplanation: () => string;
}

export const useOutfitStore = create<OutfitState>()(
  persist(
    (set, get) => ({
      selection: { ...NAVY_FOUNDATION },
      enabledCategories: [...ALL_CATEGORIES],
      filters: {
        colors: [],
        fabrics: [],
        occasions: [],
        search: "",
      },
      activeSlot: null,

      selectGarment: (slot, garmentId) =>
        set((state) => {
          const next = { ...state.selection };
          if (!garmentId) delete next[slot];
          else next[slot] = garmentId;
          return { selection: next };
        }),

      toggleCategory: (category) =>
        set((state) => {
          const has = state.enabledCategories.includes(category);
          return {
            enabledCategories: has
              ? state.enabledCategories.filter((c) => c !== category)
              : [...state.enabledCategories, category],
          };
        }),

      setEnabledCategories: (categories) => set({ enabledCategories: categories }),

      setFilters: (partial) =>
        set((state) => ({
          filters: { ...state.filters, ...partial },
        })),

      clearFilters: () =>
        set({
          filters: { colors: [], fabrics: [], occasions: [], search: "" },
        }),

      setActiveSlot: (slot) => set({ activeSlot: slot }),

      applyCombination: (slots) => set({ selection: { ...slots } }),

      clearSelection: () => set({ selection: {} }),

      resetToFoundation: () => set({ selection: { ...NAVY_FOUNDATION } }),

      getSelectedGarments: () => {
        const { selection } = get();
        return Object.values(selection)
          .map((id) => getGarment(id!))
          .filter((g): g is Garment => Boolean(g));
      },

      getScore: () => scoreOutfit(get().selection),

      getExplanation: () => explainOutfit(get().selection),
    }),
    {
      name: "menswear-atelier-outfit",
      partialize: (state) => ({
        selection: state.selection,
        enabledCategories: state.enabledCategories,
        filters: state.filters,
      }),
    }
  )
);
