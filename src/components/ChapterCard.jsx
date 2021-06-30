import { useState } from "react";
import { Card } from "react-bootstrap";

import { ReactComponent as EditIcon } from "../icons/pen.svg";
import { ReactComponent as ReadModeIcon } from "../icons/book.svg";
import { ReactComponent as EditModeIcon } from "../icons/pencil-square.svg";
import { ReactComponent as SaveIcon } from "../icons/cloud.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash.svg";

import ChapterRead from "./ChapterRead";
import ChapterEditor from "./ChapterEditor";
import IconButton from "./IconButton";

const ChapterCard = ({ chapterData, onShowEditForm, mode, onToggleMode, onUpdateChapter, onDeleteChapter }) => {
  const [editorValue, setEditorValue] = useState(chapterData.content);

  const handleUpdateContent = () => {
    onUpdateChapter({
      content: editorValue
    });
  };

  return (
    <Card className="mb-5">
      <Card.Header>
        <div className="d-flex justify-content-end">
          <IconButton icon={<EditIcon />} onClick={onShowEditForm} />
          <IconButton icon={mode === "read" ? <EditModeIcon /> : <ReadModeIcon />} onClick={onToggleMode} />
          <IconButton icon={<SaveIcon />} disabled={chapterData.content === editorValue} onClick={handleUpdateContent} />
          <IconButton icon={<DeleteIcon />} type="danger" onClick={onDeleteChapter} />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{chapterData.name}</Card.Title>
        <Card.Text as="div">
          {mode === "read" ? (
            <ChapterRead content={chapterData.content} />
          ) : (
            <ChapterEditor value={editorValue} onChange={setEditorValue} />
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer>Last update: {new Date(chapterData.lastUpdate).toLocaleString()}</Card.Footer>
    </Card>
  );
};

export default ChapterCard;