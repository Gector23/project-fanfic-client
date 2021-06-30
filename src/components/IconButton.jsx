import { Button } from "react-bootstrap";

const IconButton = ({ icon, type = "primary", onClick, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="d-flex justify-content-center align-items-center p-2 ml-1"
      variant={type}
    >
      {icon}
    </Button>
  );
};

export default IconButton;