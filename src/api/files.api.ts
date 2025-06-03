import { ItemResponse } from "@/types/common";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getFiles = async ():Promise<ItemResponse> => {
    await sleep(1000);
    
    // Базовые элементы
    const baseItems = [
      {
        id: 1,
        type: "dir" as const,
        parentId: null,
        name: "Ваши файлы",
        isFavorite: false,
      },
      { id: 2, type: "dir" as const, parentId: 1, name: "second", isFavorite: false },
      { id: 3, type: "dir" as const, parentId: 1, name: "test", isFavorite: true },
      { id: 4, type: "dir" as const, parentId: 1, name: "third", isFavorite: false },
      { id: 5, type: "file" as const, parentId: 1, name: "photophotophotophotophotophotophotophotophotophotophotophotophotophotophotophotophoto.jpg", isFavorite: true },
      {
        id: 6,
        type: "dir" as const,
        parentId: 2,
        name: "Вложенная папка",
        isFavorite: false,
      },
      {
        id: 7,
        type: "dir" as const,
        parentId: 6,
        name: "Глубокое вложение",
        isFavorite: false,
      },
    ];
    
    // Добавляем много папок на одном уровне для проверки переполнения
    const manyFolders = [];
    for (let i = 0; i < 50; i++) {
      manyFolders.push({
        id: 100 + i,
        type: "dir" as const,
        parentId: 3, // Все папки будут в папке "test"
        name: `Папка ${i + 1}`,
        isFavorite: i % 5 === 0, // Каждая пятая папка в избранном
      });
    }
    
    // Добавляем несколько файлов разных типов
    const files = [
      { id: 200, type: "file" as const, parentId: 3, name: "document.pdf", isFavorite: false },
      { id: 201, type: "file" as const, parentId: 3, name: "image.jpg", isFavorite: true },
      { id: 202, type: "file" as const, parentId: 3, name: "presentation.pptx", isFavorite: false },
      { id: 203, type: "file" as const, parentId: 3, name: "spreadsheet.xlsx", isFavorite: false },
      { id: 204, type: "file" as const, parentId: 3, name: "archive.zip", isFavorite: false },
      { id: 205, type: "file" as const, parentId: 3, name: "photo2.gif", isFavorite: true },
    ];
    
    return [...baseItems, ...manyFolders, ...files];
};