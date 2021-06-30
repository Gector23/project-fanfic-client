import cloneDeep from "lodash.clonedeep";

import { FANFIC_FETCH, FANFIC_SUCCESS, FANFIC_FAILURE, REMOVE_FANFIC } from "../constants/fanfics";

const fanfics = (state = [], action) => {
  let stateClone;
  let fanficIndex;
  switch (action.type) {
    case FANFIC_FETCH:
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

    case FANFIC_SUCCESS:
      stateClone = cloneDeep(state);
      fanficIndex = stateClone.findIndex(fanfic => fanfic.data._id === action.payload.fanficId);
      stateClone[fanficIndex] = {
        status: "success",
        message: action.payload.message,
        data: action.payload.data,
        chapters: action.payload.chapters
      };
      return stateClone;

    case FANFIC_FAILURE:
      stateClone = cloneDeep(state);
      fanficIndex = stateClone.findIndex(fanfic => fanfic.data._id === action.payload.fanficId);
      stateClone[fanficIndex] = {
        status: "failure",
        message: action.payload.message,
        data: { _id: action.payload.fanficId }
      };
      return stateClone;

    case REMOVE_FANFIC:
      stateClone = cloneDeep(state);
      return stateClone.filter(fanfic => fanfic.data._id !== action.payload.fanficId);

    default:
      return state;
  }
};

export default fanfics;