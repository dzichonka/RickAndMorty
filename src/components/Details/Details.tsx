import { useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useOneCharacter } from '@/hooks/useOneCharacter';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const { data, isLoading, error } = useOneCharacter(Number(detailsId));

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('details');
    setSearchParams(newParams);
  };

  return (
    <aside
      data-testid="details"
      className="relative min-w-[15rem] bg-[var(--bg-color)]/60 rounded p-4"
    >
      {isLoading && <Loader />}
      {error && !isLoading && <ErrorMessage />}
      {data && !isLoading && !error && (
        <>
          <button
            className="btn-icon absolute top-0 right-0"
            onClick={handleClose}
          >
            <IoMdCloseCircleOutline />
          </button>
          <div className="pt-2 flex flex-col items-start justify-start gap-4 text-start">
            <div className="self-center">{data.name}</div>
            <img
              className="h-full w-full display-block object-cover rounded"
              src={data.image}
              alt={data.name}
            />
            <div>location: {data.location.name}</div>
            <div>status: {data.status}</div>
            <div>species: {data.species}</div>
            <div>gender: {data.gender}</div>
            <div>origin: {data.origin.name}</div>
          </div>
        </>
      )}
      {!data && !isLoading && !error && (
        <h2 className="text-center text-gray-400">
          No details for this character
        </h2>
      )}
    </aside>
  );
};
