import { render, screen, cleanup } from '@testing-library/react';
import { Pagination } from './Pagination';

import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Pagination Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should renders AboutPage', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Pagination info={{ next: null, prev: null, pages: 1, count: 1 }} />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('pagination')).toBeDefined();
    expect(screen.getByText(/page/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/1/i).length).toBeGreaterThan(0);
  });
});
