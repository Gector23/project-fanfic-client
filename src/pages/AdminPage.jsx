import { Switch, Route, Redirect } from "react-router-dom";

import Profiles from "../components/Profiles";

const AdminPage = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/admin/users/:currentPage">
          <Profiles />
        </Route>
        <Route exact path="/admin">
          <Redirect to="/admin/users/1" />
        </Route>
        <Route exact path="/admin/users">
          <Redirect to="/admin/users/1" />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminPage;