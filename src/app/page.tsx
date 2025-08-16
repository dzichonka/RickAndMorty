import CharactersView from '@/components/CharactersView/CharactersView';
import Search from '@/components/Search/Search';
import { SelectedItems } from '@/components/SelectedItems/SelectedItems';

const HomePage = () => {
  return (
    <>
      <Search />
      <CharactersView />
      <SelectedItems />
    </>
  );
};

export default HomePage;
