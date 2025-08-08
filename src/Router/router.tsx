import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '@/components/App/App';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';
import { Details } from '@/components/Details/Details';
import Loader from '@/components/Loader/Loader';

const MainPage = lazy(() => import('@/pages/MainPage/MainPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: (
          <Suspense fallback={<Loader />}>
            <MainPage />
          </Suspense>
        ),
        children: [
          {
            path: '/',
            element: <Details />,
          },
        ],
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Loader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
