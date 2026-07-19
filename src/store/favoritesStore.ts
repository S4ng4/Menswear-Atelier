"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteCollection, OutfitSlot, SavedOutfit } from "@/types";

export const COLLECTIONS: {
  id: FavoriteCollection;
  label: string;
  description: string;
}[] = [
  { id: "favorites", label: "Favorites", description: "Pinned looks you return to." },
  { id: "work", label: "Work", description: "Office and client-ready combinations." },
  { id: "weekend", label: "Weekend", description: "Leisure and off-duty looks." },
  { id: "travel", label: "Travel", description: "Packable, adaptable kits." },
  { id: "evening", label: "Evening", description: "After-dark polish." },
  { id: "inspiration", label: "Inspiration", description: "Ideas to refine later." },
];

interface FavoritesState {
  saved: SavedOutfit[];

  save: (input: {
    name: string;
    slots: Partial<Record<OutfitSlot, string>>;
    collection?: FavoriteCollection;
    outfitId?: string;
    notes?: string;
    score?: number;
  }) => SavedOutfit;

  remove: (id: string) => void;
  move: (id: string, collection: FavoriteCollection) => void;
  rename: (id: string, name: string) => void;
  updateNotes: (id: string, notes: string) => void;
  getByCollection: (collection: FavoriteCollection) => SavedOutfit[];
  getById: (id: string) => SavedOutfit | undefined;
  isSavedOutfit: (outfitId: string) => boolean;
  clearAll: () => void;
}

function uid(): string {
  return `fav-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      saved: [],

      save: ({ name, slots, collection = "favorites", outfitId, notes, score }) => {
        const entry: SavedOutfit = {
          id: uid(),
          outfitId,
          name,
          slots: { ...slots },
          collection,
          savedAt: new Date().toISOString(),
          notes,
          score,
        };
        set((state) => ({ saved: [entry, ...state.saved] }));
        return entry;
      },

      remove: (id) =>
        set((state) => ({
          saved: state.saved.filter((s) => s.id !== id),
        })),

      move: (id, collection) =>
        set((state) => ({
          saved: state.saved.map((s) =>
            s.id === id ? { ...s, collection } : s
          ),
        })),

      rename: (id, name) =>
        set((state) => ({
          saved: state.saved.map((s) => (s.id === id ? { ...s, name } : s)),
        })),

      updateNotes: (id, notes) =>
        set((state) => ({
          saved: state.saved.map((s) => (s.id === id ? { ...s, notes } : s)),
        })),

      getByCollection: (collection) =>
        get().saved.filter((s) => s.collection === collection),

      getById: (id) => get().saved.find((s) => s.id === id),

      isSavedOutfit: (outfitId) =>
        get().saved.some((s) => s.outfitId === outfitId),

      clearAll: () => set({ saved: [] }),
    }),
    {
      name: "menswear-atelier-favorites",
      partialize: (state) => ({ saved: state.saved }),
    }
  )
);
