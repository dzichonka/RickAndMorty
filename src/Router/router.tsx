import { createBrowserRouter } from 'react-router-dom';
import App from '@/components/App/App';
import MainPage from '@/pages/MainPage/MainPage';
import AboutPage from '@/pages/AboutPage/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);
