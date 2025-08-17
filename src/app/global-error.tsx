'use client';

import ErrorPage from './error';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}
