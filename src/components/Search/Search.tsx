import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchProps = {
  onSearch: (search: string) => void;
};
const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState(
    localStorage.getItem('lastSearch') || ''
  );

  const handleSearch = (event: React.FormEvent): void => {
    event?.preventDefault();
    localStorage.setItem('lastSearch', search.trim());
    onSearch(search.trim());
  };

  return (
    <form
      className="section flex flex-row items-center justify-center"
      onSubmit={handleSearch}
    >
      <label className="label" htmlFor="search">
        <input
          type="text"
          id="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full px-2 py-1 border border-cyan-300 bg-black rounded
              focus:outline-none focus:ring-lime-400 focus:ring"
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
