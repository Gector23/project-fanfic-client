import cloneDeep from "lodash.clonedeep";

import * as profileConstans from "../constants/profile";

const profiles = (state = [], action) => {
  let stateClone;
  let profileIndex;
  switch (action.type) {
    case profileConstans.PROFILE_FETCH:
      stateClone = cloneDeep(state);
      profileIndex = stateClone.findIndex(profile => profile.data._id === action.payload.userId);
      if (~profileIndex) {
        stateClone[profileIndex] = {
          status: "fetch",
          data: { _id: action.payload.userId }
        };
      } else {
        stateClone.push({
          status: "fetch",
          data: { _id: action.payload.userId }
        });
      }
      return stateClone;

    case profileConstans.PROFILE_SUCCESS:
      stateClone = cloneDeep(state);
      profileIndex = stateClone.findIndex(profile => profile.data._id === action.payload.userId);
      stateClone[profileIndex] = {
        status: "success",
        message: action.payload.message,
        data: action.payload.data
      };
      return stateClone;

    case profileConstans.PROFILE_FAILURE:
      stateClone = cloneDeep(state);
      profileIndex = stateClone.findIndex(profile => profile.data._id === action.payload.userId);
      stateClone[profileIndex] = {
        status: "failure",
        message: action.payload.message,
        data: { _id: action.payload.userId }
      };
      return stateClone;

    case profileConstans.REMOVE_PROFILE:
      stateClone = cloneDeep(state);
      return stateClone.filter(profile => profile.data._id !== action.payload.userId);

    default:
      return state;
  }
};

export default profiles;