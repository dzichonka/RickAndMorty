import type { ICharacter } from '@/types/api-types';
import { Component } from 'react';

type CardProps = { data: ICharacter };
class Card extends Component<CardProps> {
  render() {
    const { image, name, status, species } = this.props.data;
    return (
      <div
        className="flex flex-col items-center justify-start gap-3 bg-black/65 w-[200px] h-[250px] p-4 rounded
      hover:bg-black/100 hover:scale-101 transition-all duration-300"
      >
        <div className="h-[150px] overflow-hidden rounded">
          <img
            className="h-full w-full display-block object-cover"
            src={image}
            alt={name}
          />
        </div>
        <p className="text-center">{name}</p>
        <p className="text-center text-sm text-gray-500">
          {status} - {species}
        </p>
      </div>
    );
  }
}
export default Card;
