import { Alert } from "react-bootstrap";

const Notice = ({ heading, message, link, type = "primary" }) => {
  return (
    <Alert variant={type}>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{message}</p>
      {link && (
        <>
          <hr />
          <div className="text-center">
            {link}
          </div>
        </>
      )}
    </Alert>
  );
};

export default Notice;