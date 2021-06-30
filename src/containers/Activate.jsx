import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { activate } from "../actions/auth";

import Notice from "../components/Notice";

const Activate = () => {
  const activationLink = useLocation().search.match(/[^=]*$/)[0];
  const activation = useSelector(state => state.processes.activation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activate(activationLink), { shouldHandleLoadingState: true });
  }, [activationLink, dispatch]);

  return (
    !activation ? null : activation.status === "success" ? (
      <Notice
        heading="Thank You!"
        message={activation.message}
        type="success"
        link={<Link className="btn btn-link" to="../sign-in" replace >Head to sign in</Link>} />
    ) : (
      <Notice heading="Something went wrong" message={activation.message} type="danger" />
    )
  );
};

export default Activate;