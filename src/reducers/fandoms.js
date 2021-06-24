import { SET_FANDOMS } from "../constants/fandoms";

const fandoms = (state = [], action) => {
  switch (action.type) {
    case SET_FANDOMS:
      return action.fandoms;
    default:
      return state;
  }
};

export default fandoms;