import { useSearchParams } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useOneCharacter } from '@/hooks/useOneCharacter/useOneCharacter';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { RefetchButton } from '@/components/RefetchButton/RefetchButton';
import { useQueryClient } from '@tanstack/react-query';

export const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const queryClient = useQueryClient();

  const { data, isLoading, error, isFetching, refetch } = useOneCharacter(
    Number(detailsId)
  );

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
      {(isLoading || isFetching) && <Loader />}
      {error && !(isLoading || isFetching) && <ErrorMessage />}

      {data && !isLoading && !error && !isFetching && (
        <>
          <RefetchButton
            onClick={() => {
              queryClient.removeQueries({ queryKey: ['one-character'] });
              refetch();
            }}
          />
          <button
            className="btn-icon  text-[1.5rem] absolute top-0 right-0"
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
      {!data && !(isLoading || isFetching) && !error && (
        <h2 className="text-center text-gray-400">
          No details for this character
        </h2>
      )}
    </aside>
  );
};
