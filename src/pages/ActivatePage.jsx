import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";

import useActivateUser from "../hooks/useActivateUser";

import Notice from "../components/Notice";

const ActivatePage = () => {
  const { activationLink } = queryString.parse(useLocation().search);
  const activation = useActivateUser(activationLink);

  return (
    activation.status === "fetch" ? null : activation.status === "success" ? (
      <Notice
        heading="Thank You!"
        message={activation.message}
        type="success"
        link={<Link className="btn btn-link" to="../" replace >Head to main</Link>} />
    ) : (
      <Notice message={activation.message} type="danger" />
    )
  );
};

export default ActivatePage;