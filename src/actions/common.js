import api from "../utils/api";

import { INITIALIZED_PREFERENCES } from "../constants/auth";
import { SET_FANDOMS } from "../constants/fandoms";
import { PROCESS_SUCCESS, PROCESS_FAILURE } from "../constants/processes";

import { refresh } from "./auth";

export const initialAction = () => {
  return async dispatch => {
    try {
      const fandomsResponse = await api.get("/fandom");
      dispatch({ type: SET_FANDOMS, fandoms: fandomsResponse.data.fandoms });
      await dispatch(refresh());
    } catch (err) {
      console.log(err);
    }
  };
};

export const setPreferences = preferences => {
  return async dispatch => {
    try {
      const response = await api.put("/preference/set", {
        fandoms: preferences
      });
      dispatch({ type: INITIALIZED_PREFERENCES });
      dispatch({ type: PROCESS_SUCCESS, process: "set-preferences", message: response.data.message });
    } catch (err) {
      dispatch({ type: PROCESS_FAILURE, process: "set-preferences", message: err.response.data.message });
    }
  };
};