import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { Details } from './Details';
import { MemoryRouter } from 'react-router-dom';
import type { ICharacter } from '@/types/api-types';
import { useOneCharacter } from '@/hooks/useOneCharacter/useOneCharacter';
import type { UseQueryResult } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

vi.mock('@/hooks/useOneCharacter/useOneCharacter', () => ({
  useOneCharacter: vi.fn(),
}));

const mockedUseOneCharacter = vi.mocked(useOneCharacter);

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

describe('Details', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('shows loader while fetching', async () => {
    mockedUseOneCharacter.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as unknown as UseQueryResult<ICharacter, Error>);
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows error message on failure', async () => {
    mockedUseOneCharacter.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch character'),
    } as unknown as UseQueryResult<ICharacter, Error>);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument()
    );
  });

  it('shows character data on success', async () => {
    mockedUseOneCharacter.mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<ICharacter, Error>);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument()
    );

    expect(
      screen.getByText(`location: ${mockCharacter.location.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`status: ${mockCharacter.status}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockCharacter.name)).toHaveAttribute(
      'src',
      mockCharacter.image
    );
  });

  it('shows fallback message if no data returned', async () => {
    mockedUseOneCharacter.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<ICharacter, Error>);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/no details for this character/i)
      ).toBeInTheDocument()
    );
  });
  it('calls refetch when refresh button is clicked', async () => {
    const refetchMock = vi.fn();

    mockedUseOneCharacter.mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: refetchMock,
    } as unknown as UseQueryResult<ICharacter, Error>);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Details />
      </MemoryRouter>
    );

    const button = screen.getByTestId('refresh');
    await userEvent.click(button);

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });
});
