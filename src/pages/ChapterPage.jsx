import { useState, useEffect, useCallback } from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useLastUpdate from "../hooks/useLastUpdate";
import useShowModal from "../hooks/useShowModal";

import { getChapter, updateChapter, deleteChapter, toggleChapterLike } from "../actions/chapters";

import ChapterCard from "../components/ChapterCard";
import ChapterForm from "../components/ChapterForm";
import Pagination from "../components/Pagination";
import Notice from "../components/Notice";

const ChapterPage = ({ fanficId, chapterId, chaptersLength, onChapterChange }) => {
  const { chapterNumber } = useParams();
  const chapter = useSelector(state => state.chapters.find(chapter => chapter.data?._id === chapterId));
  const lastUpdate = useLastUpdate("chapter", chapter?.data?._id);
  const [mode, setMode] = useState("read");
  const [showEditForm, onShowEditForm, onHideEditForm] = useShowModal();
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    onChapterChange(chapterNumber - 1);
  }, [onChapterChange, chapterNumber]);

  useEffect(() => {
    if (chapterId && (!chapter || (chapter.status === "success" && lastUpdate && chapter.data.lastUpdate !== lastUpdate))) {
      dispatch(getChapter(chapterId), { shouldHandleLoadingState: true, process: chapterId });
    }
  }, [dispatch, chapterId, chapter, lastUpdate]);

  const handleToggleMode = () => {
    setMode(mode === "read" ? "edit" : "read");
  };

  const handleUpdateChapter = update => {
    dispatch(updateChapter(fanficId, chapterId, update), { shouldHandleLoadingState: true, process: chapterId });
    onHideEditForm();
  };

  const handleDeleteChapter = useCallback(() => {
    dispatch(deleteChapter(fanficId, chapterId), { shouldHandleLoadingState: true, process: chapterId });
  }, [dispatch, fanficId, chapterId]);

  const handleLikeClick = useCallback(() => {
    dispatch(toggleChapterLike(chapterId, chapter.isLiked), { shouldHandleLoadingState: true, process: chapterId });
  }, [dispatch, chapterId, chapter?.isLiked]);

  const handlePrevChapter = () => {
    history.push(path.replace(/:fanficId/, fanficId).replace(/:chapterNumber/, +chapterNumber - 1));
  };

  const handleNextChapter = () => {
    history.push(path.replace(/:fanficId/, fanficId).replace(/:chapterNumber/, +chapterNumber + 1));
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
        <Pagination
          prevDisabled={+chapterNumber === 1}
          nextDisabled={+chapterNumber === chaptersLength}
          onPrevClick={handlePrevChapter}
          onNextClick={handleNextChapter}
        />
      </>
    ) : (
      <Notice message={chapter.message} type="danger" />
    )
  );
};

export default ChapterPage;