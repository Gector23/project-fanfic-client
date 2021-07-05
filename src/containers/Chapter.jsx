import { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "react-bootstrap";

import { getChapter, updateChapter, deleteChapter, toggleChapterLike } from "../actions/chapters";

import ChapterCard from "../components/ChapterCard";
import ChapterForm from "../components/ChapterForm";
import Notice from "../components/Notice";

const Chapter = ({ fanficId, chapterId, currentUrl, chaptersLength, onChapterChange }) => {
  const { chapterNumber } = useParams();
  const history = useHistory();

  const [mode, setMode] = useState("read");
  const [showEditForm, setShowEditForm] = useState(false);

  const dispatch = useDispatch();
  const chapter = useSelector(state => state.chapters.find(chapter => {
    return chapter.data?._id === chapterId;
  }));

  useEffect(() => {
    onChapterChange(chapterNumber - 1);
  }, [onChapterChange, chapterNumber]);

  useEffect(() => {
    if (chapterId && (!chapter || chapter.status === "success")) {
      dispatch(getChapter(chapterId, chapter?.data.lastUpdate), { shouldHandleLoadingState: true });
    }
  }, [dispatch, chapter, chapterId]);

  const handleToggleMode = () => {
    setMode(mode === "read" ? "edit" : "read");
  };

  const handleShowEditForm = useCallback(() => {
    setShowEditForm(true);
  }, []);

  const handleHideEditForm = useCallback(() => {
    setShowEditForm(false);
  }, []);

  const handleUpdateChapter = update => {
    dispatch(updateChapter(fanficId, chapterId, update));
    setShowEditForm(false);
  };

  const handleDeleteChapter = useCallback(() => {
    dispatch(deleteChapter(fanficId, chapterId));
  }, [dispatch, fanficId, chapterId]);

  const handleLikeClick = useCallback(() => {
    dispatch(toggleChapterLike(chapterId, chapter.isLiked));
  }, [dispatch, chapterId, chapter?.isLiked]);

  const prevChapter = () => {
    history.push(`${currentUrl}/${+chapterNumber - 1}`);
  };

  const nextChapter = () => {
    history.push(`${currentUrl}/${+chapterNumber + 1}`);
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
          chapterData={chapter.data}
          onHideEditForm={handleHideEditForm}
          onUpdateChapter={handleUpdateChapter}
        />
        <ChapterCard
          chapterData={chapter.data}
          isLiked={chapter.isLiked}
          onShowEditForm={handleShowEditForm}
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
      <Notice heading="Something went wrong" message={chapter.message} type="danger" />
    )
  );
};

export default Chapter;