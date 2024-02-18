import Page1 from '@/pages/page1';
import Page2 from '@/pages/page2';
import Page3 from '@/pages/page3';
import Page4 from '@/pages/page4';
import Page5 from '@/pages/page5';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to={'/5'} />,
  },
  {
    path: '/1',
    element: <Page1 />,
  },
  {
    path: '/2',
    element: <Page2 />,
  },
  {
    path: '/3',
    element: <Page3 />,
  },
  {
    path: '/4',
    element: <Page4 />,
  },
  {
    path: '/5',
    element: <Page5 />,
  },
];

const Router = () => {
  const router = useRoutes(routes);
  return router;
};

export default Router;
