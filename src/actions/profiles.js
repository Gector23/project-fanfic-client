import api from "../utils/api";

import * as profileConstans from "../constants/profile";

export const getProfile = userId => {
  return async dispatch => {
    try {
      dispatch({ type: profileConstans.PROFILE_FETCH, payload: { userId } });
      const response = await api.get(`/user/${userId}`);
      dispatch({
        type: profileConstans.PROFILE_SUCCESS, payload: {
          userId,
          message: response.data.message,
          data: response.data.user
        }
      });
    } catch (err) {
      dispatch({
        type: profileConstans.PROFILE_FAILURE, payload: {
          userId,
          message: err.response.data.message
        }
      });
    }
  };
};

export const getProfileFanfics = userId => {
  return async dispatch => {
    try {
      dispatch({ type: profileConstans.PROFILE_FANFICS_FETCH, payload: { userId } });
      const response = await api.get(`/user/${userId}/fanfics`);
      dispatch({
        type: profileConstans.PROFILE_FANFICS_SUCCESS, payload: {
          userId,
          message: response.data.message,
          data: response.data.fanfics
        }
      });
    } catch (err) {
      dispatch({
        type: profileConstans.PROFILE_FANFICS_FAILURE, payload: {
          userId,
          message: err.response.data.message
        }
      });
    }
  };
};