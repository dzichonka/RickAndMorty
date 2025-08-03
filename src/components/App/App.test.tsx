import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('App Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should renders App', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const background = screen.getByTestId('background');
    expect(background).toBeInTheDocument();
    expect(background).toHaveClass('background');
  });
});
