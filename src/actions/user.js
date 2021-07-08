import api from "../utils/api";

import * as userConstants from "../constants/user";
import { REMOVE_PROFILE } from "../constants/profile";

export const signUp = (email, login, password) => {
  return async dispatch => {
    try {
      dispatch({ type: userConstants.USER_FETCH });
      const response = await api.post("/auth/sign-up", { email, login, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({
        type: userConstants.USER_SUCCESS, payload: {
          message: response.data.message,
          data: response.data.user
        }
      });
    } catch (err) {
      dispatch({ type: userConstants.USER_FAILURE, payload: { message: err.response.data.message } });
    }
  };
};

export const signIn = (email, password) => {
  return async dispatch => {
    try {
      dispatch({ type: userConstants.USER_FETCH });
      const response = await api.post("/auth/sign-in", { email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({
        type: userConstants.USER_SUCCESS, payload: {
          message: response.data.message,
          data: response.data.user
        }
      });
    } catch (err) {
      dispatch({ type: userConstants.USER_FAILURE, payload: { message: err.response.data.message } });
    }
  };
};

export const refresh = () => {
  return async dispatch => {
    try {
      dispatch({ type: userConstants.USER_FETCH });
      const response = await api.get("/auth/refresh");
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({
        type: userConstants.USER_SUCCESS, payload: {
          message: response.data.message,
          data: response.data.user
        }
      });
    } catch (err) {
      dispatch({ type: userConstants.USER_FAILURE, payload: { message: err.response.data.message } });
    }
  };
};

export const signOut = () => {
  return async dispatch => {
    try {
      await api.get("/auth/sign-out");
      dispatch({ type: userConstants.REMOVE_USER });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setPreferences = (userId, preferences, intial) => {
  return async dispatch => {
    try {
      await api.put(`/user/${userId}/preferences`, { fandoms: preferences });
      dispatch({ type: REMOVE_PROFILE, payload: { userId } });
      if (intial) {
        dispatch({ type: userConstants.INITIALIZEDPREFERENCES });
      }
    } catch (err) {
      console.log(err);
    }
  };
};