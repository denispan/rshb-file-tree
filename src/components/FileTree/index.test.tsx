import React from 'react';
import { render, screen } from '@testing-library/react';
import FileTree from './index';
import '@testing-library/jest-dom';

describe('FileTree', () => {
  it('renders FileTree', () => {
    render(<FileTree />);
    expect(screen.getByText('Создать папку')).toBeInTheDocument();
    expect(screen.getByText('Загрузить файл')).toBeInTheDocument();
  });
});
