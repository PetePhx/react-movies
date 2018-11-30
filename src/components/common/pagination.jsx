import React from "react";
import propTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (isNaN(pagesCount) || isNaN(currentPage) || pagesCount === 1) return null;
  const pagesArr = new Array(pagesCount).fill(0).map((_, idx) => idx + 1);

  return (
    <nav>
      <ul className="pagination">
        {pagesArr.map(page => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p
                className="page-link text-dark"
                onClick={() => onPageChange(page)}
              >
                {page}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
};

export default Pagination;
