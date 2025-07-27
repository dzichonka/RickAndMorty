import { render, screen, cleanup, waitFor } from '@testing-library/react';
import MainPage from './MainPage';

import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import type { ICharacter, IInfo } from '@/types/api-types';
import { characterService } from '@/services/CharacterServiece';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

const mockLocalStorage = vi.mocked(useLocalStorage);

vi.mock('@/services/CharacterServiece', () => ({
  characterService: {
    getAllCharacters: vi.fn(),
  },
}));

const mockedService = vi.mocked(characterService);

const mockedData = [
  { id: 1, name: 'Rick', status: 'Alive', species: 'Human' },
  { id: 2, name: 'Morty', status: 'Alive', species: 'Human' },
  { id: 3, name: 'Summer', status: 'Alive', species: 'Human' },
] as ICharacter[];

const mockedInfo = { count: 3, pages: 1, next: null, prev: null } as IInfo;

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.mockReturnValue(['Rick', vi.fn()]);
  });

  afterEach(() => {
    cleanup();
  });

  it('should renders MainPage', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should show loader while loading', async () => {
    mockedService.getAllCharacters.mockResolvedValueOnce({
      results: mockedData,
      info: mockedInfo,
    });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await screen.findByText('Rick');

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Failed to fetch characters')
    ).not.toBeInTheDocument();
  });

  it('should show massege if no data', async () => {
    mockedService.getAllCharacters.mockResolvedValueOnce({
      results: [],
      info: mockedInfo,
    });
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(
      await screen.findByText(/sorry, no characters found/i)
    ).toBeInTheDocument();
  });

  it('should throw error if data is null', async () => {
    mockedService.getAllCharacters.mockResolvedValueOnce(
      null as unknown as {
        results: ICharacter[];
        info: IInfo;
      }
    );
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    await expect(
      screen.findByText(/you can search for characters/i)
    ).resolves.toBeInTheDocument();
  });

  it('should make initial API call on mount', async () => {
    mockedService.getAllCharacters.mockResolvedValueOnce({
      results: mockedData,
      info: mockedInfo,
    });
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(mockedService.getAllCharacters).toHaveBeenCalledTimes(1);
      expect(mockedService.getAllCharacters).toHaveBeenCalledWith(1, {
        name: 'Rick',
      });
    });
  });

  it('should show error message on API error', async () => {
    mockedService.getAllCharacters.mockRejectedValueOnce(new Error());
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch characters')
      ).toBeInTheDocument();
    });
  });
});
