import { combineReducers } from "redux";

import auth from "./auth";
import loading from "./loading";
import fandoms from "./fandoms";
import processes from "./processes";

export default combineReducers({
  auth,
  loading,
  fandoms,
  processes
});