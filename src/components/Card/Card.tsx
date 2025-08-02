import type { ICharacter } from '@/types/api-types';

type CardProps = { data: ICharacter };

const Card = ({ data }: CardProps): React.JSX.Element => {
  const { image, name, status, species } = data;

  return (
    <div
      className="flex flex-col items-center justify-start gap-3 bg-[var(--bg-color)]/50 w-[200px] h-[250px] p-4 rounded
      hover:bg-[var(--bg-color)]/90 hover:scale-101 transition-all duration-300"
    >
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
