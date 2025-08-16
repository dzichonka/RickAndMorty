'use client';
import Loader from '@/components/Loader/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import Result from '@/components/Results/Result';
import { useEffect, useState } from 'react';
import { useCharacters } from '@/hooks/useCharacters/useCharacters';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { RefetchButton } from '@/components/RefetchButton/RefetchButton';
import { useQueryClient } from '@tanstack/react-query';
import { Details } from '../Details/Details';
import { useSearchParams, useRouter } from 'next/navigation';

const CharactersView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [lastSearch, setLastSearch] = useState('');
  useEffect(() => {
    setLastSearch(localStorage.getItem('lastSearch') ?? '');
  }, []);

  const page = searchParams?.get('page') ?? '1';
  const name = searchParams?.get('name') ?? lastSearch ?? '';

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useCharacters(Number(page), name);

  useEffect(() => {
    if (searchParams && !searchParams.get('page')) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('page', '1');
      router.replace(`/?${newParams.toString()}`);
    }
  }, [searchParams, router]);

  return (
    <>
      <h1 className="h-[100px] flex items-center justify-center">
        <img
          className="h-[100px]"
          src="./images/rick-and-morty-title.png"
          alt="rick and morty"
        />
      </h1>
      {isLoading && <Loader />}
      {error && !isLoading && <ErrorMessage />}
      {data && data.results.length > 0 && !isLoading && !error && (
        <div
          className={
            'flex flex-row gap-4 py-4 max-[460px]:flex-col-reverse max-[460px]:items-center'
          }
        >
          <div
            data-testid="right"
            className="flex flex-col gap-4 items-center justify-center"
          >
            <Pagination info={data.info} />
            <RefetchButton
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ['characters'] });
              }}
            />
            <Result data={data} />
            <Pagination info={data.info} />
          </div>
          {searchParams && searchParams.get('details') && <Details />}
        </div>
      )}
      {data && data.results.length === 0 && !isLoading && !error && (
        <h2>Sorry, no characters found</h2>
      )}
      {!data && !isLoading && !error && (
        <h2 className="text-center text-[var(--second-color)]/80">
          You can search for characters
        </h2>
      )}
    </>
  );
};

export default CharactersView;
