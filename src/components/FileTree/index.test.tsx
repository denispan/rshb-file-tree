import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileTree from './index';
import { useAppStore } from '@/store/useAppStore';
import { Item } from '@/models/Item';

jest.mock('@/components/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`}>{name}</div>
}));

jest.mock('@/store/useAppStore', () => ({
  useAppStore: jest.fn()
}));

function mockAppStore(options: {
  rootDir?: Item | null;
  currentFolder?: Item | null;
  isLoading?: boolean;
  error?: string | null;
} = {}) {
  const navigateToFolder = jest.fn();
  const navigateUp = jest.fn();
  const fetchItems = jest.fn();
  
  (useAppStore as unknown as jest.Mock).mockReturnValue({
    rootDir: options.rootDir || null,
    currentFolder: options.currentFolder || null,
    isLoading: options.isLoading || false,
    error: options.error || null,
    fetchItems,
    navigateToFolder,
    navigateUp,
    toggleFavorite: jest.fn(),
  });
  
  return { navigateToFolder, navigateUp, fetchItems };
}

describe('FileTree', () => {
  const rootDir = new Item({ id: 1, name: 'Корневая папка', type: 'dir', parentId: null, isFavorite: false });

  it('показывает элементы корневой папки', () => {
    const folder = new Item({ id: 2, name: 'Folder1', parentId: 1, type: 'dir', isFavorite: false });
    const file = new Item({ id: 3, name: 'File1.txt', parentId: 1, type: 'file', isFavorite: false });
    
    rootDir.children.push(folder);
    rootDir.children.push(file);
    
    mockAppStore({
      rootDir,
      currentFolder: rootDir
    });
    
    render(<FileTree />);
    expect(screen.getByText('Folder1')).toBeInTheDocument();
    expect(screen.getByText('File1.txt')).toBeInTheDocument();
  });

  it('клик по кнопке вверх вызывает navigateUp', () => {
    const subfolder = new Item({ id: 2, name: 'Подпапка', parentId: 1, type: 'dir', isFavorite: false });
    
    rootDir.children.push(subfolder);
    
    const { navigateUp } = mockAppStore({
      rootDir,
      currentFolder: subfolder
    });
    
    render(<FileTree />);
    
    const upButton = screen.getByText('...');
    fireEvent.click(upButton);
    expect(navigateUp).toHaveBeenCalledTimes(1);
  });
  
  it('показывает сообщение о пустой папке', () => {
    const subfolder = new Item({ id: 2, name: 'Подпапка', parentId: 1, type: 'dir', isFavorite: false });
    
    mockAppStore({
      rootDir,
      currentFolder: subfolder
    });
    
    render(<FileTree />);
    expect(screen.getByText('Папка пуста')).toBeInTheDocument();
  });
});
