import { useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import useNeedUpdate from "../hooks/useNeedUpdate";
import useShowModal from "../hooks/useShowModal";
import useRelation from "../hooks/useRelation";

import { getFanfic, updateFanfic, deleteFanfic, toggleFanficFavorite, setFanficRate } from "../actions/fanfics";

import { ReactComponent as EditIcon } from "../icons/pen.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash.svg";
import { ReactComponent as ReadModeIcon } from "../icons/book.svg";
import { ReactComponent as AddFavorireIcon } from "../icons/bookmark-heart-fill.svg";
import { ReactComponent as RemoveFavorireIcon } from "../icons/bookmark-x-fill.svg";

import FanficCard from "../components/FanficCard";
import FanficForm from "../components/FanficForm";
import IconButton from "../components/IconButton";
import Notice from "../components/Notice";

const Fanfic = ({ fanficId, profile, readIcon = true, controlIcons = false }) => {
  const [showFanficForm, onShowFanficForm, onHideFanficForm] = useShowModal();
  const fanfic = useSelector(state => state.fanfics.find(fanfic => fanfic.data._id === fanficId));
  const { isSignedIn, isOwner, hasAccess } = useRelation(fanfic?.data?.user?._id);
  const userId = useSelector(state => isSignedIn ? state.user.data._id : null);
  const needUpdate = useNeedUpdate("fanfic", fanficId, fanfic?.data?.lastUpdate);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fanfic || (fanfic.status === "success" && needUpdate)) {
      dispatch(getFanfic(fanficId));
    }
  }, [dispatch, fanficId, fanfic, needUpdate]);

  const handleUpdateFanfic = update => {
    dispatch(updateFanfic(fanficId, update, profile));
    onHideFanficForm();
  };

  const handleDeleteFanfic = useCallback(() => {
    dispatch(deleteFanfic(fanficId, profile));
  }, [dispatch, fanficId, profile]);

  const handleFavoriteClick = useCallback(() => {
    dispatch(toggleFanficFavorite(fanficId, fanfic.isFavorited, userId));
  }, [dispatch, fanficId, fanfic?.isFavorited, userId]);

  const handleRate = value => {
    dispatch(setFanficRate(fanficId, value, profile));
  };

  let fanficCardButtons = [];

  if (readIcon) {
    const readModeIcon = <IconButton
      key="readModeIcon"
      icon={<ReadModeIcon />}
      onClick={() => history.push(`/fanfic/${fanficId}`)}
    />;
    fanficCardButtons.push(readModeIcon);
  }

  if (hasAccess && controlIcons) {
    const editButton = <IconButton key="editIcon" icon={<EditIcon />} onClick={onShowFanficForm} />;
    const deleteButton = <IconButton
      key="deleteIcon"
      icon={<DeleteIcon />}
      type="danger"
      onClick={handleDeleteFanfic}
    />;
    fanficCardButtons.push(editButton, deleteButton);
  }

  if (isSignedIn && !isOwner) {
    const addFavorireIcon = <IconButton
      key="addFavorireIcon"
      icon={<AddFavorireIcon />}
      type="warning"
      onClick={handleFavoriteClick}
    />;
    const removeFavorireIcon = <IconButton
      key="removeFavorireIcon"
      icon={<RemoveFavorireIcon />}
      type="secondary"
      onClick={handleFavoriteClick}
    />;
    if (fanfic?.isFavorited) {
      fanficCardButtons.push(removeFavorireIcon);
    } else {
      fanficCardButtons.push(addFavorireIcon);
    }
  }

  return (
    !fanfic || fanfic?.status === "fetch" ? null : fanfic.status === "success" ? (
      <div>
        <FanficCard
          fanficData={fanfic.data}
          userRate={fanfic.userRate}
          buttons={fanficCardButtons}
          onRate={handleRate}
        />
        {showFanficForm && (
          <FanficForm
            initialData={fanfic.data}
            onHideEditForm={onHideFanficForm}
            onSetFanfic={handleUpdateFanfic}
          />
        )}
      </div>
    ) : (
      <Notice message={fanfic.message} type="danger" />
    )
  );
};

export default Fanfic;