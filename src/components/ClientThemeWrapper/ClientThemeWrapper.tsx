'use client';

import ThemeContext from '@/contexts/theme/ThemeContext';
import { useContext } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const ClientThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ErrorBoundary>
      <div className={`${theme} container`}>
        <div className="background" data-testid="background"></div>
        <main className="section">{children}</main>
      </div>
    </ErrorBoundary>
  );
};
export default ClientThemeWrapper;
