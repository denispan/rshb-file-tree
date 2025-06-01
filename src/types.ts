import { ITEM_TYPES } from "./constants";

export interface ItemRaw {
  id: number;
  type: typeof ITEM_TYPES[number];
  parentId: number | null;
  name: string;
  isFavorite: boolean;
}
export type ItemResponse = ItemRaw[]