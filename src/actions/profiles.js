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

export const toggleProfileAdmin = (userId, isAdmin) => {
  return async dispatch => {
    try {
      isAdmin ? (
        await api.patch(`/user/${userId}/remove-admin`)
      ) : (
        await api.patch(`/user/${userId}/set-admin`)
      )
      dispatch({
        type: profileConstans.REMOVE_PROFILE, payload: {
          userId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const toggleProfileBlock = (userId, isBlocked) => {
  return async dispatch => {
    try {
      isBlocked ? (
        await api.patch(`/user/${userId}/unblock`)
      ) : (
        await api.patch(`/user/${userId}/block`)
      )
      dispatch({
        type: profileConstans.REMOVE_PROFILE, payload: {
          userId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProfile = userId => {
  return async dispatch => {
    try {
      await api.delete(`/user/${userId}`);
      dispatch({ type: profileConstans.REMOVE_PROFILE, payload: { userId } });
    } catch (err) {
      console.log(err);
    }
  };
};