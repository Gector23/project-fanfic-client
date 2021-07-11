import axios from "axios";

import store from "./store";

import { BLOCKED } from "../constants/user";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

api.interceptors.request.use(response => {
  response.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
  return response;
})

api.interceptors.response.use(response => {
  return response;
}, async err => {
  if (err.response.status === 401 && err.config.url !== "/auth/refresh") {
    const response = await api.get("/auth/refresh");
    localStorage.setItem("accessToken", response.data.accessToken);
    return api.request(err.config);
  }
  if (err.response.status === 403) {
    if (err.response.data.message === "You are blocked.") {
      store.dispatch({ type: BLOCKED });
    }
  }
  throw err;
});

export default api;