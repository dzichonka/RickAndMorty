import type { IApiResponse, ICharacter } from '../types/api-types';

const API_BASE = 'https://rickandmortyapi.com/api/character';

const getResource = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return (await res.json()) as T;
};

export const characterService = {
  getAllCharacters: async (
    page: number = 1,
    params?: { name?: string }
  ): Promise<IApiResponse<ICharacter>> => {
    const query = new URLSearchParams({ page: page.toString() });
    if (params?.name && params.name.trim() !== '') {
      query.append('name', params.name.trim());
    }
    const url = `${API_BASE}/?${query.toString()}`;
    return getResource<IApiResponse<ICharacter>>(url);
  },

  getCharacter: async (id: number): Promise<ICharacter> => {
    const url = `${API_BASE}/${id}`;
    return getResource<ICharacter>(url);
  },
};
