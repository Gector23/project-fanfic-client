import api from "../utils/api";

import { SET_FANDOMS } from "../constants/fandoms";
import { SET_TAGS } from "../constants/tags";

export const initialAction = () => {
  return async dispatch => {
    try {
      const fandomsResponse = await api.get("/fandom");
      dispatch({ type: SET_FANDOMS, fandoms: fandomsResponse.data.fandoms });
      const tagsResponse = await api.get("/tag");
      dispatch({ type: SET_TAGS, payload: {
        tags: tagsResponse.data.tags
      }});
    } catch (err) {
      console.log(err);
    }
  };
};