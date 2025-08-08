import { render, screen, cleanup } from '@testing-library/react';
import MainPage from './MainPage';

import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import type { ICharacter, IInfo } from '@/types/api-types';
import { MemoryRouter } from 'react-router-dom';
import type { UseQueryResult } from '@tanstack/react-query';
import { useCharacters } from '@/hooks/useCharacters/useCharacters';
import userEvent from '@testing-library/user-event';

vi.mock('@/hooks/useCharacters/useCharacters', () => ({
  useCharacters: vi.fn(),
}));
const mockedUseCharacters = vi.mocked(useCharacters);

const mockedData = [
  { id: 1, name: 'Rick', status: 'Alive', species: 'Human' },
  { id: 2, name: 'Morty', status: 'Alive', species: 'Human' },
  { id: 3, name: 'Summer', status: 'Alive', species: 'Human' },
] as ICharacter[];

const mockedInfo = { count: 3, pages: 1, next: null, prev: null } as IInfo;

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('lastSearch', 'Rick');
  });

  afterEach(() => {
    cleanup();
    localStorage.removeItem('lastSearch');
  });

  it('should renders MainPage', () => {
    mockedUseCharacters.mockReturnValue({
      data: {
        results: mockedData,
        info: mockedInfo,
      },
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<
      { results: ICharacter[]; info: IInfo },
      Error
    >);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should show loader while loading', () => {
    mockedUseCharacters.mockReturnValue({
      data: {
        results: mockedData,
        info: mockedInfo,
      },
      isLoading: true,
      error: null,
    } as unknown as UseQueryResult<
      { results: ICharacter[]; info: IInfo },
      Error
    >);

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should show massege if no data', () => {
    mockedUseCharacters.mockReturnValue({
      data: {
        results: [],
        info: mockedInfo,
      },
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<
      { results: ICharacter[]; info: IInfo },
      Error
    >);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/sorry, no characters found/i)).toBeInTheDocument();
  });

  it('should throw error ', () => {
    mockedUseCharacters.mockReturnValue({
      data: {
        results: mockedData,
        info: mockedInfo,
      },
      isLoading: false,
      error: new Error('Failed to fetch characters'),
    } as unknown as UseQueryResult<
      { results: ICharacter[]; info: IInfo },
      Error
    >);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/failed to fetch characters/i)).toBeInTheDocument();
  });
  it('should call refetch when refresh button is clicked', async () => {
    const refetchMock = vi.fn();

    mockedUseCharacters.mockReturnValue({
      data: {
        results: mockedData,
        info: mockedInfo,
      },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: refetchMock,
    } as unknown as UseQueryResult<
      { results: ICharacter[]; info: IInfo },
      Error
    >);

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const button = screen.getByTestId('refresh');
    await userEvent.click(button);

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });
});
