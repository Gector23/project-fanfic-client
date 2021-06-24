import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { activate } from "../actions/auth";

const Activate = () => {
  const activationLink = useLocation().search.match(/[^=]*$/)[0];
  const activation = useSelector(state => state.processes.activation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activate(activationLink), { shouldHandleLoadingState: true });
  }, [activationLink, dispatch]);

  return (
    !activation ? null : activation.status === "success" ? (
      <div className="text-center">
        <h4>Thank You!</h4>
        <p>
          {activation.message}
        </p>
        <Link className="btn btn-link" to="../sign-in" replace >Head to sign in</Link>
      </div>
    ) : (
      <div className="text-center">
        <h4>Something went wrong</h4>
        <p>
          {activation.message}
        </p>
      </div>
    )
  );
};

export default Activate;