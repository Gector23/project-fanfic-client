import { useState } from "react";
import { useRouteMatch, useParams, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useFanficChapters from "../hooks/useFanficChapters";
import useShowModal from "../hooks/useShowModal";

import { moveChapter } from "../actions/fanfics";
import { createChapter } from "../actions/chapters";

import Fanfic from "../containers/Fanfic";
import ChaptersList from "../components/ChapersList";
import ChapterForm from "../components/ChapterForm";
import Chapter from "../containers/Chapter";

const FanficPage = () => {
  const { fanficId } = useParams();
  const { path } = useRouteMatch();
  const [activeChapter, setActiveChapter] = useState(null);
  const [showChapterForm, onShowChapterForm, onHideChapterForm] = useShowModal();
  const fanfic = useSelector(state => state.fanfics.find(fanfic => fanfic.data._id === fanficId));
  const fanficChapters = useFanficChapters(fanfic?.data?._id, fanfic?.status);
  const dispatch = useDispatch();

  const handleMoveChapter = (chapterId, number) => {
    dispatch(moveChapter(fanficId, chapterId, number));
  };

  const handleCreateChapter = chapterData => {
    dispatch(createChapter(chapterData, fanficId), { shouldHandleLoadingState: true });
    onHideChapterForm();
  };

  return (
    <div>
      <Fanfic fanficId={fanficId} />
      <ChaptersList
        chapters={fanficChapters}
        activeChapter={activeChapter}
        onMoveChapter={handleMoveChapter}
        onShowEditForm={onShowChapterForm}
      />
      <ChapterForm
        showEditForm={showChapterForm}
        onHideEditForm={onHideChapterForm}
        onSetChapter={handleCreateChapter}
      />
      <Switch>
        <Route path={`${path}/:chapterNumber`}>
          <Chapter
            fanficId={fanficId}
            chapterId={fanficChapters[activeChapter]?._id}
            chaptersLength={fanficChapters.length}
            onChapterChange={setActiveChapter}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default FanficPage;