import { useState, useEffect, useCallback } from "react";
import { useRouteMatch, useParams, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getFanfic, updateFanfic, deleteFanfic, moveChapter } from "../actions/fanfics";

import FanficCard from "../components/FanficCard";
import FanficForm from "../components/FanficForm";
import ChaptersList from "../components/ChapersList";
import Chapter from "./Chapter";
import Notice from "../components/Notice";

const Fanfic = () => {
  const { fanficId } = useParams();
  const { path, url, isExact } = useRouteMatch();

  const [activeChapter, setActiveChapter] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const dispatch = useDispatch();
  const fanfic = useSelector(state => state.fanfics.find(fanfic => {
    return fanfic.data?._id === fanficId;
  }));

  useEffect(() => {
    if (!fanfic || fanfic.status === "success") {
      dispatch(getFanfic(fanficId, fanfic?.data.lastUpdate), { shouldHandleLoadingState: true });
    }
  }, [dispatch, fanfic, fanficId]);

  useEffect(() => {
    if (isExact) {
      setActiveChapter(null);
    }
  }, [isExact]);

  const handleShowEditForm = useCallback(() => {
    setShowEditForm(true);
  }, []);

  const handleHideEditForm = useCallback(() => {
    setShowEditForm(false);
  }, []);

  const handleUpdateFanfic = update => {
    dispatch(updateFanfic(fanficId, update));
    setShowEditForm(false);
  };

  const handleDeleteFanfic = useCallback(() => {
    dispatch(deleteFanfic(fanficId));
  }, [dispatch, fanficId]);

  const handleMoveChapter = (chapterId, number) => {
    dispatch(moveChapter(fanficId, chapterId, number));
  };

  return (
    !fanfic || fanfic?.status === "fetch" ? null : fanfic.status === "success" ? (
      <>
        {isExact && (
            <>
              <FanficForm
                showEditForm={showEditForm}
                fanficData={fanfic.data}
                onHideEditForm={handleHideEditForm}
                onUpdateFanfic={handleUpdateFanfic}
              />
              <FanficCard fanficData={fanfic.data} onShowEditForm={handleShowEditForm} onDeleteFanfic={handleDeleteFanfic} />
              <ChaptersList
                chapters={fanfic.chapters}
                currentUrl={url}
                activeChapter={activeChapter}
                onMoveChapter={handleMoveChapter}
              />
            </>
          )}
        <Switch>
          <Route path={`${path}/:chapterNumber`}>
            <Chapter
              fanficId={fanficId}
              chapterId={fanfic.chapters[activeChapter]?._id}
              onChapterChange={setActiveChapter}
            />
          </Route>
        </Switch>
      </>
    ) : (
      <Notice heading="Something went wrong" message={fanfic.message} type="danger" />
    )
  );
};

export default Fanfic;