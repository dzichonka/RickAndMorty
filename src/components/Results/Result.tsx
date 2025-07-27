import type { IApiResponse, ICharacter } from '@/types/api-types';
import Card from '@/components/Card/Card';
import s from './Result.module.scss';
import { useSearchParams } from 'react-router-dom';

type ResultProps = {
  data: IApiResponse<ICharacter>;
};
const Result = ({ data }: ResultProps): React.JSX.Element => {
  const { results } = data;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCardClick = (id: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('details', id.toString());
    setSearchParams(newParams);
  };

  return (
    <div
      data-testid="result"
      className={`${s.result} section flex flex-wrap items-center justify-center gap-4`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {results.map((character) => (
          <div
            key={character.id}
            data-testid="card"
            onClick={() => handleCardClick(character.id)}
          >
            <Card data={character} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
