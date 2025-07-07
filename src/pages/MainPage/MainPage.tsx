import Result from '@/components/Results/Result';
import Search from '@/components/Search/Search';
import CharacterService from '@/services/CharacterServiece';
import { Component } from 'react';

// type TServices = { loading: boolean; error: Error | null; data: T | null };
class MainPage extends Component {
  state = {
    loading: false,
    error: null,
    data: null,
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
      <div className="section">
        <h1 className="section text-center">Rick and Morty App</h1>
        <Search onSearch={this.handleSearch} />
        <Result />
      </div>
    );
  }
}
export default MainPage;
