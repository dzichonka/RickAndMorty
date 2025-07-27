import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Outlet, RouterProvider } from 'react-router-dom';
import { router } from './router';

vi.mock('@/pages/MainPage/MainPage', () => {
  return {
    default: () => (
      <div>
        Main Page
        <Outlet />
      </div>
    ),
  };
});

vi.mock('@/pages/MainPage/MainPage', () => ({
  default: () => <div>Main Page</div>,
}));

describe('Router', () => {
  it('renders MainPage on / route', () => {
    window.history.pushState({}, '', '/');
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});
