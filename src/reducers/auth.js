import cloneDeep from "lodash.clonedeep";

import * as authConstants from "../constants/auth";

const initialState = { user: null, processes: {} };

const auth = (state = initialState, action) => {
  let stateClone = cloneDeep(state);
  switch (action.type) {
    case authConstants.SET_USER:
      return {
        ...stateClone,
        user: action.user
      };
    case authConstants.REMOVE_USER:
      return {
        ...stateClone,
        user: null
      };
    case authConstants.INITIAL_AUTH:
      return initialState;
    case authConstants.PROCESS_FETCH:
      stateClone.processes[action.process] = { status: "fetch" };
      return stateClone;
    case authConstants.PROCESS_SUCCESS:
      stateClone.processes[action.process] = { status: "success", message: action.message };
      return stateClone;
    case authConstants.PROCESS_FAILURE:
      stateClone.processes[action.process] = { status: "failure", message: action.message };
      return stateClone;
    default:
      return state;
  }
};

export default auth;