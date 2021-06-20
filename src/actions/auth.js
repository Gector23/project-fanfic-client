import api from "../utils/api";

import * as authConstants from "../constants/auth";

export const signUp = (email, login, password) => {
  return async dispatch => {
    try {
      const response = await api.post("/auth/sign-up", { email, login, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({ type: authConstants.SET_USER, user: response.data.user });
      dispatch({ type: authConstants.SIGN_UP_SUCCESS, message: response.data.message });
    } catch (err) {
      dispatch({ type: authConstants.SIGN_UP_FAILURE, message: err.response.data.message });
    }
  };
};

export const signIn = (email, password) => {
  return async dispatch => {
    try {
      const response = await api.post("/auth/sign-in", { email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({ type: authConstants.SET_USER, user: response.data.user });
      dispatch({ type: authConstants.SIGN_IN_SUCCESS, message: response.data.message });
    } catch (err) {
      dispatch({ type: authConstants.SIGN_IN_FAILURE, message: err.response.data.message });
    }
  };
};

export const activate = activationLink => {
  return async dispatch => {
    try {
      dispatch({ type: authConstants.ACTIVATION_FETCH });
      const response = await api.get("/auth/activate", {
        params: { activationLink }
      });
      localStorage.removeItem("accessToken");
      dispatch({ type: authConstants.REMOVE_USER });
      dispatch({ type: authConstants.ACTIVATION_SUCCESS, message: response.data.message });
    } catch (err) {
      console.log(err);
      dispatch({ type: authConstants.ACTIVATION_FAILURE, message: err.response.data.message });
    }
  };
};