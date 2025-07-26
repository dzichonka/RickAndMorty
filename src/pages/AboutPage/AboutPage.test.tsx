import { render, screen, cleanup } from '@testing-library/react';
import AboutPage from './AboutPage';

import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';

describe('MainPage Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should renders AboutPage', () => {
    render(<AboutPage />);
    expect(screen.getByText(/anna/i)).toBeInTheDocument();
  });
});
