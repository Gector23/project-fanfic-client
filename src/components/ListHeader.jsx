import { ReactComponent as CreateIcon } from "../icons/plus-square.svg";

import IconButton from "./IconButton";

const ListHeader = ({ heading, onHeaderButtonClick }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h4 className="mb-0">{heading}</h4>
      {onHeaderButtonClick && <IconButton icon={<CreateIcon />} onClick={onHeaderButtonClick} />}
    </div>
  );
};

export default ListHeader;