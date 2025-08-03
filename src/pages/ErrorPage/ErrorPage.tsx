import RefreshButton from '@/components/RefreshButton/RefreshButton';
export const ErrorPage = () => (
  <div className="container light-theme">
    <div className="background"></div>
    <section className="section flex flex-col items-center justify-center gap-4">
      <h1 className="h-[100px] flex items-center justify-center">
        <img
          className="h-[100px]"
          src="./images/rick-and-morty-image.png"
          alt="rick and morty"
        />
      </h1>
      <h1 className="text-3xl text-black">Error Boundary caught an error</h1>
      <RefreshButton />
    </section>
  </div>
);
