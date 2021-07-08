import { combineReducers } from "redux";

import user from "./user";
import loading from "./loading";
import processes from "./processes";
import fanfics from "./fanfics";
import chapters from "./chapters";
import profiles from "./profiles";

export default combineReducers({
  user,
  loading,
  processes,
  fanfics,
  chapters,
  profiles
});