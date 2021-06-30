import { SET_TAGS } from "../constants/tags";

const tags = (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return action.payload.tags;

    default:
      return state;
  }
};

export default tags;