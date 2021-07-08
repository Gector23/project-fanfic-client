import cloneDeep from "lodash.clonedeep";

import * as fanficsContants from "../constants/fanfics";

const fanfics = (state = [], action) => {
  let stateClone;
  let fanficIndex;
  switch (action.type) {
    case fanficsContants.FANFIC_FETCH:
      stateClone = cloneDeep(state);
      fanficIndex = stateClone.findIndex(fanfic => fanfic.data._id === action.payload.fanficId);
      if (~fanficIndex) {
        stateClone[fanficIndex] = {
          status: "fetch",
          data: { _id: action.payload.fanficId }
        };
      } else {
        stateClone.push({
          status: "fetch",
          data: { _id: action.payload.fanficId }
        });
      }
      return stateClone;

    case fanficsContants.FANFIC_SUCCESS:
      stateClone = cloneDeep(state);
      fanficIndex = stateClone.findIndex(fanfic => fanfic.data._id === action.payload.fanficId);
      stateClone[fanficIndex] = {
        status: "success",
        message: action.payload.message,
        data: action.payload.data,
        userRate: action.payload.userRate,
        isFavorited: action.payload.isFavorited
      };
      return stateClone;

    case fanficsContants.FANFIC_FAILURE:
      stateClone = cloneDeep(state);
      fanficIndex = stateClone.findIndex(fanfic => fanfic.data._id === action.payload.fanficId);
      stateClone[fanficIndex] = {
        status: "failure",
        message: action.payload.message,
        data: { _id: action.payload.fanficId }
      };
      return stateClone;

    case fanficsContants.FANFIC_TOGGLE_FAVORITE:
      stateClone = cloneDeep(state);
      fanficIndex = stateClone.findIndex(fanfic => fanfic.data._id === action.payload.fanficId);
      stateClone[fanficIndex].isFavorited = stateClone[fanficIndex].isFavorited ? false : true;
      return stateClone;

    case fanficsContants.REMOVE_FANFIC:
      stateClone = cloneDeep(state);
      return stateClone.filter(fanfic => fanfic.data._id !== action.payload.fanficId);

    default:
      return state;
  }
};

export default fanfics;