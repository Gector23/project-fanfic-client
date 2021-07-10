import { Pagination as PaginationBS } from "react-bootstrap";

const Pagination = ({ prevDisabled, nextDisabled, onPrevClick, onNextClick }) => {
  return (
    <PaginationBS className="d-flex justify-content-between">
      <PaginationBS.Prev disabled={prevDisabled} onClick={onPrevClick} />
      <PaginationBS.Next disabled={nextDisabled} onClick={onNextClick} />
    </PaginationBS>
  );
};

export default Pagination;