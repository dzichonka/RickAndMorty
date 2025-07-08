import type { ICharacter } from '@/types/api-types';
import { Component } from 'react';

type Props = { data: ICharacter };
class Card extends Component<Props> {
  render() {
    return (
      <div className="flex flex-col items-center justify-start gap-3 bg-black w-[200px] h-[250px] p-4 rounded">
        <div className="h-[150px] overflow-hidden rounded">
          <img
            className="h-full w-full display-block object-cover"
            src={this.props.data.image}
            alt={this.props.data.name}
          />
        </div>
        <p className="text-center">{this.props.data.name}</p>
        <p className="text-center text-sm text-gray-500">
          {this.props.data.status} - {this.props.data.species}
        </p>
      </div>
    );
  }
}
export default Card;
