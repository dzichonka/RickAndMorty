import { create } from 'zustand';

interface CardState {
  selectedIds: number[];
  toggleId: (id: number) => void;
  isSelected: (id: number) => boolean;
  reset: () => void;
}

export const useCardsStore = create<CardState>((set, get) => ({
  selectedIds: [],
  toggleId: (id) => {
    const { selectedIds } = get();
    set({
      selectedIds: selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id],
    });
  },
  isSelected: (id) => get().selectedIds.includes(id),
  reset: () => set({ selectedIds: [] }),
}));
