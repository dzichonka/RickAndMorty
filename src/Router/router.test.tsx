import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Outlet, RouterProvider } from 'react-router-dom';
import { router } from './router';

vi.mock('@/pages/MainPage/MainPage', async () => {
  return {
    default: () => (
      <div>
        Main Page
        <Outlet />
      </div>
    ),
  };
});
vi.mock('@/components/Details/Details', () => ({
  Details: () => <div>Details Component</div>,
}));

describe('Router', () => {
  it('shouldrenders MainPage with Details', async () => {
    window.history.pushState({}, '', '/');
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('Main Page')).toBeInTheDocument();
      expect(screen.getByText('Details Component')).toBeInTheDocument();
    });
  });
});
