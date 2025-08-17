'use client';
import Image from 'next/image';
type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
const ErrorPage = ({ error, reset }: ErrorPageProps) => (
  <div className="container light-theme">
    <div className="background"></div>
    <section className="section flex flex-col items-center justify-center gap-4">
      <h1 className="h-[100px] flex items-center justify-center">
        <Image
          src="/images/rick-and-morty-image.png"
          alt="rick and morty"
          width={300}
          height={100}
        />
      </h1>
      <h2 className="text-3xl text-black">Something went wrong!</h2>
      <p className="text-lg text-gray-700">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button className="btn" onClick={() => reset()}>
        Fix it!
      </button>
    </section>
  </div>
);
export default ErrorPage;
