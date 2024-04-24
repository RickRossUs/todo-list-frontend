import axios from "axios";

const axiosSatisfacciones = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/satisfacciones/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      (localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
        : ""),
  },
});

axiosSatisfacciones.interceptors.request.use(
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

export const fetchGetSatisfacciones = () => {
  return axiosSatisfacciones.get("");
};

export const fetchPostSatisfaccion = (productoId: number, calificacion: number) => {
  return axiosSatisfacciones.post("", {
    producto: productoId,
    calificacion: calificacion,
  });
};

export const fetchPatchSatisfaccion = (id: number, calificacion: number) => {
  return axiosSatisfacciones.patch(id + "/", { calificacion: calificacion });
};

export const fetchDeleteSatisfaccion = (id: number) => {
  return axiosSatisfacciones.delete(id + "/");
};
