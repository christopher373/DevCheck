import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotebooksPage } from './pages/Notebooks.page';

const router = createBrowserRouter([
  {
    path: '/notebooks',
    element: <NotebooksPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
