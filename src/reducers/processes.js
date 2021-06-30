import cloneDeep from "lodash.clonedeep";

import { PROCESS_FETCH, PROCESS_SUCCESS, PROCESS_FAILURE } from "../constants/processes";

const processes = (state = {}, action) => {
  let stateClone = cloneDeep(state);
  switch (action.type) {
    case PROCESS_FETCH:
      stateClone[action.process] = { status: "fetch" };
      return stateClone;

    case PROCESS_SUCCESS:
      stateClone[action.process] = { status: "success", message: action.message };
      return stateClone;

    case PROCESS_FAILURE:
      stateClone[action.process] = { status: "failure", message: action.message };
      return stateClone;

    default:
      return state;
  }
};

export default processes;