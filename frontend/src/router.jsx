import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";

import authInterceptor, { actionSignIn } from "./middleware/authInterceptor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: authInterceptor,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: "admin-panel",
            async lazy() {
              let { AdminPage } = await import("./pages/AdminPage");
              return {
                Component: AdminPage,
              };
            },
          },
          // {
          //   path: "refresh",
          //   async lazy() {
          //     let { RefreshParsingPage } = await import(
          //       "./pages/RefreshParsingPage"
          //     );
          //     return {
          //       Component: RefreshParsingPage,
          //     };
          //   },
          // },
          {
            path: "new-product",
            async lazy() {
              let { NewProductPage } = await import("./pages/NewProductPage");
              return {
                Component: NewProductPage,
              };
            },
          },
          {
            path: "comments",
            async lazy() {
              let { CommentsPage } = await import("./pages/CommentsPage");
              return {
                Component: CommentsPage,
              };
            },
          },
          {
            path: "settings",
            async lazy() {
              let { SettingPage } = await import("./pages/SettingPage");
              return {
                Component: SettingPage,
              };
            },
          },
          {
            path: "upload",
            async lazy() {
              let { UploadFilePage } = await import("./pages/UploadFilePage");
              return {
                Component: UploadFilePage,
              };
            },
          },
        ],
      },
    ],
  },
  {
    path: "/authorization",
    action: actionSignIn,
    async lazy() {
      let { AuthPage } = await import("./pages/AuthPage");
      return {
        Component: AuthPage,
      };
    },
    errorElement: <ErrorPage />,
  },
]);

export default router;
