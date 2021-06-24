import api from "../utils/api";

import { SET_USER, REMOVE_USER } from "../constants/auth";
import { PROCESS_SUCCESS, PROCESS_FAILURE } from "../constants/processes";

export const signUp = (email, login, password) => {
  return async dispatch => {
    try {
      const response = await api.post("/auth/sign-up", { email, login, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({ type: SET_USER, user: response.data.user });
      dispatch({ type: PROCESS_SUCCESS, process: "signUp", message: response.data.message });
    } catch (err) {
      dispatch({ type: PROCESS_FAILURE, process: "signUp", message: err.response.data.message });
    }
  };
};

export const signIn = (email, password) => {
  return async dispatch => {
    try {
      const response = await api.post("/auth/sign-in", { email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({ type: SET_USER, user: response.data.user });
      dispatch({ type: PROCESS_SUCCESS, process: "signIn", message: response.data.message });
    } catch (err) {
      dispatch({ type: PROCESS_FAILURE, process: "signIn", message: err.response.data.message });
    }
  };
};

export const activate = activationLink => {
  return async dispatch => {
    try {
      const response = await api.get("/auth/activate", {
        params: { activationLink }
      });
      dispatch({ type: PROCESS_SUCCESS, process: "activation", message: response.data.message });
    } catch (err) {
      dispatch({ type: PROCESS_FAILURE, process: "activation", message: err.response.data.message });
    }
  };
};

export const refresh = () => {
  return async dispatch => {
    try {
      const response = await api.get("/auth/refresh");
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({ type: SET_USER, user: response.data.user });
      dispatch({ type: PROCESS_SUCCESS, process: "refresh", message: response.data.message });
    } catch (err) {
      dispatch({ type: PROCESS_FAILURE, process: "refresh", message: err.response.data.message });
    }
  };
};

export const signOut = () => {
  return async dispatch => {
    try {
      const response = await api.get("/auth/sign-out");
      dispatch({ type: REMOVE_USER });
      dispatch({ type: PROCESS_SUCCESS, process: "sign-out", message: response.data.message });
    } catch (err) {
      dispatch({ type: PROCESS_FAILURE, process: "sign-out", message: err.response.data.message });
    }
  };
};