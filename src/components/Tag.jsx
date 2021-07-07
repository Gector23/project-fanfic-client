import { Badge } from "react-bootstrap";

const Tag = ({ value }) => {
  return (
    <Badge className="mr-1" variant="info">#{value}</Badge>
  );
};

export default Tag;