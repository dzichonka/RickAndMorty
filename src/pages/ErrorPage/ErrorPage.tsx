import RefreshButton from './RefreshButton';

export const ErrorPage = () => (
  <div className="section flex flex-col items-center justify-center gap-4">
    <h1>Something went wrong</h1>
    <p>Try refreshing the page.</p>
    <RefreshButton />
  </div>
);
