'use client';

import React from 'react';
import FileTree from '@/components/FileTree';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorPage from '@/pages/ErrorPage';

const ClientPage: React.FC = () => {
  return (
    <ErrorBoundary
      fallback={
        <ErrorPage resetError={() => window.location.reload()} />
      }
    >
      <FileTree />
    </ErrorBoundary>
  );
};

export default ClientPage;
