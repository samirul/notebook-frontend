import { Pagination } from 'react-bootstrap';

const PaginationButton = ({ totalPages, currentPage, onPageChange }) => {
  const page = currentPage;
  const setPage = onPageChange;

  const pageButtons = [];
  // max visible page buttons
  const maxPageButtons = 5;
  // number of pages on each side of current page
  const sidePages = 1;

  if (totalPages <= maxPageButtons + 2) {
    // Show all pages if total is small
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }
  } else {
    // Show first page
    pageButtons.push(
      <Pagination.Item key={1} active={page === 1} onClick={() => setPage(1)}>
        1
      </Pagination.Item>
    );

    // Left ellipsis
    if (page > sidePages + 2) {
      pageButtons.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    // Middle range
    const start = Math.max(2, page - sidePages);
    const end = Math.min(totalPages - 1, page + sidePages);

    for (let i = start; i <= end; i++) {
      pageButtons.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }

    // Right ellipsis
    if (page < totalPages - sidePages - 1) {
      pageButtons.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    // Last page
    pageButtons.push(
      <Pagination.Item
        key={totalPages}
        active={page === totalPages}
        onClick={() => setPage(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center flex-wrap mt-3">
      <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
      <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
      {pageButtons}
      <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages} />
      <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
    </Pagination>
  );
};

export default PaginationButton;
