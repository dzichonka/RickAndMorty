const NotFoundPage = () => {
  return (
    <>
      <h1 className="h-[100px] flex items-center justify-center">
        <img
          className="h-[100px]"
          src="./images/rick-and-morty-image.png"
          alt="rick and morty"
        />
      </h1>
      <div className="flex flex-col items-center justify-center">
        <p>404</p>
        <p>Page not found</p>
      </div>
    </>
  );
};

export default NotFoundPage;
