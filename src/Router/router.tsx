import { createBrowserRouter } from 'react-router-dom';
import App from '@/components/App/App';
import MainPage from '@/pages/MainPage/MainPage';
import AboutPage from '@/pages/AboutPage/AboutPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';
import { Details } from '@/components/Details/Details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainPage />,
        children: [
          {
            path: '/',
            element: <Details />,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
