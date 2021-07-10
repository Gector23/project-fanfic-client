import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import useRelation from "../hooks/useRelation";

import MainPageNavigation from "../components/MainPageNavigation";
import CommunityFanfics from "../components/CommunityFanfics";

const MainPage = () => {
  const { isSignedIn } = useRelation();
  const preferences = useSelector(state => isSignedIn ? state.user.data.preferences : null);

  return (
    <div>
      <MainPageNavigation isSignedIn={isSignedIn} />
      <Switch>
        <Route exact path="/main/best-fanfics/:currentPage">
          <CommunityFanfics sortField="rating" />
        </Route>
        <Route exact path="/main/new-fanfics/:currentPage">
          <CommunityFanfics sortField="lastUpdate" />
        </Route>
        <Route exact path="/main/best-from-preferences/:currentPage">
          <CommunityFanfics sortField="rating" preferences={preferences} />
        </Route>
        <Route exact path="/main/new-from-preferences/:currentPage">
          <CommunityFanfics sortField="lastUpdate" preferences={preferences} />
        </Route>
        <Route path="/main/best-fanfics">
          <Redirect to="/main/best-fanfics/1" />
        </Route>
        <Route path="/main/new-fanfics">
          <Redirect to="/main/new-fanfics/1" />
        </Route>
        <Route path="/main/best-from-preferences">
          <Redirect to="/main/best-from-preferences/1" />
        </Route>
        <Route path="/main/new-from-preferences">
          <Redirect to="/main/new-from-preferences/1" />
        </Route>
        <Route exact path="/main">
          <Redirect to="/main/best-fanfics/1" />
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;