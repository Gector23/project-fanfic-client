import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { ReactComponent as EditIcon } from "../icons/pen.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash.svg";

import Rate from "./Rate";
import IconButton from "./IconButton";
import Tag from "./Tag";

const FanficCard = ({ fanficData, userRate, onShowEditForm, onDeleteFanfic, onRate }) => {
  return (
    <Card className="mb-5">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>
          Author: <Link to={`/profile/${fanficData.user._id}`} >{fanficData.user.login}</Link>
        </span>
        <div className="d-flex">
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
        <div className="d-flex text-primary">
          <span className="mr-1">Rating: {fanficData.rating} on {fanficData.ratesCount} user ratings</span>
          <Rate userRate={userRate} onRate={onRate} />
        </div>
      </Card.Footer>
    </Card>
  );
};

export default FanficCard;