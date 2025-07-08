import type { IApiResponse, ICharacter } from '../types/api-types';

export default class CharacterService {
  private _apiBase = 'https://rickandmortyapi.com/api/character';

  private getResource = async <T>(url: string): Promise<T> => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return (await res.json()) as T;
  };

  public getAllCharacters = async (
    page: number = 1,
    params?: { name?: string }
  ): Promise<IApiResponse<ICharacter>> => {
    const query = new URLSearchParams({ page: page.toString() });
    if (params?.name && params.name.trim() !== '') {
      query.append('name', params.name.trim());
    }
    const url = `${this._apiBase}/?${query.toString()}`;
    return this.getResource<IApiResponse<ICharacter>>(url);
  };

  public getCharacter = async (id: number): Promise<ICharacter> => {
    const url = `${this._apiBase}/${id}`;
    return this.getResource<{ results: ICharacter[] }>(url).then(
      (r) => r.results[0]
    );
  };
}
