import './main.css';
import './styles/style.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/Router/router';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx';
import ThemeProvider from './contexts/theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}

const queryClient = new QueryClient();
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
