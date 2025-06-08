import { ItemRaw } from '@/types/common';

declare global {
  interface Window {
    getFilesOverride?: () => Promise<ItemRaw[]>;
    toggleItemFavoriteOverride?: (id: number, isFavorite: boolean) => Promise<{ success: boolean; isFavorite: boolean }>;
  }
}

export {};
