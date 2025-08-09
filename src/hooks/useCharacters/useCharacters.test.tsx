import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacters } from './useCharacters';
import { characterService } from '@/services/characterService';
import { vi, describe, it, expect, type Mock } from 'vitest';

vi.mock('@/services/characterService', () => ({
  characterService: {
    getAllCharacters: vi.fn(),
  },
}));

const mockCharacters = {
  info: { count: 1, pages: 1 },
  results: [{ id: 1, name: 'Rick Sanchez', species: 'Human' }],
};

describe('useCharacters', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    Wrapper.displayName = 'QueryClientProviderWrapper';
    return Wrapper;
  };

  it('fetches characters for given page and name', async () => {
    (characterService.getAllCharacters as Mock).mockResolvedValue(
      mockCharacters
    );

    const { result } = renderHook(() => useCharacters(1, 'Rick'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockCharacters);
    expect(characterService.getAllCharacters).toHaveBeenCalledWith(1, {
      name: 'Rick',
    });
  });

  it('uses correct queryKey', async () => {
    (characterService.getAllCharacters as Mock).mockResolvedValue(
      mockCharacters
    );

    renderHook(() => useCharacters(2, 'Morty'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(characterService.getAllCharacters).toHaveBeenCalledWith(2, {
        name: 'Morty',
      });
    });
  });
});
