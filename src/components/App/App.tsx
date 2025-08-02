import ThemeContext from '@/contexts/theme/ThemeContext';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GrPaint } from 'react-icons/gr';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} container`}
    >
      <header className="section flex flex-row items-center justify-between">
        <nav className="bg-[var(--bg-color)]/70 shadow-[0_0_20px_15px_var(--bg-color)]/70 rounded">
          <Link className="link" to="/">
            Main
          </Link>{' '}
          |{' '}
          <Link className="link" to="/about">
            About
          </Link>
        </nav>
        <button
          className="btn-icon !bg-[var(--bg-color)]/50 shadow-[0_0_25px_30px_var(--bg-color)]/50 rounded-full"
          onClick={toggleTheme}
        >
          <GrPaint />
        </button>
      </header>
      <div className="background" data-testid="background"></div>
      <main className="section">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
