import type { ICharacter } from '@/types/api-types';
import { Component } from 'react';
import Card from '@/components/Card/Card';

type Props = { data: ICharacter[] };
class Result extends Component<Props> {
  render() {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4">
        {this.props.data.map((character) => (
          <div key={character.id}>
            <Card data={character} />
          </div>
        ))}
      </div>
    );
  }
}
export default Result;
