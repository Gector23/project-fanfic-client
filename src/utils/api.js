import axios from "axios";

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
  throw err;
});

export default api;