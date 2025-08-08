import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/Router/router';
import ThemeProvider from '@/contexts/theme/ThemeProvider';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { it } from 'vitest';

it('app should renders without crashing', () => {
  render(
    <ThemeProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  );
});
