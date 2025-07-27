import { createBrowserRouter } from 'react-router-dom';
import App from '@/components/App/App';
import MainPage from '@/pages/MainPage/MainPage';
import AboutPage from '@/pages/AboutPage/AboutPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
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
