import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchProps = {
  onSearch: (search: string) => void;
};
type SearchState = {
  search: string;
};

class Search extends Component<SearchProps> {
  state: SearchState = {
    search: localStorage.getItem('lastSearch') || '',
  };

  handleSearch = (event: React.FormEvent): void => {
    event?.preventDefault();
    localStorage.setItem('lastSearch', this.state.search.trim());
    this.props.onSearch(this.state.search.trim());
  };
  render() {
    return (
      <form
        className="section flex flex-row items-center justify-center"
        onSubmit={this.handleSearch}
      >
        <label className="label" htmlFor="search">
          <input
            type="text"
            id="search"
            value={this.state.search}
            onChange={(event) => this.setState({ search: event.target.value })}
            className="w-full px-2 py-1 border border-cyan-300 bg-black rounded
              focus:outline-none focus:ring-lime-400 focus:ring"
          />
        </label>
        <button className="btn-icon" type="submit">
          <BsSearch />
        </button>
      </form>
    );
  }
}
export default Search;
