import axios from "axios";

const axiosSatisfacciones = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/satisfacciones/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      String(JSON.parse(localStorage.getItem("authTokens"))?.access),
  },
});

axiosSatisfacciones.interceptors.request.use(
  function (config) {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    if (authTokens) {
      config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosSatisfacciones.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchGetSatisfacciones = () => {
  return axiosSatisfacciones.get("");
};

export const fetchPostSatisfaccion = (productoId, calificacion) => {
  return axiosSatisfacciones.post("", {
    producto: productoId,
    calificacion: calificacion,
  });
};

export const fetchPatchSatisfaccion = (id, calificacion) => {
  return axiosSatisfacciones.patch(id + "/", { calificacion: calificacion });
};

export const fetchDeleteSatisfaccion = (id) => {
  return axiosSatisfacciones.delete(id + "/");
};
