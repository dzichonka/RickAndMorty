import { characterService } from '@/services/CharacterServiece';
import { useEffect, useState, type JSX } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import type { ICharacter } from '@/types/api-types';

export const Details = (): JSX.Element => {
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
    <div data-testid="details" className="details">
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
          <div>
            <div className="">{data.name}</div>
          </div>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </>
      )}
      {!data && !loading && !error && (
        <h2 className="text-center text-gray-400">
          No details for this character
        </h2>
      )}
    </div>
  );
};
