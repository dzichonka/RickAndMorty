import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

class Search extends Component {
  state = {
    search: localStorage.getItem('lastSearch') || '',
  };

  handleSearch = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (this.state.search.trim()) {
      localStorage.setItem('lastSearch', this.state.search.trim());
    }
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
            className="w-full px-2 py-1 border border-violet-500 rounded
            focus:outline-none focus:ring-violet-200 focus:ring"
          />
        </label>
        <button className="btn-icon" onClick={this.handleSearch}>
          <BsSearch />
        </button>
      </div>
    );
  }
}
export default Search;
