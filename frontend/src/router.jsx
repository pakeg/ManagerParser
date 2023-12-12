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

import AuthPage from './pages/AuthPage';
const router = createBrowserRouter([
  {
    path: '/authorization',
    action: actionSignIn,
    element: <AuthPage />,
  },
]);

export default router;
