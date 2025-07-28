import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('ErrorButton', () => {
  it('should render button and throws error when test button is clicked', () => {
    render(<ErrorButton />);

    const button = screen.getByRole('button', { name: /error/i });
    expect(button).toBeInTheDocument();

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Test error from button!');
  });
});
