'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ErrorPage from '@/pages/ErrorPage';

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
}

const ClientErrorBoundary: React.FC<ClientErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    return (
      <ErrorPage 
        error={error} 
        resetError={() => setError(null)} 
      />
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorPage 
          resetError={() => window.location.reload()} 
        />
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default ClientErrorBoundary;
