import React from "react";
import { Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const QuizPagination = ({
  currentQuestion,
  TotalQuestions,
  handlePageChange,
}) => {
  const pageNumbers = Array.from({ length: TotalQuestions }, (_, i) => i + 1);
  return (
    <Col xl="4" lg="12">
      {/* <nav>
        <ul className="pagination">
          {pageNumbers.map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                pageNumber === currentQuestion ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav> */}
      <Pagination className="">
        {/* {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              pageNumber === currentPage ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))} */}
        <PaginationItem className="prev-item" disabled={currentQuestion == 0}>
          <PaginationLink
            // href="#"
            onClick={() => handlePageChange(currentQuestion - 1)}
          ></PaginationLink>
        </PaginationItem>
        {pageNumbers.map((pageNumber) => (
          <PaginationItem active={pageNumber - 1 == currentQuestion}>
            <PaginationLink
              // href="#"
              onClick={() => handlePageChange(pageNumber - 1)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem
          className="next-item"
          disabled={currentQuestion == TotalQuestions - 1}
        >
          <PaginationLink
            // href="#"
            onClick={() => handlePageChange(currentQuestion + 1)}
          ></PaginationLink>
        </PaginationItem>
      </Pagination>
    </Col>
  );
};

export default QuizPagination;
