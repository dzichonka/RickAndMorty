import type { ICharacter } from '@/types/api-types';
import { create } from 'zustand';

interface CardState {
  selectedItems: ICharacter[];
  toggleItem: (item: ICharacter) => void;
  isSelected: (id: number) => boolean;
  reset: () => void;
}

export const useCardsStore = create<CardState>((set, get) => ({
  selectedItems: [],
  toggleItem: (item) => {
    const selectedItems = get().selectedItems;
    const isAlreadySelected = selectedItems.some((i) => i.id === item.id);

    if (isAlreadySelected) {
      set({
        selectedItems: selectedItems.filter((i) => i.id !== item.id),
      });
    } else {
      set({
        selectedItems: [...selectedItems, item],
      });
    }
  },
  isSelected: (id) => get().selectedItems.some((i) => i.id === id),
  reset: () => set({ selectedItems: [] }),
}));
