'use client';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
  const t = useTranslations('search');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    const paramSearch = searchParams ? (searchParams.get('name') ?? '') : '';
    setSearch(lastSearch || paramSearch);
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent): void => {
    event?.preventDefault();
    const value = search.trim();
    localStorage.setItem('lastSearch', value);
    router.push(`/?name=${encodeURIComponent(value)}&page=1`);
  };

  return (
    <form
      className="flex flex-row items-center justify-center gap-2 relative z-10"
      onSubmit={handleSearch}
    >
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full px-2 py-1 border border-[var(--main-color)] bg-[var(--bg-color)] rounded
              focus:outline-none focus:ring-[var(--main-color)] focus:ring"
          placeholder={t('search')}
        />
      </label>
      <button className="btn-icon" type="submit">
        <BsSearch />
      </button>
    </form>
  );
};
export default Search;
