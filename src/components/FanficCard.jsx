import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { ReactComponent as EditIcon } from "../icons/pen.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash.svg";

import IconButton from "./IconButton";
import Tag from "./Tag";

const FanficCard = ({ fanficData, onShowEditForm, onDeleteFanfic }) => {
  return (
    <Card className="mb-5">
      <Card.Header>
        <div className="d-flex justify-content-end">
          <IconButton icon={<EditIcon />} onClick={onShowEditForm} />
          <IconButton icon={<DeleteIcon />} type="danger" onClick={onDeleteFanfic} />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{fanficData.name}</Card.Title>
        <Card.Text>{fanficData.description}</Card.Text>
        <div>{fanficData.tags.map(tag => <Tag key={tag._id} value={tag.value} />)}</div>
      </Card.Body>
      <Card.Footer className="d-flex flex-column flex-sm-row justify-content-between">
        <span>
          Last update: {new Date(fanficData.lastUpdate).toLocaleString()}
        </span>
        <span>
          Author: <Link to={`/profile/${fanficData.user._id}`} >{fanficData.user.login}</Link>
        </span>
      </Card.Footer>
    </Card>
  );
};

export default FanficCard;