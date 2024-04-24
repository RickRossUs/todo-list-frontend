import axios from "axios";

const axiosFavoritos = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/favoritos/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      (localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
        : ""),
  },
});

axiosFavoritos.interceptors.request.use(
  function (config) {
    const authTokens = JSON.parse(localStorage.getItem("authTokens") || "");
    if (authTokens) {
      config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchGetFavoritos = (
  nombre: string = "",
  categoriaId: number = 0,
  offset: number = 0
) => {
  return axiosFavoritos.get(
    `?nombre=${nombre}&categoria=${
      categoriaId === 0 ? "" : categoriaId
    }&limit=20&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens") || "")?.access),
      },
    }
  );
};

export const fetchPostFavorito = (productoId: number) => {
  return axiosFavoritos.post("", { producto: productoId });
};

export const fetchDeleteFavorito = (favoritoId: number) => {
  return axiosFavoritos.delete(favoritoId + "/");
};
