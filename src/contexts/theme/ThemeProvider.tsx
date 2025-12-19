'use client';
import { useState, type ReactNode } from 'react';
import ThemeContext from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light-theme' | 'dark-theme'>(
    'dark-theme'
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark-theme' ? 'light-theme' : 'dark-theme'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
