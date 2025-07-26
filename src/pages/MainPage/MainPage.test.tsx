import { render, screen, cleanup, waitFor } from '@testing-library/react';
import MainPage from './MainPage';

import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import type { ICharacter, IInfo } from '@/types/api-types';
import { characterService } from '@/services/CharacterServiece';

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
  });

  afterEach(() => {
    cleanup();
  });

  it('should renders MainPage', () => {
    render(<MainPage />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should show loader while loading', async () => {
    mockedService.getAllCharacters.mockResolvedValueOnce({
      results: mockedData,
      info: mockedInfo,
    });

    render(<MainPage />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await screen.findByText('Rick');

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Failed to fetch characters')
    ).not.toBeInTheDocument();
  });

  it('should render empty div if no data', async () => {
    mockedService.getAllCharacters.mockResolvedValueOnce({
      results: [],
      info: mockedInfo,
    });
    render(<MainPage />);
    const resultDiv = await screen.findByTestId('result');
    expect(resultDiv).toBeEmptyDOMElement();
  });

  it('should throw error if data is null', async () => {
    mockedService.getAllCharacters.mockResolvedValueOnce(
      null as unknown as {
        results: ICharacter[];
        info: IInfo;
      }
    );
    render(<MainPage />);
    await expect(
      screen.findByText('Failed to fetch characters')
    ).resolves.toBeInTheDocument();
  });

  it('should make initial API call on mount', async () => {
    mockedService.getAllCharacters.mockResolvedValueOnce({
      results: mockedData,
      info: mockedInfo,
    });
    render(<MainPage />);
    await waitFor(() => {
      expect(mockedService.getAllCharacters).toHaveBeenCalledTimes(1);
      expect(mockedService.getAllCharacters).toHaveBeenCalledWith(1, undefined);
    });
  });

  it('should show error message on API error', async () => {
    mockedService.getAllCharacters.mockRejectedValueOnce(new Error());
    render(<MainPage />);
    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch characters')
      ).toBeInTheDocument();
    });
  });
});
