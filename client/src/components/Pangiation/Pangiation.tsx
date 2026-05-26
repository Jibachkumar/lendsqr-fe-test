import "./Pangiation.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (n: number) => void;
}

const PER_PAGE_OPTIONS = [10, 20, 50, 100];

const getPages = (current: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  )
    pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
};

function Pangiation({
  currentPage,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  const pages = getPages(currentPage, totalPages);

  return (
    <div className="pagination">
      {/* left: Showing X out of Y */}
      <div className="pagination__left">
        Showing
        <div className="pagination__select-wrap">
          <select
            className="pagination__per-page-select"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            {PER_PAGE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <span className="pagination__select-arrow">▾</span>
        </div>
        out of {totalItems.toLocaleString()}
      </div>

      {/* right: page buttons */}
      <div className="pagination__right">
        <button
          className="pagination__nav-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ‹
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e-${i}`} className="pagination__ellipsis">
              ...
            </span>
          ) : (
            <button
              key={p}
              className={`pagination__page-btn${p === currentPage ? " pagination__page-btn--active" : ""}`}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}

        <button
          className="pagination__nav-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Pangiation;
