import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { afterEach } from 'node:test';
import { clear } from 'console';
import type { JSX } from 'react';
import { MemoryRouter } from 'react-router-dom';

function ErrorComponent(): JSX.Element {
  throw new Error('Test error from component!');
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    clear();
  });

  it('should catches and handles errors and displays fallback UI when error occurs', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(
      screen.getByText('error boundary caught an error')
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /fix it/i })).toBeInTheDocument();

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });
});
