import React from "react";
import _ from "lodash";
import "../../styles/App.css";

interface PaginationInterface {
  itemsCount: number | null;
  pageSize: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationInterface> = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemsCount ? itemsCount / pageSize : 1);
  if (pageCount === 1) return null;
  const pages: number[] = _.range(1, pageCount + 1);
  return (
    <nav className="pagination-center">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : "")}
            key={"page_" + page}
          >
            <button
              className="btn btn-success"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
