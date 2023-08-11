import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './error-page';
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <MainPage /> },
          {
            path: 'admin',
            async lazy() {
              let { AdminPage } = await import('./pages/AdminPage');
              return {
                Component: AdminPage,
              };
            },
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
            path: 'add',
            async lazy() {
              let { NewProductPage } = await import('./pages/NewProductPage');
              return {
                Component: NewProductPage,
              };
            },
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
