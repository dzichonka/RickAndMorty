'use client';

import ThemeContext from '@/contexts/theme/ThemeContext';
import { useContext } from 'react';

const ClientThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme} container`}>
      <div className="background" data-testid="background"></div>
      <main className="section">{children}</main>
    </div>
  );
};

export default ClientThemeWrapper;
