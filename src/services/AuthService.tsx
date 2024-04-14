import axios from "axios";

const URL = import.meta.env.VITE_APP_API_URL + "/auth/";

export const fetchLogin = (credentials) => {
  return axios
    .post(URL + "login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return JSON.stringify(response.token);
    })
    .catch((error) => {
      throw new Error(`Error de autenticación: ${error.message}`);
    });
};

export const fetchUpdateToken = (refreshToken) => {
  return axios
    .post(
      URL + "token/refresh/",
      {
        refresh: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      alert(response.data);
      return response.data;
    })
    .catch((error) => {
      throw new Error("Error al actualizar el token: " + error.message);
    });
};

export const fetchLogout = () => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("user");
};
