import { create } from 'zustand';
import { Item } from '../models/Item';
import { getFiles } from '../api/files.api';

interface FilesState {
  rootDir: Item | null;
  currentFolder: Item | null;
  itemsMap: Map<number, Item>;
  isLoading: boolean;
  error: string | null;
  
  fetchItems: () => Promise<void>;
  initialize: (items: Item[]) => void;
  navigateToFolder: (folder: Item) => void;
  findItemById: (id: number) => Item | undefined;
  toggleFavorite: (id: number) => void;
}

export const useAppStore = create<FilesState>((set, get) => ({
  rootDir: null,
  currentFolder: null,
  itemsMap: new Map<number, Item>(),
  isLoading: true,
  error: null,

  fetchItems: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await getFiles();
      
      const items = data.map(item => new Item(item));
      
      get().initialize(items);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Произошла ошибка при загрузке файлов' 
      });
    } finally {
      set({ isLoading: false });
    }
  },

  initialize: (items: Item[]) => {
    let rootDir = null;
    const itemsMap = new Map<number, Item>();
    
    items.forEach(item => {
      itemsMap.set(item.id, item);
    });
    
    items.forEach(item => {
      if (item.parentId === null) {
        rootDir = item;
      } else {
        const parent = itemsMap.get(item.parentId);
        if (parent) {
          parent.children.push(item);
        }
      }
    });

    set({ rootDir, itemsMap, currentFolder: rootDir });
  },

  findItemById: (id: number) => {
    return get().itemsMap.get(id);
  },

  navigateToFolder: (folder: Item) => {
    if (folder.type !== 'dir') return;
    set({ currentFolder: folder });
  },

  toggleFavorite: (id: number) => {
    set(state => {
      const item = get().findItemById(id);
      
      if (item) {
        item.isFavorite = !item.isFavorite;
      }
      
      return { rootDir: state.rootDir };
    });
  },
}));
