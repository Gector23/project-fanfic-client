import cloneDeep from "lodash.clonedeep";

import * as userConstants from "../constants/user";

const user = (state = {}, action) => {
  let stateClone;
  switch (action.type) {
    case userConstants.USER_FETCH:
      return { status: "fetch" };

    case userConstants.USER_SUCCESS:
      return {
        status: "success",
        message: action.payload.message,
        data: action.payload.data
      };

    case userConstants.USER_FAILURE:
      return {
        status: "failure",
        message: action.payload.message
      };

    case userConstants.REMOVE_USER:
      return {};

    case userConstants.ACTIVATED:
      stateClone = cloneDeep(state);
      stateClone.data.isActivated = true;
      return stateClone;

    case userConstants.SET_PREFERENCES:
      stateClone = cloneDeep(state);
      stateClone.data.preferences = action.payload.preferences;
      if (!stateClone.data.isInitializedPreferences) {
        stateClone.data.isInitializedPreferences = true;
      }
      return stateClone;

    default:
      return state;
  }
};

export default user;