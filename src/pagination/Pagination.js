// Pagination.js
import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Hardcoded for four pages

  const handlePageClick = (page) => {
    let newPage = page;

    // Ensure the page is within the valid range
    if (newPage < 1) {
      newPage = 1;
    } else if (newPage > totalPages) {
      newPage = 1; // Redirect to the first page after the last page
    }

    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(
        <a
          key={page}
          href="#"
          className={currentPage === page ? 'active page' : 'page'}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </a>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <a
        href="#"
        className="prev"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </a>

      {renderPageNumbers()}

      <a
        href="#"
        className="next"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </a>
    </div>
  );
};

export default Pagination;
