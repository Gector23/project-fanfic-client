import { useEffect } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

import { initialAction } from "../actions/common";

import Header from "./Header";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Activate from "./Activate";
import NotActivated from "../components/NotActivated";
import InitializePreferences from "./InitializePreferences";
import Spinner from "../components/Spinner";

const App = () => {
  const location = useLocation();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  console.log(location);

  useEffect(() => {
    dispatch(initialAction(), { shouldHandleLoadingState: true });
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
              <SignUp />
            </Route>
            <Route exact path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/activate">
              <Activate />
            </Route>
          </Switch>
          <Spinner />
        </>
      )}
    </Container>
  );
}

export default App;
