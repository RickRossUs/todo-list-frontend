import axios from "axios";

const axiosCarrito = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/compra/",
  headers: {
    Authorization:
      "Bearer " +
      (localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
        : ""),
  },
});

axiosCarrito.interceptors.request.use(
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

export const fetchGetCarrito = () => {
  return axiosCarrito.get("", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchBuyCarrito = (carritoId: number) => {
  return axiosCarrito.patch(carritoId + "/", { comprado: true });
};

export const fetchPostCarrito = (formData: FormData) => {
  return axiosCarrito.post("", formData);
};

export const fetchPatchCarrito = (carritoId: number, formData: FormData) => {
  return axiosCarrito.patch(carritoId + "/", formData);
};

export const fetchDeleteCarrito = (carritoId: number) => {
  return axiosCarrito.delete(carritoId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
