import type { ICharacter } from '@/types/api-types';
import { useCardsStore } from '@/store/useCardsStore';
import { GrRadial } from 'react-icons/gr';
import { GrRadialSelected } from 'react-icons/gr';

type CardProps = { data: ICharacter };

const Card = ({ data }: CardProps): React.JSX.Element => {
  const { id, image, name, status, species } = data;

  const toggleItem = useCardsStore((state) => state.toggleItem);
  const isSelected = useCardsStore((state) => state.isSelected(id));

  return (
    <div
      className="relative z-10 flex flex-col items-center justify-start gap-3 bg-[var(--bg-color)]/50 w-[200px] h-[250px] p-4 rounded
      hover:bg-[var(--bg-color)]/90 transition-all duration-300"
    >
      <button
        onClick={() => toggleItem(data)}
        className="btn-icon absolute top-0 right-0"
      >
        {isSelected ? <GrRadialSelected /> : <GrRadial />}
      </button>
      <div className="h-[150px] overflow-hidden rounded">
        <img
          className="h-full w-full display-block object-cover"
          src={image}
          alt={name}
        />
      </div>
      <p className="text-center">{name}</p>
      <p className="text-center text-sm text-[var(--second-color)]">
        {status} - {species}
      </p>
    </div>
  );
};

export default Card;
