import { Spinner as BSSpinner } from "react-bootstrap";

const Spinner = () => {
  return (
    <BSSpinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </BSSpinner>
  );
};

export default Spinner;