import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Activate from "./Activate";
import NotActivated from "../components/NotActivated";

const App = () => {
  const location = useLocation();
  const user = useSelector(state => state.auth?.user);

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
    case "/activate":
      if (user?.isActivated) {
        return <Redirect to="/" />;
      }
      break;
    case "/not-activated":
      if (user?.isActivated) {
        return <Redirect to="/" />;
      }
      break;
    default:
      break;
  }

  return (
    <>
      {user && !user.isActivated && location.pathname !== "/activation" && <Redirect to="/not-activated" />}
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
        <Route exact path="/not-activated">
          <NotActivated userEmail={user?.email} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
