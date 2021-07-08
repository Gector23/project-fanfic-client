import { useEffect } from "react";
import { useParams, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useNeedUpdate from "../hooks/useNeedUpdate";
import useShowModal from "../hooks/useShowModal";
import useRelation from "../hooks/useRelation";

import { createFanfic } from "../actions/fanfics";
import { getProfile } from "../actions/profiles";

import FanficForm from "../components/FanficForm";
import ProfileCard from "../components/ProfileCard";
import ProfileNavigation from "../components/ProfileNavigation";
import ProfileFanfics from "../components/ProfileFanfics";
import SetPreferences from "../containers/SetPreferences";
import Notice from "../components/Notice";

const ProfilePage = () => {
  const { userId } = useParams();
  const { hasAccess } = useRelation(userId);
  const profile = useSelector(state => state.profiles.find(profile => profile.data?._id === userId));
  const needUpdate = useNeedUpdate("user", userId, profile?.data?.lastUpdate);
  const [showEditForm, onShowEditForm, onHideEditForm] = useShowModal();
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile || (profile.status === "success" && needUpdate)) {
      dispatch(getProfile(userId));
    }
  }, [dispatch, userId, profile, needUpdate]);

  const handleCreateFanfic = fanficData => {
    dispatch(createFanfic(fanficData, userId), { shouldHandleLoadingState: true });
    onHideEditForm();
  };

  return (
    !profile || profile?.status === "fetch" ? null : profile.status === "success" ? (
      <>
        <ProfileCard profileData={profile.data} />
        <ProfileNavigation />
        <FanficForm showEditForm={showEditForm} onHideEditForm={onHideEditForm} onSetFanfic={handleCreateFanfic} />
        <Switch>
          <Route exact path={`${path}/fanfics`}>
            <ProfileFanfics
              userId={userId}
              fanficsType="fanfics"
              onTitleButtonClick={hasAccess ? onShowEditForm : null}
            />
          </Route>
          <Route exact path={`${path}/favorites`}>
            <ProfileFanfics userId={userId} fanficsType="favorites" />
          </Route>
          <Route exact path={`${path}/edit`}>
            {hasAccess ? (
              <SetPreferences userId={profile.data._id} intialPreferences={profile.data?.preferences} />
            ) : (
              <Redirect to={`${url}/fanfics`} />
            )}
          </Route>
          <Route exact path={path}>
            <Redirect to={`${url}/fanfics`} />
          </Route>
        </Switch>
      </>
    ) : (
      <Notice message={profile.message} type="danger" />
    )
  );
};

export default ProfilePage;