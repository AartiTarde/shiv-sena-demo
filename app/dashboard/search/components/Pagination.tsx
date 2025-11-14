"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Edge case: invalid totalPages or currentPage
  if (!totalPages || !currentPage || currentPage < 1) {
    return null;
  }

  // Ensure currentPage is within a valid range
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  // Limit page buttons displayed for better UX (show max 7 pages)
  const maxVisiblePages = 7;
  let startPage = Math.max(1, safeCurrentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-4 md:mt-6 mb-4" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(safeCurrentPage - 1)}
        disabled={safeCurrentPage === 1}
        className="pagination-nav-btn pagination-btn"
        aria-label="Go to previous page"
      >
        Previous
      </button>
      
      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="pagination-btn-base pagination-btn bg-white text-slate-900 border border-border-light hover:bg-peach-50"
            aria-label="Go to page 1"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 text-slate-500 text-xs md:text-sm">...</span>
          )}
        </>
      )}

      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-btn-base pagination-btn ${
              safeCurrentPage === page
                ? "bg-carrot text-white"
                : "bg-white text-slate-900 border border-border-light hover:bg-peach-50"
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={safeCurrentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-slate-500 text-xs md:text-sm">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="pagination-btn-base pagination-btn bg-white text-slate-900 border border-border-light hover:bg-peach-50"
            aria-label={`Go to page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => handlePageChange(safeCurrentPage + 1)}
        disabled={safeCurrentPage === totalPages}
        className="pagination-nav-btn pagination-btn"
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
}
