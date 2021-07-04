import { useState } from "react";
import { Card } from "react-bootstrap";

import { ReactComponent as EditIcon } from "../icons/pen.svg";
import { ReactComponent as ReadModeIcon } from "../icons/book.svg";
import { ReactComponent as EditModeIcon } from "../icons/pencil-square.svg";
import { ReactComponent as SaveIcon } from "../icons/cloud.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash.svg";

import ChapterRead from "./ChapterRead";
import ChapterEditor from "./ChapterEditor";
import Like from "./Like";
import IconButton from "./IconButton";

const ChapterCard = (props) => {
  const [editorValue, setEditorValue] = useState(props.chapterData.content);

  const handleUpdateContent = () => {
    props.onUpdateChapter({
      content: editorValue
    });
  };

  return (
    <Card className="mb-5">
      <Card.Header>
        <div className="d-flex justify-content-end">
          <IconButton icon={<EditIcon />} onClick={props.onShowEditForm} />
          <IconButton icon={props.mode === "read" ? <EditModeIcon /> : <ReadModeIcon />} onClick={props.onToggleMode} />
          <IconButton
            icon={<SaveIcon />}
            disabled={props.chapterData.content === editorValue}
            onClick={handleUpdateContent}
          />
          <IconButton icon={<DeleteIcon />} type="danger" onClick={props.onDeleteChapter} />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.chapterData.name}</Card.Title>
        <Card.Text as="div">
          {props.mode === "read" ? (
            <ChapterRead content={props.chapterData.content} />
          ) : (
            <ChapterEditor value={editorValue} onChange={setEditorValue} />
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex flex-column flex-sm-row justify-content-between">
        <span>
          Last update: {new Date(props.chapterData.lastUpdate).toLocaleString()}
        </span>
        <div className="d-flex text-danger">
          <span className="mr-1">{props.chapterData.likesCount}</span>
          <Like isLiked={props.isLiked} onLikeClick={props.onLikeClick} />
        </div>

      </Card.Footer>
    </Card>
  );
};

export default ChapterCard;