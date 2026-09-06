type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-1">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 disabled:opacity-40 disabled:hover:bg-neutral-100 transition-colors"
      >
        ‹ Oldingi
      </button>
      <span className="text-sm text-neutral-500">
        {page}-sahifa / {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 disabled:opacity-40 disabled:hover:bg-neutral-100 transition-colors"
      >
        Keyingi ›
      </button>
    </div>
  );
};
