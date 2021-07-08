import { useState, useEffect, useCallback } from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "react-bootstrap";

import useNeedUpdate from "../hooks/useNeedUpdate";
import useShowModal from "../hooks/useShowModal";

import { getChapter, updateChapter, deleteChapter, toggleChapterLike } from "../actions/chapters";

import ChapterCard from "../components/ChapterCard";
import ChapterForm from "../components/ChapterForm";
import Notice from "../components/Notice";

const ChapterPage = ({ fanficId, chapterId, chaptersLength, onChapterChange }) => {
  const { chapterNumber } = useParams();
  const chapter = useSelector(state => state.chapters.find(chapter => chapter.data?._id === chapterId));
  const needUpdate = useNeedUpdate("chapter", chapterId, chapter?.data?.lastUpdate);
  const [mode, setMode] = useState("read");
  const [showEditForm, onShowEditForm, onHideEditForm] = useShowModal();
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    onChapterChange(chapterNumber - 1);
  }, [onChapterChange, chapterNumber]);

  useEffect(() => {
    if ((!chapter || (chapter.status === "success" && needUpdate)) && chapterId) {
      dispatch(getChapter(chapterId), { shouldHandleLoadingState: true });
    }
  }, [dispatch, chapterId, chapter, needUpdate]);

  const handleToggleMode = () => {
    setMode(mode === "read" ? "edit" : "read");
  };

  const handleUpdateChapter = update => {
    dispatch(updateChapter(fanficId, chapterId, update));
    onHideEditForm();
  };

  const handleDeleteChapter = useCallback(() => {
    dispatch(deleteChapter(fanficId, chapterId));
  }, [dispatch, fanficId, chapterId]);

  const handleLikeClick = useCallback(() => {
    dispatch(toggleChapterLike(chapterId, chapter.isLiked));
  }, [dispatch, chapterId, chapter?.isLiked]);

  const prevChapter = () => {
    history.push(`${url}/${+chapterNumber - 1}`);
  };

  const nextChapter = () => {
    history.push(`${url}/${+chapterNumber + 1}`);
  };

  if (!chapterId) {
    return (
      <Notice heading="Something went wrong" message="Chapter not found." type="danger" />
    );
  }

  return (
    !chapter || chapter?.status === "fetch" ? null : chapter.status === "success" ? (
      <>
        <ChapterForm
          showEditForm={showEditForm}
          initialData={chapter.data}
          onHideEditForm={onHideEditForm}
          onSetChapter={handleUpdateChapter}
        />
        <ChapterCard
          chapterData={chapter.data}
          isLiked={chapter.isLiked}
          onShowEditForm={onShowEditForm}
          mode={mode}
          onToggleMode={handleToggleMode}
          onUpdateChapter={handleUpdateChapter}
          onDeleteChapter={handleDeleteChapter}
          onLikeClick={handleLikeClick}
        />
        <Pagination className="d-flex justify-content-between">
          <Pagination.Prev disabled={+chapterNumber === 1} onClick={prevChapter} />
          <Pagination.Next disabled={+chapterNumber === chaptersLength} onClick={nextChapter} />
        </Pagination>
      </>
    ) : (
      <Notice message={chapter.message} type="danger" />
    )
  );
};

export default ChapterPage;