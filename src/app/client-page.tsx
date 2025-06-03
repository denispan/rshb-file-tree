'use client';

import React from 'react';
import FileTree from '@/components/FileTree';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorPage from '@/pages/ErrorPage';
import { buttonsFileTreePage } from './buttons';

const ClientPage: React.FC = () => {
  return (
    <ErrorBoundary
      fallback={
        <ErrorPage resetError={() => window.location.reload()} />
      }
    >
      <FileTree buttons={buttonsFileTreePage}/>
    </ErrorBoundary>
  );
};

export default ClientPage;
