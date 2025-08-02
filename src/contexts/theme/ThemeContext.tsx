import { createContext } from 'react';
import type { ThemeContextType } from './ThemeType';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export default ThemeContext;
