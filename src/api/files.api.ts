import { ItemResponse } from "@/types/common";

interface ToggleFavoriteResponse {
  success: boolean;
  isFavorite: boolean;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getFiles = async ():Promise<ItemResponse> => {
  // Для моков e2e тестов
  if (typeof window !== 'undefined' && 'getFilesOverride' in window && window.getFilesOverride) {
    return window.getFilesOverride();
  }
    
  await sleep(1000);
  
  return [
    {
      id: 1,
      type: "dir",
      parentId: null,
      name: "Ваши файлы",
      isFavorite: false,
    },
    { id: 2, type: "dir", parentId: 1, name: "second", isFavorite: false },
    { id: 3, type: "dir", parentId: 1, name: "test", isFavorite: true },
    { id: 4, type: "dir", parentId: 1, name: "third", isFavorite: false },
    { id: 5, type: "file", parentId: 1, name: "photo.jpg", isFavorite: true },
    {
      id: 6,
      type: "dir",
      parentId: 2,
      name: "Вложенная папка",
      isFavorite: false,
    },
    {
      id: 7,
      type: "dir",
      parentId: 6,
      name: "Глубокое вложение",
      isFavorite: false,
    },
  ];
};

export const toggleItemFavorite = async (id: number, isFavorite: boolean): Promise<ToggleFavoriteResponse> => {
  // Для моков e2e тестов
  if (typeof window !== 'undefined' && 'toggleItemFavoriteOverride' in window && window.toggleItemFavoriteOverride) {
    return window.toggleItemFavoriteOverride(id, isFavorite);
  }
  
  await sleep(500);

  const success = Math.random() > 0.05;
  if (!success) {
    throw new Error(`Ошибка при обновлении статуса избранного для элемента id=${id}`);
  }
  
  return { success: true, isFavorite };
};