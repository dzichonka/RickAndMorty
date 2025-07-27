import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { Details } from './Details';
import { MemoryRouter } from 'react-router-dom';
import type { ICharacter } from '@/types/api-types';
import { characterService } from '@/services/CharacterServiece';

vi.mock('@/services/CharacterServiece', () => ({
  characterService: {
    getCharacter: vi.fn(),
  },
}));

const mockedService = vi.mocked(characterService);

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
    mockedService.getCharacter.mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows error message on failure', async () => {
    mockedService.getCharacter.mockRejectedValue(new Error('Failed to fetch'));

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
    mockedService.getCharacter.mockResolvedValue(mockCharacter);

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
    mockedService.getCharacter.mockResolvedValue(null as unknown as ICharacter);

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
});
