"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 md:mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 md:px-4 py-2 md:py-2.5 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm font-medium hover:bg-peach-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[40px]"
      >
        Previous
      </button>
      
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors min-w-[40px] min-h-[40px] ${
              currentPage === page
                ? "bg-carrot text-white"
                : "bg-white text-slate-900 border border-border-light hover:bg-peach-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 md:px-4 py-2 md:py-2.5 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm font-medium hover:bg-peach-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[40px]"
      >
        Next
      </button>
    </div>
  );
}

