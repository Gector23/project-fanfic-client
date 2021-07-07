import { useEffect } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

import { initialAction } from "../actions/common";
import { refresh } from "../actions/user";

import Header from "./Header";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ActivatePage from "../pages/ActivatePage";
import FanficPage from "../pages/FanficPage";
import ProfilePage from "../pages/ProfilePage";
import NotActivated from "../components/NotActivated";
import InitializePreferences from "./InitializePreferences";
import Spinner from "../components/Spinner";

const App = () => {
  const location = useLocation();
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialAction(), { shouldHandleLoadingState: true });
  }, [dispatch]);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  switch (location.pathname) {
    case "/sign-up":
      if (user) {
        return <Redirect to="/sign-in" />;
      }
      break;
    case "/sign-in":
      if (user) {
        return <Redirect to="/" />;
      }
      break;
    default:
      break;
  }

  return (
    <Container>
      {user && !user.isActivated && location.pathname !== "/activate" ? (
        <NotActivated userEmail={user.email} />
      ) : user && !user.isInitializedPreferences && location.pathname !== "/activate" ? (
        <InitializePreferences />
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
          </Switch>
          <Spinner />
        </>
      )}
    </Container>
  );
}

export default App;
