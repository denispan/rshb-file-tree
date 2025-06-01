import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileTree from './index';
import { useAppStore } from '@/store/useAppStore';
import { Item } from '@/models/Item';

jest.mock('@/store/useAppStore', () => ({
  useAppStore: jest.fn()
}));

function createItem({ id, name, type = 'dir', parentId = null, isFavorite = false }: Partial<Item> & { id: number; name: string; type?: 'dir' | 'file'; parentId?: number | null; isFavorite?: boolean }) {
  const item = new Item({ id, name, type, parentId, isFavorite });
  item.isImage = () => false;
  return item;
}

interface MockAppStoreParams {
  rootDir?: Item | null;
  currentFolder?: Item | null;
  itemsMap?: Map<number, Item>;
  isLoading?: boolean;
  error?: string | null;
  navigateToFolder?: jest.Mock;
  navigateUp?: jest.Mock;
}

function mockAppStore({
  rootDir = null,
  currentFolder = null,
  itemsMap = new Map<number, Item>(),
  isLoading = false,
  error = null,
  navigateToFolder = jest.fn(),
  navigateUp = jest.fn(),
}: MockAppStoreParams = {}) {
  return (useAppStore as unknown as jest.Mock).mockReturnValue({
    rootDir,
    currentFolder,
    itemsMap,
    isLoading,
    error,
    fetchItems: jest.fn(),
    initialize: jest.fn(),
    findItemById: jest.fn(),
    toggleFavorite: jest.fn(),
    navigateToFolder,
    navigateUp,
  });
}

describe('FileTree', () => {
  let mockNavigateToFolder: jest.Mock;
  let mockNavigateUp: jest.Mock;

  beforeEach(() => {
    mockNavigateToFolder = jest.fn();
    mockNavigateUp = jest.fn();
  });

  it('shows root folder items', () => {
    const rootDir = createItem({ id: 1, name: 'Корневая папка', type: 'dir' });
    const items = [
      createItem({ id: 2, name: 'Folder1', type: 'dir' }),
      createItem({ id: 3, name: 'File1.txt', type: 'file' }),
    ];
    
    items.forEach(item => rootDir.children.push(item));
    
    const itemsMap = new Map([[1, rootDir], [2, items[0]], [3, items[1]]]);
    mockAppStore({
      rootDir,
      currentFolder: rootDir,
      itemsMap,
      navigateToFolder: mockNavigateToFolder,
      navigateUp: mockNavigateUp,
    });
    
    render(<FileTree />);
    expect(screen.getByText('Folder1')).toBeInTheDocument();
    expect(screen.getByText('File1.txt')).toBeInTheDocument();
  });

  it('navigates to another folder on click', () => {
    const rootDir = createItem({ id: 1, name: 'Корневая папка', type: 'dir' });
    const folder = createItem({ id: 2, name: 'Folder1', type: 'dir' });
    const file = createItem({ id: 3, name: 'File1.txt', type: 'file' });
    
    rootDir.children.push(folder);
    rootDir.children.push(file);
    
    const itemsMap = new Map([[1, rootDir], [2, folder], [3, file]]);
    mockAppStore({
      rootDir,
      currentFolder: rootDir,
      itemsMap,
      navigateToFolder: mockNavigateToFolder,
      navigateUp: mockNavigateUp,
    });
    
    render(<FileTree />);
    fireEvent.click(screen.getByText('Folder1'));
    expect(mockNavigateToFolder).toHaveBeenCalledWith(expect.objectContaining({ id: 2, name: 'Folder1' }));
  });
  
  it('shows loading state', () => {
    mockAppStore({
      isLoading: true,
      navigateToFolder: mockNavigateToFolder,
      navigateUp: mockNavigateUp,
    });
    
    render(<FileTree />);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });
  
  it('shows error state', () => {
    const errorMessage = 'Ошибка загрузки';
    
    mockAppStore({
      error: errorMessage,
      navigateToFolder: mockNavigateToFolder,
      navigateUp: mockNavigateUp,
    });
    
    render(<FileTree />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
  
  it('shows empty folder message', () => {
    const emptyFolder = createItem({ id: 1, name: 'Пустая папка', type: 'dir' });
    const itemsMap = new Map([[1, emptyFolder]]);
    
    mockAppStore({
      rootDir: emptyFolder,
      currentFolder: emptyFolder,
      itemsMap,
      navigateToFolder: mockNavigateToFolder,
      navigateUp: mockNavigateUp,
    });
    
    render(<FileTree />);
    expect(screen.getByText('Папка пуста')).toBeInTheDocument();
  });

  it('clicking on the Up button calls navigateUp', () => {
    const rootDir = createItem({ id: 1, name: 'Корневая папка', type: 'dir' });
    const subfolder = createItem({ id: 2, name: 'Подпапка', type: 'dir', parentId: 1 });
    
    rootDir.children.push(subfolder);
    
    const itemsMap = new Map([[1, rootDir], [2, subfolder]]);
    
    mockAppStore({
      rootDir,
      currentFolder: subfolder,
      itemsMap,
      navigateToFolder: mockNavigateToFolder,
      navigateUp: mockNavigateUp,
    });
    
    render(<FileTree />);
    
    const upButton = screen.getByText('...');
    expect(upButton).toBeInTheDocument();

    fireEvent.click(upButton);
    expect(mockNavigateUp).toHaveBeenCalledTimes(1);
  });
});
