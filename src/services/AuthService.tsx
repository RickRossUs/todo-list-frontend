import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/auth/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchLogin = (credentials: FormData) => {
  return axiosAuth.post("login", credentials);
};

export const fetchUpdateToken = (refreshToken: string) => {
  return axiosAuth.post("token/refresh/", {
    refresh: refreshToken,
  });
};

export const fetchLogout = () => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("user");
};
