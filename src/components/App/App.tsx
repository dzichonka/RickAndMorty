import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav className="bg-black/70">
        <Link className="link" to="/">
          Main
        </Link>{' '}
        |{' '}
        <Link className="link" to="/about">
          About
        </Link>
      </nav>
      <div className="background" data-testid="background"></div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
