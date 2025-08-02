import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchProps = {
  onSearch: (search: string) => void;
};
const Search = ({ onSearch }: SearchProps) => {
  const [LS, setLS] = useLocalStorage<string>('lastSearch', '');
  const [search, setSearch] = useState(LS || '');

  const LSValue = localStorage.getItem('lastSearch');

  const handleSearch = (event: React.FormEvent): void => {
    event?.preventDefault();
    setLS(search.trim());
    onSearch(search.trim());
  };
  useEffect(() => {
    setSearch(LSValue || '');
  }, [LSValue]);

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
          placeholder="Search..."
        />
      </label>
      <button className="btn-icon" type="submit">
        <BsSearch />
      </button>
    </form>
  );
};
export default Search;
