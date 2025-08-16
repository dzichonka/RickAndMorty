'use client';

import ThemeContext from '@/contexts/theme/ThemeContext';
import { StrictMode, useContext, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <div className={`${theme} container`}>
            <div className="background" data-testid="background"></div>
            <main className="section">{children}</main>
          </div>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
};
export default ClientWrapper;
