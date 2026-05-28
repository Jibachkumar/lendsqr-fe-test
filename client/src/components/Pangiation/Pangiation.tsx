import "./Pangiation.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (n: number) => void;
}

const PER_PAGE_OPTIONS = [9, 20, 50, 100];

const getPages = (current: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [];

  pages.push(1, 2, 3);

  // Ellipsis after first 3 if needed
  if (current > 5) pages.push("...");

  // Middle pages (when current is far from start and end)
  if (current > 4 && current < total - 3) {
    pages.push(current - 1, current, current + 1);
    pages.push("...");
  } else if (current <= 4) {
    // Near start — no middle needed, just ellipsis before last 2
    pages.push("...");
  } else {
    // Near end
    pages.push("...");
  }

  // Always show last 2
  pages.push(total - 1, total);

  // Remove duplicates while preserving order
  return pages.filter((p, i, arr) => arr.indexOf(p) === i);
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
          <span className="pagination__select-arrow">˅</span>
        </div>
        out of {totalItems.toLocaleString()}
      </div>

      {/* right: page buttons */}
      <div className="pagination__right">
        <button
          className="pagination__nav-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ❮
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
        >
          ❯
        </button>
      </div>
    </div>
  );
}

export default Pangiation;
