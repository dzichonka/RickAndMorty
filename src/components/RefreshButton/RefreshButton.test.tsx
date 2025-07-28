import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import RefreshButton from './RefreshButton';
import { describe, expect, it, vi, afterAll } from 'vitest';
import '@testing-library/jest-dom';

describe('RefreshButton', () => {
  afterAll(() => {
    cleanup();
  });

  it('should renders refresh button', () => {
    const mockClick = vi.fn();
    render(<RefreshButton onClick={mockClick} />);
    const button = screen.getByRole('button', { name: /Fix it!/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  });
});
