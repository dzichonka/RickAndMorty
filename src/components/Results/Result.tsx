import type { ICharacter } from '@/types/api-types';
import { Component } from 'react';
import Card from '@/components/Card/Card';
import s from './Result.module.scss';

type ResultProps = { data: ICharacter[] };
class Result extends Component<ResultProps> {
  render() {
    return (
      <div
        data-testid="result"
        className={`${s.result} section flex flex-wrap items-center justify-between gap-4`}
      >
        {this.props.data.map((character) => (
          <div key={character.id} data-testid="card">
            <Card data={character} />
          </div>
        ))}
      </div>
    );
  }
}
export default Result;
