import React from 'react';
import { render, screen } from '@testing-library/react';
import FileTree from './index';

describe('FileTree', () => {
  it('renders FileTree', () => {
    render(<FileTree title="Мои файлы" />);
    expect(screen.getByText('Мои файлы')).toBeInTheDocument();
    expect(screen.getByText('Создать папку')).toBeInTheDocument();
    expect(screen.getByText('Загрузить файл')).toBeInTheDocument();
  });
});
