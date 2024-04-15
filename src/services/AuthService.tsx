import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/auth/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuth.interceptors.response.use(
  function (response) {
    return JSON.stringify(response.data);
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchLogin = (credentials) => {
  return axiosAuth.post("login", credentials);
};

export const fetchUpdateToken = (refreshToken) => {
  return axiosAuth.post("token/refresh/", {
    refresh: refreshToken,
  });
};

export const fetchLogout = () => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("user");
};
