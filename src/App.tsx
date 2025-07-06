import Search from './components/Search/Search';
import ErrorButton from './shared/ErrorBoundary/ErrorButton';

function App() {
  return (
    <>
      <h1 className="section text-center">Rick and Morty</h1>
      <Search />
      <ErrorButton />
    </>
  );
}

export default App;
