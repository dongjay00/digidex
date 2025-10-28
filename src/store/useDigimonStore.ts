import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DigimonStore {
  favorites: number[];
  recentlyViewed: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  addRecentlyViewed: (id: number) => void;
  clearFavorites: () => void;
}

export const useDigimonStore = create<DigimonStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentlyViewed: [],

      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fid) => fid !== id),
        })),

      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },

      isFavorite: (id) => get().favorites.includes(id),

      addRecentlyViewed: (id) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((rid) => rid !== id);
          return {
            recentlyViewed: [id, ...filtered].slice(0, 10), // 최대 10개
          };
        }),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "digimon-storage",
    }
  )
);
