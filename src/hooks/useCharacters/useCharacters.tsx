import { useQuery } from '@tanstack/react-query';
import { characterService } from '@/services/characterService';
import type { IApiResponse, ICharacter } from '../../types/api-types';

export const useCharacters = (page: number = 1, name?: string) => {
  return useQuery<IApiResponse<ICharacter>>({
    queryKey: ['characters', page, name],
    queryFn: ({ queryKey }) => {
      const [, page, name] = queryKey as [string, number, string];
      return characterService.getAllCharacters(page, { name });
    },
    staleTime: Infinity,
  });
};
