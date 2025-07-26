import './main.css';
import './styles/style.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/Router/router';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
