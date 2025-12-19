import CharactersView from '@/components/CharactersView/CharactersView';
import Loader from '@/components/Loader/Loader';
import Search from '@/components/Search/Search';
import { SelectedItems } from '@/components/SelectedItems/SelectedItems';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Search />
      <CharactersView />
      <SelectedItems />
    </Suspense>
  );
};

export default HomePage;
