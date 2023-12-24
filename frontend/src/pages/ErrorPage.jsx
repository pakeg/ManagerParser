import { useRouteError, useLocation, NavLink } from "react-router-dom";

export default function ErrorPage() {
  let location = useLocation();
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1 className="mb-4 text-6xl font-semibold text-red-500">
        Oops! {error.status}
      </h1>
      <p className="mb-4 text-gray-600">
        {error.status >= 500 && "Sorry, an unexpected error has occurred."}
      </p>
      <p className="mb-4 text-lg text-gray-600">
        <i>
          {error.statusText}: {error.data?.msg ? error.data.msg : error.data}
        </i>
      </p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-gray-600">
        Let's get to{" "}
        {error.status == 404 ? (
          <NavLink to="/" className="text-blue-500">
            sdfg
          </NavLink>
        ) : (
          <NavLink
            to={error.data?.path ? error.data.path : location.pathname}
            className="text-blue-500"
          >
            link
          </NavLink>
        )}
        .
      </p>
    </div>
  );
}
