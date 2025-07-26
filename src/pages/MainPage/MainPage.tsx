import ErrorButton from '@/components/ErrorButton/ErrorButton';
import Loader from '@/components/Loader/Loader';
import Result from '@/components/Results/Result';
import Search from '@/components/Search/Search';
import { characterService } from '@/services/CharacterServiece';
import type { ICharacter } from '@/types/api-types';
import { useState, useEffect } from 'react';

const MainPage = () => {
  const [data, setData] = useState<ICharacter[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (search: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await characterService.getAllCharacters(
        1,
        search.trim() ? { name: search } : undefined
      );
      setData(response.results);
    } catch {
      setError('Failed to fetch characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    handleSearch(lastSearch);
  }, []);

  return (
    <>
      <h1 className="section h-[100px] flex items-center justify-center">
        <img
          className="h-[100px]"
          src="./images/rick-and-morty-title.png"
          alt="rick and morty"
        />
      </h1>
      <Search onSearch={handleSearch} />
      {loading && <Loader />}
      {error && !loading && (
        <div>
          <div>
            <h1 className="h-[100px] flex items-center justify-center">
              <img
                className="h-[100px]"
                src="./images/rick-and-morty-image.png"
                alt="rick and morty"
              />
            </h1>
          </div>
          <h2 className="text-gray-200 bg-black text-center text-2xl">
            {error}
          </h2>
        </div>
      )}
      {data && !loading && !error && <Result data={data} />}
      <ErrorButton />
      {/* </div> */}
    </>
  );
};

export default MainPage;
