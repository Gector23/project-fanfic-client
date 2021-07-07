import { combineReducers } from "redux";

import user from "./user";
import loading from "./loading";
import fandoms from "./fandoms";
import tags from "./tags";
import processes from "./processes";
import fanfics from "./fanfics";
import chapters from "./chapters";
import profiles from "./profiles";

export default combineReducers({
  user,
  loading,
  fandoms,
  tags,
  processes,
  fanfics,
  chapters,
  profiles
});