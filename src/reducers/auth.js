import cloneDeep from "lodash.clonedeep";

import { SET_USER, REMOVE_USER, INITIALIZED_PREFERENCES } from "../constants/auth";

const auth = (state = { user: null }, action) => {
  let stateClone = cloneDeep(state);
  switch (action.type) {
    case SET_USER:
      stateClone.user = action.user;
      return stateClone;

    case REMOVE_USER:
      stateClone.user = null;
      return stateClone;

    case INITIALIZED_PREFERENCES:
      stateClone.user.isInitializedPreferences = true;
      return stateClone;

    default:
      return state;
  }
};

export default auth;