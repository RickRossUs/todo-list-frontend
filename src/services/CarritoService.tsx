import axios from "axios";

const axiosCarrito = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/compra/",
  headers: {
    Authorization:
      "Bearer " +
      String(JSON.parse(localStorage.getItem("authTokens"))?.access),
  },
});

axiosCarrito.interceptors.request.use(
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

axiosCarrito.interceptors.response.use(
  function (response) {
    return JSON.stringify(response.data) || JSON.stringify(response);
  },
  function (error) {
    alert(error);
    return Promise.reject(error);
  }
);

export const fetchGetCarrito = () => {
  return axiosCarrito.get("", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchPostCarrito = (formData) => {
  return axiosCarrito.post("", formData);
};

export const fetchPatchCarrito = (carritoId, formData) => {
  return axiosCarrito.patch(carritoId + "/", formData);
};

export const fetchDeleteCarrito = (carritoId) => {
  return axiosCarrito.delete(carritoId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
