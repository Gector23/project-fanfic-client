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