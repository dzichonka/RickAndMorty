import { render, screen, cleanup } from '@testing-library/react';
import Card from './Card';
import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import type { ICharacter } from '@/types/api-types';

const setup = () => {
  const mockData = {
    id: 1,
    name: 'Summer',
    status: 'Alive',
    species: 'Human',
  } as ICharacter;
  render(<Card data={mockData} />);
  return { mockData };
};

describe('Search Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should displays item name and description correctly', () => {
    const { mockData } = setup();
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockData.status} - ${mockData.species}`)
    ).toBeInTheDocument();
  });
});
