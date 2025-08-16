'use client';
import type { IApiResponse, ICharacter } from '@/types/api-types';
import Card from '@/components/Card/Card';
import { useSearchParams, useRouter } from 'next/navigation';

type ResultProps = {
  data: IApiResponse<ICharacter>;
};
const Result = ({ data }: ResultProps): React.JSX.Element => {
  const { results } = data;
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCardClick = (id: number) => {
    const newParams = new URLSearchParams(searchParams?.toString() ?? '');
    newParams.set('details', id.toString());
    router.replace(`/?${newParams.toString()}`);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-testid="card"]')) return;

    const newParams = new URLSearchParams(searchParams?.toString() ?? '');
    newParams.delete('details');
    router.replace(`/?${newParams.toString()}`);
  };

  return (
    <div
      data-testid="result"
      className={
        'flex flex-wrap items-center justify-center gap-4 max-[460px]:flex-col max-[460px]:items-center'
      }
      onClick={(event) => handleOutsideClick(event)}
    >
      <div
        className={
          'flex flex-wrap items-center justify-between gap-4 max-[460px]:flex-col max-[460px]:items-center max-[460px]:justify-center'
        }
      >
        {results.map((character) => (
          <div
            key={character.id}
            data-testid="card"
            onClick={(event) => {
              event.stopPropagation();
              handleCardClick(character.id);
            }}
          >
            <Card data={character} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
