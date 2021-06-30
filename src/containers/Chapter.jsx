import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getChapter, updateChapter, deleteChapter } from "../actions/chapters";

import ChapterCard from "../components/ChapterCard";
import ChapterForm from "../components/ChapterForm";
import Notice from "../components/Notice";

const Chapter = ({ fanficId, chapterId, onChapterChange }) => {
  const { chapterNumber } = useParams();

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
          onShowEditForm={handleShowEditForm}
          mode={mode}
          onToggleMode={handleToggleMode}
          onUpdateChapter={handleUpdateChapter}
          onDeleteChapter={handleDeleteChapter}
          />  
      </>
    ) : (
      <Notice heading="Something went wrong" message={chapter.message} type="danger" />
    )
  );
};

export default Chapter;