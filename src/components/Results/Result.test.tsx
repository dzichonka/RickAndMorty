import { render, screen, cleanup } from '@testing-library/react';
import Result from './Result';
import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import type { IApiResponse, ICharacter } from '@/types/api-types';

const setup = () => {
  const mockData: IApiResponse<ICharacter> = {
    info: { count: 3, pages: 1, next: null, prev: null },
    results: [
      { id: 1, name: 'Rick', status: 'Alive', species: 'Human' },
      { id: 2, name: 'Morty', status: 'Alive', species: 'Human' },
      { id: 3, name: 'Summer', status: 'Alive', species: 'Human' },
    ],
  } as IApiResponse<ICharacter>;

  render(<Result data={mockData} />);
  const cards = screen.getAllByTestId('card');
  return { cards, mockData };
};

describe('Result', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correct number of items when data is provided', () => {
    const { cards, mockData } = setup();
    expect(cards).toHaveLength(3);
    expect(cards.length).toBe(mockData.results.length);
  });

  it('should correctly displays item names and descriptions', () => {
    const { mockData } = setup();
    mockData.results.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
    const descriptions = screen.getAllByText(
      `${mockData.results[0].status} - ${mockData.results[0].species}`
    );
    expect(descriptions.length).toBe(3);
  });
});
