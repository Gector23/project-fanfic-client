import { useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import useLastUpdate from "../hooks/useLastUpdate";
import useRelation from "../hooks/useRelation";

import { getProfile, deleteProfile, toggleProfileAdmin, toggleProfileBlock } from "../actions/profiles";

import { ReactComponent as ProfileIcon } from "../icons/receipt.svg";
import { ReactComponent as BlockIcon } from "../icons/person.svg";
import { ReactComponent as UnblockIcon } from "../icons/person-x.svg";
import { ReactComponent as SetAdminIcon } from "../icons/shield.svg";
import { ReactComponent as RemoveAdminIcon } from "../icons/shield-check.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash.svg";

import ProfileCard from "../components/ProfileCard";
import Notice from "../components/Notice";
import IconButton from "../components/IconButton";

const Profile = ({ userId, profileIcon = true }) => {
  const profile = useSelector(state => state.profiles.find(profile => profile.data?._id === userId));
  const lastUpdate = useLastUpdate("user", profile?.data?._id);
  const { isOwner, isAdmin } = useRelation(profile?.data?._id);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile || (profile.status === "success" && lastUpdate && profile.data.lastUpdate !== lastUpdate)) {
      dispatch(getProfile(userId), { shouldHandleLoadingState: true, process: userId });
    }
  }, [dispatch, userId, profile, lastUpdate]);

  const handleBlockClick = useCallback(() => {
    dispatch(toggleProfileBlock(userId, profile.data.isBlocked), { shouldHandleLoadingState: true, process: userId });
  }, [dispatch, userId, profile?.data?.isBlocked]);

  const handleAdminClick = useCallback(() => {
    dispatch(toggleProfileAdmin(userId, profile.data.isAdmin), { shouldHandleLoadingState: true, process: userId });
  }, [dispatch, userId, profile?.data?.isAdmin]);

  const handleDeleteProfile = useCallback(() => {
    dispatch(deleteProfile(userId), { shouldHandleLoadingState: true, process: userId });
  }, [dispatch, userId]);

  let profileCardButtons = [];

  if (profileIcon) {
    const profileIcon = <IconButton
      key="profileIcon"
      icon={<ProfileIcon />}
      onClick={() => history.push(`/profile/${userId}`)}
    />;
    profileCardButtons.push(profileIcon);
  }

  if (isAdmin && !isOwner) {
    const blockButton = <IconButton
      key="blockIcon"
      icon={<BlockIcon />}
      onClick={handleBlockClick}
    />;
    const unblockButton = <IconButton
      key="unblockIcon"
      icon={<UnblockIcon />}
      type="secondary"
      onClick={handleBlockClick}
    />;
    const setAdminButton = <IconButton
      key="setAdminIcon"
      icon={<SetAdminIcon />}
      type="info"
      onClick={handleAdminClick}
    />;
    const removeAdminButton = <IconButton
      key="removeAdminIcon"
      icon={<RemoveAdminIcon />}
      type="secondary"
      onClick={handleAdminClick}
    />;
    const deleteButton = <IconButton
      key="deleteIcon"
      icon={<DeleteIcon />}
      type="danger"
      onClick={handleDeleteProfile}
    />;

    if (profile?.data?.isBlocked) {
      profileCardButtons.push(unblockButton);
    } else {
      profileCardButtons.push(blockButton);
    }

    if (profile?.data?.isAdmin) {
      profileCardButtons.push(removeAdminButton);
    } else {
      profileCardButtons.push(setAdminButton);
    }

    profileCardButtons.push(deleteButton);
  }

  return (
    <div>
      {!profile || profile?.status === "fetch" ? null : profile.status === "success" ? (
        <ProfileCard profileData={profile.data} buttons={profileCardButtons} />
      ) : (
        <Notice message={profile.message} type="danger" />
      )}
    </div>
  );
};

export default Profile;