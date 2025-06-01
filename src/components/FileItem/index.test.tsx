import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileItem from './index';
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
  toggleFavorite?: jest.Mock;
  navigateToFolder?: jest.Mock;
}

function mockAppStore({
  toggleFavorite = jest.fn(),
  navigateToFolder = jest.fn(),
}: MockAppStoreParams = {}) {
  return (useAppStore as unknown as jest.Mock).mockReturnValue({
    toggleFavorite,
    navigateToFolder,
  });
}

describe('FileItem', () => {
  let mockToggleFavorite: jest.Mock;
  let mockNavigateToFolder: jest.Mock;

  beforeEach(() => {
    mockToggleFavorite = jest.fn();
    mockNavigateToFolder = jest.fn();
  });

  it('renders file item correctly', () => {
    const file = createItem({ id: 1, name: 'document.txt', type: 'file' });
    
    mockAppStore({
      toggleFavorite: mockToggleFavorite,
      navigateToFolder: mockNavigateToFolder,
    });
    
    render(<FileItem item={file} />);
    
    expect(screen.getByText('document.txt')).toBeInTheDocument();
  });

  it('renders folder item correctly', () => {
    const folder = createItem({ id: 2, name: 'Важные документы', type: 'dir' });
    
    mockAppStore({
      toggleFavorite: mockToggleFavorite,
      navigateToFolder: mockNavigateToFolder,
    });
    
    render(<FileItem item={folder} />);
    
    expect(screen.getByText('Важные документы')).toBeInTheDocument();
  });

  it('calls navigateToFolder when clicking on a folder', () => {
    const folder = createItem({ id: 2, name: 'Важные документы', type: 'dir' });
    
    mockAppStore({
      toggleFavorite: mockToggleFavorite,
      navigateToFolder: mockNavigateToFolder,
    });
    
    render(<FileItem item={folder} />);
    
    fireEvent.click(screen.getByText('Важные документы'));
    expect(mockNavigateToFolder).toHaveBeenCalledWith(folder);
  });

  it('does not call navigateToFolder when clicking on a file', () => {
    const file = createItem({ id: 1, name: 'document.txt', type: 'file' });
    
    mockAppStore({
      toggleFavorite: mockToggleFavorite,
      navigateToFolder: mockNavigateToFolder,
    });
    
    render(<FileItem item={file} />);
    
    fireEvent.click(screen.getByText('document.txt'));
    expect(mockNavigateToFolder).not.toHaveBeenCalled();
  });

  it('calls toggleFavorite when clicking on favorite button', () => {
    const file = createItem({ id: 1, name: 'document.txt', type: 'file' });
    
    mockAppStore({
      toggleFavorite: mockToggleFavorite,
      navigateToFolder: mockNavigateToFolder,
    });
    
    render(<FileItem item={file} />);
    
    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toBeInTheDocument();
    
    fireEvent.click(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });

  it('displays favorite status correctly', () => {
    const favoriteFile = createItem({ id: 1, name: 'important.txt', type: 'file', isFavorite: true });
    
    mockAppStore({
      toggleFavorite: mockToggleFavorite,
      navigateToFolder: mockNavigateToFolder,
    });
    
    render(<FileItem item={favoriteFile} />);
    
    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveClass('favoriteActive');
  });
});
