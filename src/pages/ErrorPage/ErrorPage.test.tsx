import { render, screen, cleanup } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';
import { describe, expect, it, vi, afterAll } from 'vitest';
import '@testing-library/jest-dom';

describe('ErrorPage', () => {
  afterAll(() => {
    cleanup();
  });

  it('should renders ErrorPage', () => {
    const mochRefresh = vi.fn();
    render(<ErrorPage onRefresh={mochRefresh} />);
    expect(
      screen.getByRole('button', { name: /Fix it!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText('error boundary caught an error')
    ).toBeInTheDocument();
  });
});
