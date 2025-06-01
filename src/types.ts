export interface FileItemRaw {
  id: number;
  type: 'dir' | 'file';
  parentId: number | null;
  name: string;
  isFavorite: boolean;
}