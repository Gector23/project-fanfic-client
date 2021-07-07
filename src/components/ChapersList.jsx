import { useRouteMatch, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

import { ReactComponent as UpIcon } from "../icons/arrow-up.svg";
import { ReactComponent as DownIcon } from "../icons/arrow-down.svg";

import ListHeader from "./ListHeader";
import Notice from "./Notice";
import IconButton from "./IconButton";

const ChaptersList = ({ chapters, activeChapter, onMoveChapter, onShowEditForm }) => {
  const { url } = useRouteMatch();

  return (
    <>
      <ListHeader heading="Fanfic chapters" onHeaderButtonClick={onShowEditForm} />
      {
        chapters.length ? (
          <ListGroup className="mb-5">
            {chapters.map((chapter, i) => {
              const active = i === activeChapter;
              return (
                <ListGroup.Item
                  key={chapter._id}
                  active={active}
                  className="d-flex justify-content-between align-items-center px-2 py-1">
                  <Link className={active ? "text-white" : ""} to={`${url}/${i + 1}`}>{chapter.name}</Link>
                  <div className="d-flex">
                    <IconButton
                      icon={<DownIcon />}
                      type={active ? "light" : "primary"}
                      disabled={i + 1 === chapters.length}
                      onClick={() => onMoveChapter(chapter._id, i + 2)}
                    />
                    <IconButton
                      icon={<UpIcon />}
                      type={active ? "light" : "primary"}
                      disabled={i === 0}
                      onClick={() => onMoveChapter(chapter._id, i)}
                    />
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        ) : (
          <Notice heading="Chapters not found" message="This fanfic does not have any chapters yet" />
        )
      }
    </>
  );
};

export default ChaptersList;