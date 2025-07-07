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

  handleSearch = async (search: string): Promise<void> => {
    this.setState({ loading: true, error: null });
    try {
      const response = await this.characterService.getAllCharacters();
      const filteredData = response.results.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );
      this.setState({ data: filteredData });
      console.log('Filtered Characters:', filteredData);
    } catch {
      this.setState({ error: 'Failed to fetch characters' });
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <div className="section relative">
        <h1 className="h-[100px] flex items-center justify-center">
          <img
            className="h-[100px]"
            src="./images/rick-and-morty-title.png"
            alt="rick and morty"
          />
        </h1>
        <Search onSearch={this.handleSearch} />
        {this.state.loading && <Loader />}
        {this.state.error && <div>{this.state.error}</div>}
        {this.state.data && <Result data={this.state.data} />}

        <ErrorButton />
      </div>
    );
  }
}
export default MainPage;
