import type { IApiResponse, ICharacter } from '@/types/api-types';
import Card from '@/components/Card/Card';
import s from './Result.module.scss';

type ResultProps = {
  data: IApiResponse<ICharacter>;
};
const Result = ({ data }: ResultProps): React.JSX.Element => {
  const { results } = data;

  return (
    <div
      data-testid="result"
      className={`${s.result} section flex flex-wrap items-center justify-center gap-4`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {results.map((character) => (
          <div key={character.id} data-testid="card">
            <Card data={character} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
