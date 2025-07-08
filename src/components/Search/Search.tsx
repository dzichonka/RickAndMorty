import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

type Props = {
  onSearch: (search: string) => void;
};

class Search extends Component<Props> {
  state = {
    search: localStorage.getItem('lastSearch') || '',
  };

  handleSearch = (): void => {
    localStorage.setItem('lastSearch', this.state.search.trim());
    this.props.onSearch(this.state.search.trim());
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSearch();
    }
  };
  handleClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    this.handleSearch();
  };

  render() {
    return (
      <div className="section flex flex-row items-center justify-center">
        <label className="label" htmlFor="search">
          <input
            type="text"
            id="search"
            value={this.state.search}
            onChange={(event) => this.setState({ search: event.target.value })}
            onKeyDown={this.handleKeyDown}
            className="w-full px-2 py-1 border border-cyan-300 bg-black rounded
              focus:outline-none focus:ring-lime-400 focus:ring"
          />
        </label>
        <button className="btn-icon" onClick={this.handleClick}>
          <BsSearch />
        </button>
      </div>
    );
  }
}
export default Search;
