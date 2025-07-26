import type { ICharacter } from '@/types/api-types';
import Card from '@/components/Card/Card';
import s from './Result.module.scss';

type ResultProps = { data: ICharacter[] };
const Result = ({ data }: ResultProps): React.JSX.Element => {
  return (
    <div
      data-testid="result"
      className={`${s.result} section flex flex-wrap items-center justify-between gap-4`}
    >
      {data.map((character) => (
        <div key={character.id} data-testid="card">
          <Card data={character} />
        </div>
      ))}
    </div>
  );
};

export default Result;
