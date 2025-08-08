import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, afterAll } from 'vitest';
import { RefetchButton } from './RefetchButton';
import { cleanup, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('RefetchButton', () => {
  afterAll(() => {
    cleanup();
  });

  it('calls onClick when button is clicked', async () => {
    const mockFn = vi.fn();

    render(
      <MemoryRouter>
        <RefetchButton onClick={mockFn} />
      </MemoryRouter>
    );

    const button = screen.getByTestId('refresh');
    await userEvent.click(button);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
