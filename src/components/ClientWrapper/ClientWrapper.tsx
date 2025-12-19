'use client';

import ThemeContext from '@/contexts/theme/ThemeContext';
import { StrictMode, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <div className={`${theme} container`}>
          <div className="background" data-testid="background"></div>
          {children}
          <main className="section"></main>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
};
export default ClientWrapper;
