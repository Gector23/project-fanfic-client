import { useEffect } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

import { refresh } from "../actions/user";

import Header from "./Header";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ActivatePage from "../pages/ActivatePage";
import MainPage from "../pages/MainPage";
import FanficPage from "../pages/FanficPage";
import ProfilePage from "../pages/ProfilePage";
import NotActivated from "../components/NotActivated";
import SetPreferences from "./SetPreferences";
import Spinner from "../components/Spinner";

const App = () => {
  const location = useLocation();
  const userData = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  switch (location.pathname) {
    case "/sign-up":
      if (userData) {
        return <Redirect to="/sign-in" />;
      }
      break;
    case "/sign-in":
      if (userData) {
        return <Redirect to="/main" />;
      }
      break;
    default:
      break;
  }

  return (
    <Container>
      {userData && !userData.isActivated && location.pathname !== "/activate" ? (
        <NotActivated userEmail={userData.email} />
      ) : userData && !userData.isInitializedPreferences && location.pathname !== "/activate" ? (
        <SetPreferences userId={userData._id} initial={true} />
      ) : (
        <>
          <Header />
          <Switch>
            <Route exact path="/sign-up">
              <SignUpPage />
            </Route>
            <Route exact path="/sign-in">
              <SignInPage />
            </Route>
            <Route path="/activate">
              <ActivatePage />
            </Route>
            <Route path="/fanfic/:fanficId">
              <FanficPage />
            </Route>
            <Route path="/profile/:userId">
              <ProfilePage />
            </Route>
            <Route path="/main">
              <MainPage />
            </Route>
            <Route exact path="/">
            <Redirect to={"/main"} />
          </Route>
          </Switch>
          <Spinner />
        </>
      )}
    </Container>
  );
}

export default App;
