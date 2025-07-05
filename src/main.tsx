import './main.css';
import './styles/base.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './shared/ErrorBoundary/ErrorBoundary.tsx';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
