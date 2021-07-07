import useUserFanfics from "../hooks/useUserFanfics";

import ListHeader from "./ListHeader";
import FanficsList from "./FanficsList";

const ProfileFanfics = ({ userId, fanficsType, onTitleButtonClick }) => {
  const userFanfics = useUserFanfics(userId, fanficsType);

  return (
    <div>
      <ListHeader heading={`User ${fanficsType}`} onHeaderButtonClick={onTitleButtonClick} />
      <FanficsList fanfics={userFanfics} />
    </div>
  );
};

export default ProfileFanfics;