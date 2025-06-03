import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileItem from './index';
import { Item } from '@/models/Item';

jest.mock('@/components/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`}>{name}</div>
}));

describe('FileItem', () => {
  it('корректно отображает имя файла', () => {
    const file = new Item({ id: 1, name: 'document.txt', type: 'file', parentId: null, isFavorite: true });
    
    render(<FileItem item={file} />);
    
    expect(screen.getByText('document.txt')).toBeInTheDocument();
  });

});
