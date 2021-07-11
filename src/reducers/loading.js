import cloneDeep from "lodash.clonedeep";

import { START_LOADING, STOP_LOADING } from "../constants/loading";

const defaultState = {
  status: false,
  processes: []
};

const loading = (state = defaultState, action) => {
  let stateClone;
  switch (action.type) {
    case START_LOADING:
      stateClone = cloneDeep(state);
      stateClone.processes.push({
        status: true,
        name: action.payload.process
      });
      stateClone.status = true;
      return stateClone;

    case STOP_LOADING:
      stateClone = cloneDeep(state);
      stateClone.processes = stateClone.processes.filter(process => (
        process.name !== action.payload.process
      ));
      if (!stateClone.processes.find(process => process.status)) {
        stateClone.status = false;
      }
      return stateClone;

    default:
      return state;
  }
};

export default loading;