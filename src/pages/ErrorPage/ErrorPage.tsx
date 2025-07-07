import RefreshButton from './RefreshButton';

export const ErrorPage = () => (
  <div className="section flex flex-col items-center justify-center gap-4">
    <h1 className="h-[100px] flex items-center justify-center">
      <img
        className="h-[100px]"
        src="./images/rick-and-morty-image.png"
        alt="rick and morty"
      />
    </h1>

    <RefreshButton />

    <h1 className="text-cyan-300">Something went wrong</h1>
    <p className="text-cyan-300">Try refreshing the page.</p>
  </div>
);
