import { Badge } from "react-bootstrap";

const Fandom = ({ fandom }) => {
  return (
    <Badge className="mr-1" variant="primary">{fandom}</Badge>
  );
};

export default Fandom;