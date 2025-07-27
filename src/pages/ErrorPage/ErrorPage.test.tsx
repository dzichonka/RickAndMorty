import { render, screen, cleanup } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';
import { describe, expect, it, afterAll } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('ErrorPage', () => {
  afterAll(() => {
    cleanup();
  });

  it('should renders ErrorPage', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /fix it/i })).toBeInTheDocument();
    expect(
      screen.getByText('error boundary caught an error')
    ).toBeInTheDocument();
  });
});
