import { useParams, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useShowModal from "../hooks/useShowModal";
import useRelation from "../hooks/useRelation";

import { createFanfic } from "../actions/fanfics";

import FanficForm from "../components/FanficForm";
import Profile from "../containers/Profile";
import ProfileNavigation from "../components/ProfileNavigation";
import ProfileFanfics from "../components/ProfileFanfics";
import SetPreferences from "../containers/SetPreferences";

const ProfilePage = () => {
  const { userId } = useParams();
  const profile = useSelector(state => state.profiles.find(profile => profile.data?._id === userId));
  const { isOwner } = useRelation(userId);
  const [showEditForm, onShowEditForm, onHideEditForm] = useShowModal();
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();

  const handleCreateFanfic = fanficData => {
    dispatch(createFanfic(fanficData, userId), { shouldHandleLoadingState: true, process: userId });
    onHideEditForm();
  };

  return (
    <div>
      <Profile userId={userId} profileIcon={false} />
      {!profile || profile?.status !== "success" ? null : (
        <>
          <ProfileNavigation editAccess={isOwner} />
          {showEditForm && <FanficForm onHideEditForm={onHideEditForm} onSetFanfic={handleCreateFanfic} />}
          <Switch>
            <Route exact path={`${path}/fanfics/:currentPage`}>
              <ProfileFanfics
                userId={userId}
                fanficsType="fanfics"
                onTitleButtonClick={isOwner ? onShowEditForm : null}
              />
            </Route>
            <Route exact path={`${path}/favorites/:currentPage`}>
              <ProfileFanfics userId={userId} fanficsType="favorites" />
            </Route>
            <Route exact path={`${path}/edit`}>
              {isOwner ? (
                <SetPreferences userId={profile.data._id} intialPreferences={profile.data?.preferences} />
              ) : (
                <Redirect to={`${url}/fanfics`} />
              )}
            </Route>
            <Route exact path={`${path}/fanfics/`}>
              <Redirect to={`${url}/fanfics/1`} />
            </Route>
            <Route exact path={`${path}/favorites/`}>
              <Redirect to={`${url}/favorites/1`} />
            </Route>
            <Route exact path={path}>
              <Redirect to={`${url}/fanfics`} />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
};

export default ProfilePage;