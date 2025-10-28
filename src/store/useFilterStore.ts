import { create } from "zustand";

interface FilterStore {
  searchTerm: string;
  attribute: string;
  level: string;
  xAntibody: string;
  page: number;
  setSearchTerm: (term: string) => void;
  setAttribute: (attr: string) => void;
  setLevel: (level: string) => void;
  setXAntibody: (value: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchTerm: "",
  attribute: "",
  level: "",
  xAntibody: "",
  page: 0,

  setSearchTerm: (term) => set({ searchTerm: term, page: 0 }),
  setAttribute: (attr) => set({ attribute: attr, page: 0 }),
  setLevel: (level) => set({ level, page: 0 }),
  setXAntibody: (value) => set({ xAntibody: value, page: 0 }),
  setPage: (page) => set({ page }),

  resetFilters: () =>
    set({
      searchTerm: "",
      attribute: "",
      level: "",
      xAntibody: "",
      page: 0,
    }),
}));
