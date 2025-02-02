'use client';

import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= maxVisiblePages) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      }
    }
    return pages;
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  const renderPageButton = (page: number | string, index: number) => {
    const isCurrentPage = page === currentPage;
    const isEllipsis = page === '...';

    if (isEllipsis) {
      return (
        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
          ...
        </span>
      );
    }

    return (
      <button
        key={`page-${page}`}
        onClick={() => handlePageChange(page)}
        className={`
          px-3 py-2 mx-1 rounded-md text-sm font-medium
          transition-colors duration-200
          ${isCurrentPage
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }
          border border-gray-300 dark:border-gray-600
        `}
        disabled={isCurrentPage}
      >
        {page}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center mt-8 gap-2">
      {/* First Page */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        title="First page"
      >
        <FiChevronsLeft />
      </button>

      {/* Previous Page */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous page"
      >
        <FiChevronLeft />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center">
        {getPageNumbers().map((page, index) => renderPageButton(page, index))}
      </div>

      {/* Next Page */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next page"
      >
        <FiChevronRight />
      </button>

      {/* Last Page */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Last page"
      >
        <FiChevronsRight />
      </button>
    </div>
  );
}
