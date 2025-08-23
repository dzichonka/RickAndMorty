import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useOneCharacter } from './useOneCharacter';
import { characterService } from '@/services/characterService';
import { vi, describe, it, expect, type Mock } from 'vitest';
import type { ICharacter } from '@/types/api-types';

vi.mock('@/services/characterService', () => ({
  characterService: {
    getCharacter: vi.fn(),
  },
}));

const mockCharacter: ICharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
  type: '',
};

describe('useOneCharacter', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    Wrapper.displayName = 'QueryClientProviderWrapper';
    return Wrapper;
  };

  it('fetches character for given id', async () => {
    (characterService.getCharacter as Mock).mockResolvedValue(mockCharacter);

    const { result } = renderHook(() => useOneCharacter(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockCharacter);
    expect(characterService.getCharacter).toHaveBeenCalledWith(1);
  });

  it('uses correct queryKey', async () => {
    (characterService.getCharacter as Mock).mockResolvedValue(mockCharacter);

    renderHook(() => useOneCharacter(2), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(characterService.getCharacter).toHaveBeenCalledWith(2);
    });
  });
});
