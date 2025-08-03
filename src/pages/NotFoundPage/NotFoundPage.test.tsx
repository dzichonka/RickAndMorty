import { render, screen, cleanup } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';

describe('NotFoundPage Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should renders NotFoundPage', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
