import axios from "axios";

const axiosFavoritos = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/favoritos/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
  },
});

axiosFavoritos.interceptors.response.use(
  function (response) {
    return JSON.stringify(response.data);
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchPostFavorito = (productoId) => {
  return axiosFavoritos.post("", { producto: productoId });
};

export const fetchDeleteFavorito = (favoritoId) => {
  return axiosFavoritos.delete(favoritoId + "/");
};
