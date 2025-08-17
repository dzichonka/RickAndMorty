import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <html>
      <body>
        <h1 className="h-[100px] flex items-center justify-center">
          <Image
            src="/images/rick-and-morty-image.png"
            alt="rick and morty"
            width={300}
            height={100}
          />
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>404</p>
          <p>Page not found</p>
        </div>
      </body>
    </html>
  );
};

export default NotFoundPage;
