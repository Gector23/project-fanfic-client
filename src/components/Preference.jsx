import { Button } from "react-bootstrap";

const Prefernce = ({ fandomId, fandomName, selected, onTogglePreference }) => {
  const variant = selected ? "primary" : "outline-primary";

  return (
      <Button className="mb-2" variant={variant} onClick={() => onTogglePreference(fandomId)} >{fandomName}</Button>
  );
};

export default Prefernce;