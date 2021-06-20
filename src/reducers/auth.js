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
    case authConstants.SIGN_UP_SUCCESS:
      stateClone.processes.signUp = { status: "success", message: action.message };
      return stateClone;
    case authConstants.SIGN_UP_FAILURE:
      stateClone.processes.signUp = { status: "failure", message: action.message };
      return stateClone;
    case authConstants.SIGN_IN_SUCCESS:
      stateClone.processes.signIn = { status: "success", message: action.message };
      return stateClone;
    case authConstants.SIGN_IN_FAILURE:
      stateClone.processes.signIn = { status: "failure", message: action.message };
      return stateClone;
    case authConstants.ACTIVATION_FETCH:
      stateClone.processes.activation = { status: "fetch" };
      return stateClone;
    case authConstants.ACTIVATION_SUCCESS:
      stateClone.processes.activation = { status: "success", message: action.message };
      return stateClone;
    case authConstants.ACTIVATION_FAILURE:
      stateClone.processes.activation = { status: "failure", message: action.message };
      return stateClone;
    default:
      return state;
  }
};

export default auth;