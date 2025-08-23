import { useQuery } from '@tanstack/react-query';
import { characterService } from '@/services/characterService';
import type { ICharacter } from '@/types/api-types';

export const useOneCharacter = (id: number) => {
  return useQuery<ICharacter>({
    queryKey: ['one-character', id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey as [string, number];
      return characterService.getCharacter(id);
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!id,
  });
};
