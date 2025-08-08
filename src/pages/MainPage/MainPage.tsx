import Loader from '@/components/Loader/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import Result from '@/components/Results/Result';
import Search from '@/components/Search/Search';
import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import s from './MainPage.module.scss';
import { SelectedItems } from '@/components/SelectedItems/SelectedItems';
import { useCharacters } from '@/hooks/useCharacters';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const name =
    searchParams.get('name') ?? localStorage.getItem('lastSearch') ?? '';

  const { data, isLoading, error } = useCharacters(Number(page), name);

  useEffect(() => {
    if (!searchParams.get('page')) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const onSubmit = (search: string): void => {
    localStorage.setItem('lastSearch', search);
    setSearchParams({ page: '1', name: search });
  };

  useEffect(() => {
    if (!searchParams.get('page')) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <SelectedItems />
      <h1 className="h-[100px] flex items-center justify-center">
        <img
          className="h-[100px]"
          src="./images/rick-and-morty-title.png"
          alt="rick and morty"
        />
      </h1>
      <Search onSearch={onSubmit} />
      {isLoading && <Loader />}
      {error && !isLoading && <ErrorMessage />}
      {data && data.results.length > 0 && !isLoading && !error && (
        <div className={`flex flex-row gap-4 py-4 ${s.result}`}>
          <div
            data-testid="right"
            className="flex flex-col gap-4 items-center justify-center"
          >
            <Pagination info={data.info} />
            <Result data={data} />
            <Pagination info={data.info} />
          </div>
          {searchParams.get('details') && <Outlet />}
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

export default MainPage;
