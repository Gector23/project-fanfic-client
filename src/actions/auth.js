import api from "../utils/api";

import * as authConstants from "../constants/auth";

export const signUp = (email, login, password) => {
  return async dispatch => {
    try {
      const response = await api.post("/auth/sign-up", { email, login, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({ type: authConstants.SET_USER, user: response.data.user });
      dispatch({ type: authConstants.PROCESS_SUCCESS, process: "signUp", message: response.data.message });
    } catch (err) {
      dispatch({ type: authConstants.PROCESS_FAILURE, process: "signUp", message: err.response.data.message });
    }
  };
};

export const signIn = (email, password) => {
  return async dispatch => {
    try {
      const response = await api.post("/auth/sign-in", { email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({ type: authConstants.SET_USER, user: response.data.user });
      dispatch({ type: authConstants.PROCESS_SUCCESS, process: "signIn", message: response.data.message });
    } catch (err) {
      dispatch({ type: authConstants.PROCESS_FAILURE, process: "signIn", message: err.response.data.message });
    }
  };
};

export const activate = activationLink => {
  return async dispatch => {
    try {
      dispatch({ type: authConstants.PROCESS_FETCH, process: "activation" });
      const response = await api.get("/auth/activate", {
        params: { activationLink }
      });
      localStorage.removeItem("accessToken");
      dispatch({ type: authConstants.REMOVE_USER });
      dispatch({ type: authConstants.PROCESS_SUCCESS, process: "activation", message: response.data.message });
    } catch (err) {
      dispatch({ type: authConstants.PROCESS_FAILURE, process: "activation", message: err.response.data.message });
    }
  };
};

export const refresh = () => {
  return async dispatch => {
    try {
      dispatch({ type: authConstants.PROCESS_FETCH, process: "refresh" });
      const response = await api.get("/auth/refresh");
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({ type: authConstants.SET_USER, user: response.data.user });
      dispatch({ type: authConstants.PROCESS_SUCCESS, process: "refresh", message: response.data.message });
    } catch (err) {
      dispatch({ type: authConstants.PROCESS_FAILURE, process: "refresh", message: err.response.data.message });
    }
  };
};