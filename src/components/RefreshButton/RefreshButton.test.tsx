import { render, screen, cleanup } from '@testing-library/react';
import RefreshButton from './RefreshButton';
import { describe, expect, it, afterAll } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('RefreshButton', () => {
  afterAll(() => {
    cleanup();
  });

  it('should renders refresh button', () => {
    render(
      <MemoryRouter>
        <RefreshButton />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /fix it/i });
    expect(button).toBeInTheDocument();
  });
});
