import { render, screen, cleanup } from '@testing-library/react';
import { Header } from './Header';

import { describe, expect, it, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ThemeContext from '@/contexts/theme/ThemeContext';

function customRender(
  toggleTheme = vi.fn(),
  theme: 'light' | 'dark' = 'light'
) {
  render(
    <MemoryRouter>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Header />
      </ThemeContext.Provider>
    </MemoryRouter>
  );
  return { toggleTheme };
}

describe('Header Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should renders Header', () => {
    customRender();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should calls toggleTheme when theme button is clicked', () => {
    const { toggleTheme } = customRender();
    screen.getByRole('button').click();
    expect(toggleTheme).toHaveBeenCalled();
  });

  it('renders navigation links', () => {
    customRender();
    expect(screen.getByText('Main')).toHaveAttribute('href', '/');
    expect(screen.getByText('About')).toHaveAttribute('href', '/about');
  });
});
