import { Badge } from "react-bootstrap";

const Tag = ({ value }) => {
  return (
    <Badge variant="info">#{value}</Badge>
  );
};

export default Tag;