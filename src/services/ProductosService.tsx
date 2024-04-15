import axios from "axios";

const axiosProductos = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/",
  headers: {
    Authorization:
      "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
  },
});

axiosProductos.interceptors.response.use(
  function (response) {
    return JSON.stringify(response.data) || JSON.stringify(response);
  },
  function (error) {
    alert(error);
    return Promise.reject(error);
  }
);

export const fetchGetProductos = (search) => {
  return axiosProductos.get(
    "?nombre=" + (search !== undefined ? search : "") + "&limit=20",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const fetchGetProducto = (productId) => {
  return axiosProductos.get(productId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchGetCategorias = () => {
  return axiosProductos.get("categorias/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchFilterProductosByCategoria = (categoriaId, usuarioId) => {
  return axiosProductos.get(
    "?categoria=" +
      (categoriaId === 0 ? "" : categoriaId) +
      (location.pathname === "/productos" ? "" : "&usuario=" + usuarioId),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const fetchPostProducto = (formData) => {
  return axiosProductos.post("", formData);
};

export const fetchUpdateProducto = (formData, productId) => {
  return axiosProductos.put(productId + "/", formData);
};

export const fetchEliminarProducto = (productId) => {
  return axiosProductos.delete(productId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
