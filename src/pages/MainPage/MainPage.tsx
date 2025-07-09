import ErrorButton from '@/components/ErrorButton/ErrorButton';
import Loader from '@/components/Loader/Loader';
import Result from '@/components/Results/Result';
import Search from '@/components/Search/Search';
import CharacterService from '@/services/CharacterServiece';
import { Component } from 'react';

class MainPage extends Component {
  state = {
    data: null,
    loading: false,
    error: null,
  };

  characterService = new CharacterService();

  componentDidMount() {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    this.handleSearch(lastSearch);
  }

  handleSearch = async (search: string): Promise<void> => {
    this.setState({ loading: true, error: null });
    try {
      const response = await this.characterService.getAllCharacters(
        1,
        search.trim() ? { name: search } : undefined
      );
      this.setState({ data: response.results });
    } catch {
      this.setState({ error: 'Failed to fetch characters' });
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <>
        <div className="background"></div>
        <div className="section">
          <h1 className="h-[100px] flex items-center justify-center">
            <img
              className="h-[100px]"
              src="./images/rick-and-morty-title.png"
              alt="rick and morty"
            />
          </h1>
          <Search onSearch={this.handleSearch} />
          {this.state.loading && <Loader />}
          {this.state.error && !this.state.loading && (
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
                {this.state.error}
              </h2>
            </div>
          )}
          {this.state.data && !this.state.loading && !this.state.error && (
            <Result data={this.state.data} />
          )}
          <ErrorButton />
        </div>
      </>
    );
  }
}
export default MainPage;
