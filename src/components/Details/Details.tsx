import { characterService } from '@/services/CharacterServiece';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import type { ICharacter } from '@/types/api-types';
import { IoMdCloseCircleOutline } from 'react-icons/io';

export const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const [data, setData] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (detailsId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await characterService.getCharacter(Number(detailsId));
      setData(response);
    } catch {
      setError('Failed to fetch characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!detailsId) return;
    setLoading(true);
    getData(detailsId);
  }, [detailsId]);

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
      {loading && <Loader />}
      {error && !loading && (
        <div>
          <h2 className="text-gray-200 bg-black text-center text-2xl">
            {error}
          </h2>
        </div>
      )}
      {data && !loading && !error && (
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
      {!data && !loading && !error && (
        <h2 className="text-center text-gray-400">
          No details for this character
        </h2>
      )}
    </aside>
  );
};
