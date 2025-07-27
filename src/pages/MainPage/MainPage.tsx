import ErrorButton from '@/components/ErrorButton/ErrorButton';
import Loader from '@/components/Loader/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import Result from '@/components/Results/Result';
import Search from '@/components/Search/Search';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { characterService } from '@/services/CharacterServiece';
import type { IApiResponse, ICharacter } from '@/types/api-types';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const MainPage = () => {
  const [data, setData] = useState<IApiResponse<ICharacter> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const [LS, setLS] = useLocalStorage<string>('lastSearch', '');
  const name = searchParams.get('name') ?? LS;

  useEffect(() => {
    if (!searchParams.get('page')) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleSearch = async (
    search: string,
    pageNumber: number
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setLS(search);

    try {
      const response = await characterService.getAllCharacters(
        pageNumber,
        search.trim() ? { name: search } : undefined
      );
      setData(response);
    } catch {
      setError('Failed to fetch characters');
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = (search: string): void => {
    setSearchParams({ page: '1', name: search });
  };

  useEffect(() => {
    handleSearch(name, Number(page));
  }, [name, page]);

  return (
    <>
      <ErrorButton />
      <h1 className="section h-[100px] flex items-center justify-center">
        <img
          className="h-[100px]"
          src="./images/rick-and-morty-title.png"
          alt="rick and morty"
        />
      </h1>
      <Search onSearch={onSubmit} />
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
      {data && data.results.length > 0 && !loading && !error && (
        <>
          <Pagination info={data.info} />
          <Result data={data} />
          <Pagination info={data.info} />
        </>
      )}
      {data && data.results.length === 0 && !loading && !error && (
        <h2>Sorry, no characters found</h2>
      )}
      {!data && !loading && !error && (
        <h2 className="text-center text-gray-400">
          You can search for characters
        </h2>
      )}
    </>
  );
};

export default MainPage;
