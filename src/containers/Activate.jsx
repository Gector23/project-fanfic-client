import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import { activate } from "../actions/auth";

import Spinner from "../components/Spinner";

const Activate = () => {
  const activationLink = useLocation().search.match(/[^=]*$/)[0];
  const activation = useSelector(state => state.auth.processes.activation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activate(activationLink));
  }, [activationLink, dispatch]);

  return (
    !activation || activation.status === "fetch" ? (<Spinner />) : activation.status === "success" ? (
      <Container>
        <Row>
          <Col className="text-center">
            <h4>Thank You!</h4>
            <p>
              {activation.message}
            </p>
            <Link className="btn btn-link" to="../sign-in" replace >Head to sign in</Link>
          </Col>
        </Row>
      </Container>
    ) : (
      <Container>
        <Row>
          <Col className="text-center">
            <h4>Something went wrong</h4>
            <p>
              {activation.message}
            </p>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Activate;