'use client';

import React from 'react';
import FileTree from '@/components/FileTree';
import ErrorBoundary from '@/components/ErrorBoundary';
import { buttonsFileTreePage } from './buttons';

const ClientPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <FileTree buttons={buttonsFileTreePage}/>
    </ErrorBoundary>
  );
};

export default ClientPage;
