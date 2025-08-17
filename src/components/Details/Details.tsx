'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useOneCharacter } from '@/hooks/useOneCharacter/useOneCharacter';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { RefetchButton } from '@/components/RefetchButton/RefetchButton';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

export const Details = () => {
  const searchParams = useSearchParams();
  const detailsId = searchParams?.get('details');
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useOneCharacter(Number(detailsId));

  const handleClose = () => {
    if (!searchParams) return;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('details');
    router.replace(`?${newParams.toString()}`);
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
          <RefetchButton
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ['one-character'] });
            }}
          />
          <button
            className="btn-icon text-[1.5rem] absolute top-0 right-0"
            onClick={handleClose}
          >
            <IoMdCloseCircleOutline />
          </button>

          <div className="pt-2 flex flex-col items-start justify-start gap-4 text-start">
            <div className="self-center">{data.name}</div>
            <Image
              src={data.image}
              alt={data.name}
              width={250}
              height={250}
              className="object-cover rounded"
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
