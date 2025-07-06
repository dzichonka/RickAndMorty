import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

class Search extends Component {
  state = {};
  render() {
    return (
      <div className="section flex flex-row items-center justify-center">
        <label className="label" htmlFor="search">
          <input
            type="text"
            id="search"
            className="w-full px-2 py-1 border border-violet-500 rounded
            focus:outline-none focus:ring-violet-200 focus:ring"
          />
        </label>
        <button className="btn-icon">
          <BsSearch />
        </button>
      </div>
    );
  }
}
export default Search;
