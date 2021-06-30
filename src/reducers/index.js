import { combineReducers } from "redux";

import auth from "./auth";
import loading from "./loading";
import fandoms from "./fandoms";
import tags from "./tags";
import processes from "./processes";
import fanfics from "./fanfics";
import chapters from "./chapters";

export default combineReducers({
  auth,
  loading,
  fandoms,
  tags,
  processes,
  fanfics,
  chapters
});