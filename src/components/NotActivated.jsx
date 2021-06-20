import { Container, Row, Col } from "react-bootstrap";

const NotActivated = ({ userEmail }) => {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h4>Activate your account</h4>
          <p>
            {`To activate your account, follow the link sent to ${userEmail}`}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotActivated;