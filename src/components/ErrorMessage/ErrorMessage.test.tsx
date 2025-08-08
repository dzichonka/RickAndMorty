import { render, screen, cleanup } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';
import { describe, expect, it, afterAll } from 'vitest';
import '@testing-library/jest-dom';

describe('ErrorMessage', () => {
  afterAll(() => {
    cleanup();
  });

  it('should renders ErrorMessage', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/oops/i)).toBeInTheDocument();
  });
});
