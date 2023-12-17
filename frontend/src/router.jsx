import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';

import {
  actionUpdateUser,
  actionCreateNewUser,
  loaderGetAllUsers,
} from './actions/actionAdminPanel';
import {
  loaderGetCategoriesItem,
  actionCreateNewItemCategory,
  actionCreateNewProduct,
} from './actions/actionsNewProductPage';
import { actionSignIn } from './actions/actionsAuthPage';

const isAuthorized = async ({ request }) => {
  const path = new URL(request.url).pathname;
  const session = sessionStorage.getItem('authorized');

  if (session === null && path !== '/authorization') {
    const req = await fetch(import.meta.env.VITE_URL + '/api/authorization', {
      method: 'GET',
      signal: request.signal,
      mode: 'cors',
      credentials: 'include',
    });

    if (!req.ok) {
      const error = await req.text();
      throw new Response(error, {
        status: req.status,
        statusText: 'error',
      });
    }

    const { authorized } = await req.json();
    if (authorized) {
      sessionStorage.setItem('authorized', authorized);
    } else {
      return redirect('/authorization');
    }
    return null;
  }

  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: isAuthorized,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <MainPage /> },
          {
            path: '/authorization',
            action: actionSignIn,
            async lazy() {
              let { AuthPage } = await import('./pages/AuthPage');
              return {
                Component: AuthPage,
              };
            },
          },
          {
            path: 'admin-panel',
            loader: loaderGetAllUsers,
            async lazy() {
              let { AdminPage } = await import('./pages/AdminPage');
              return {
                Component: AdminPage,
              };
            },
            shouldRevalidate: () => {
              return false;
            },
            children: [
              {
                path: 'create-new-user',
                action: actionCreateNewUser,
              },
              { path: 'update-user', action: actionUpdateUser },
              { path: 'update-activestatus-user', action: actionUpdateUser },
            ],
          },
          {
            path: 'refresh',
            async lazy() {
              let { RefreshParsingPage } = await import(
                './pages/RefreshParsingPage'
              );
              return {
                Component: RefreshParsingPage,
              };
            },
          },
          {
            path: 'new-product',
            loader: loaderGetCategoriesItem,
            action: actionCreateNewProduct,
            async lazy() {
              let { NewProductPage } = await import('./pages/NewProductPage');
              return {
                Component: NewProductPage,
              };
            },
            children: [
              { path: 'new-category', action: actionCreateNewItemCategory },
            ],
          },
          {
            path: 'comments',
            async lazy() {
              let { CommentsPage } = await import('./pages/CommentsPage');
              return {
                Component: CommentsPage,
              };
            },
          },
          {
            path: 'settings',
            async lazy() {
              let { SettingPage } = await import('./pages/SettingPage');
              return {
                Component: SettingPage,
              };
            },
          },
          {
            path: 'upload',
            async lazy() {
              let { UploadFilePage } = await import('./pages/UploadFilePage');
              return {
                Component: UploadFilePage,
              };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
