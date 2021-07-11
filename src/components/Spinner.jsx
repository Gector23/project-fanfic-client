import { useSelector } from "react-redux";
import { Spinner as BSSpinner } from "react-bootstrap";

const Spinner = () => {
  const isLoading = useSelector(state => state.loading.status);

  return (
    isLoading && (
      <div className="overlay text-center pt-5">
        <BSSpinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </BSSpinner>
      </div>
    )
  );
};

export default Spinner;