import { render, screen, cleanup } from '@testing-library/react';
import Result from './Result';
import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import type { ICharacter } from '@/types/api-types';

const setup = () => {
  const mockData = [
    { id: 1, name: 'Rick', status: 'Alive', species: 'Human' },
    { id: 2, name: 'Morty', status: 'Alive', species: 'Human' },
    { id: 3, name: 'Summer', status: 'Alive', species: 'Human' },
  ] as ICharacter[];
  render(<Result data={mockData} />);
  const cards = screen.getAllByTestId('card');
  return { cards, mockData };
};

describe('Search Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correct number of items when data is provided', () => {
    const { cards, mockData } = setup();
    expect(cards).toHaveLength(3);
    expect(cards.length).toBe(mockData.length);
  });

  it('should correctly displays item names and descriptions', () => {
    const { mockData } = setup();
    mockData.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
    const descriptions = screen.getAllByText(
      `${mockData[0].status} - ${mockData[0].species}`
    );
    expect(descriptions.length).toBe(3);
  });
});
