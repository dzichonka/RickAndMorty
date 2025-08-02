import { createContext } from 'react';
import type { ThemeContextType } from './ThemeType';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export default ThemeContext;
