import ThemeContext from '@/contexts/theme/ThemeContext';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${theme === 'dark' ? 'light-theme' : 'dark-theme'} container`}
    >
      <Header />
      <div className="background" data-testid="background"></div>
      <main className="section">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
