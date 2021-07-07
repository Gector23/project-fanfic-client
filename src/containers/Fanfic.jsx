import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import useNeedUpdate from "../hooks/useNeedUpdate";
import useShowModal from "../hooks/useShowModal";

import { getFanfic, updateFanfic, deleteFanfic, setFanficRate } from "../actions/fanfics";

import { ReactComponent as EditIcon } from "../icons/pen.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash.svg";

import FanficCard from "./FanficCard";
import FanficForm from "../components/FanficForm";
import IconButton from "../components/IconButton";
import Notice from "../components/Notice";

const Fanfic = ({ fanficId }) => {
  const [showFanficForm, onShowFanficForm, onHideFanficForm] = useShowModal();
  const dispatch = useDispatch();
  const fanfic = useSelector(state => state.fanfics.find(fanfic => fanfic.data._id === fanficId));
  const needUpdate = useNeedUpdate("fanfic", fanficId, fanfic?.data?.lastUpdate);

  useEffect(() => {
    if (!fanfic || (fanfic.status === "success" && needUpdate)) {
      dispatch(getFanfic(fanficId));
    }
  }, [dispatch, fanficId, fanfic, needUpdate]);

  const handleUpdateFanfic = update => {
    dispatch(updateFanfic(fanficId, update));
    onHideFanficForm();
  };

  const handleDeleteFanfic = useCallback(() => {
    dispatch(deleteFanfic(fanficId));
  }, [dispatch, fanficId]);

  const handleRate = value => {
    dispatch(setFanficRate(fanficId, value));
  };

  const fanficCardButtons = [
    <IconButton key="editIcon" icon={<EditIcon />} onClick={onShowFanficForm} />,
    <IconButton key="deleteIcon" icon={<DeleteIcon />} type="danger" onClick={handleDeleteFanfic} />
  ];

  return (
    !fanfic || fanfic?.status === "fetch" ? null : fanfic.status === "success" ? (
      <div>
        <FanficCard
          fanficData={fanfic.data}
          userRate={fanfic.userRate}
          buttons={fanficCardButtons}
          onRate={handleRate}
        />
        <FanficForm
          showEditForm={showFanficForm}
          initialData={fanfic.data}
          onHideEditForm={onHideFanficForm}
          onSetFanfic={handleUpdateFanfic}
        />
      </div>
    ) : (
      <Notice message={fanfic.message} type="danger" />
    )
  );
};

export default Fanfic;