import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ pages, action, limitPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [visiblePages, setVisiblePages] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.has("page") ? +searchParams.get("page") : 1;
    setCurrentPage(page);
    setVisiblePages(updateVisiblePages(limitPerPage, pages));
  }, [searchParams]);

  const updateVisiblePages = (itemsPerPage, pages) => {
    let startPage;
    if (currentPage <= Math.floor(itemsPerPage / 2) + 1) {
      startPage = 1;
    } else if (currentPage >= pages - Math.floor(itemsPerPage / 2)) {
      startPage = pages - itemsPerPage + 1;
    } else {
      startPage = currentPage - Math.floor(itemsPerPage / 2);
    }
    const endPage = Math.min(pages, startPage + itemsPerPage - 1);
    const newVisiblePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
    return newVisiblePages;
  };

  const handleChangingPage = (page) => {
    if (page != currentPage) {
      setSearchParams({ page });
      action(page);
    }
    return;
  };

  return (
    <nav className="pagination">
      {visiblePages && (
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => handleChangingPage(Math.max(1, currentPage - 1))}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
          </li>
          {visiblePages.map((page) => {
            if (page === currentPage) {
              return (
                <li key={page}>
                  <button
                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    onClick={() => handleChangingPage(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            }
            return (
              <li key={page}>
                <button
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handleChangingPage(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() =>
                handleChangingPage(Math.min(pages, currentPage + 1))
              }
              disabled={currentPage === pages}
            >
              {">"}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Pagination;
