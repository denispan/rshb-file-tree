import { FILE_EXTENSIONS, IMAGE_EXTENSIONS, ITEM_TYPES } from "@/constants";
import { ItemRaw } from "@/types/common";



export class Item {
  id: number;
  type: typeof ITEM_TYPES[number];
  parentId: number | null;
  name: string;
  isFavorite: boolean;
  children: Item[];
  extension?: string;

  constructor(row: ItemRaw) {
    this.id = row.id;
    this.type = row.type;
    this.parentId = row.parentId;
    this.name = row.name;
    this.isFavorite = row.isFavorite;
    this.children = [];

    if (this.type === 'file') {
      const nameParts = this.name.split('.');
      if (nameParts.length > 1) {
        const ext = nameParts[nameParts.length - 1].toLowerCase() as typeof FILE_EXTENSIONS[number];
        this.extension = ext;
      }
    }
  }

  isImage(): boolean {
    return this.type === 'file' && this.extension !== undefined && IMAGE_EXTENSIONS.includes(this.extension as typeof IMAGE_EXTENSIONS[number]);
  }
}

export function isItem(obj: unknown): obj is Item {
  return obj instanceof Item;
}
