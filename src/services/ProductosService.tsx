import axios from "axios";

const URL = import.meta.env.VITE_APP_API_URL + "/productos/";

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchGetProductos = (search, authTokens) => {
  return axios.get(
    URL + "?nombre=" + (search !== undefined ? search : "") + "&limit=20",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens),
      },
    }
  );
};

export const fetchGetProducto = (productId, authTokens) => {
  return axios.get(URL + productId + "/", {
    headers: {
      Authorization: "Bearer " + String(authTokens),
    },
  });
};

export const fetchGetCategorias = () => {
  return axios.get(URL + "categorias/", {
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchFilterProductosByCategoria = (
  categoriaId,
  usuarioId,
  authTokens
) => {
  return axios.get(
    URL +
      "?categoria=" +
      (categoriaId === 0 ? "" : categoriaId) +
      (location.pathname === "/productos" ? "" : "&usuario=" + usuarioId),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens),
      },
    }
  );
};

export const fetchPostProducto = (formData, authTokens) => {
  return axios.post(URL, formData, {
    headers: {
      Authorization: "Bearer " + String(authTokens),
    },
  });
};

export const fetchUpdateProducto = (formData, productId, authTokens) => {
  return axios.put(URL + productId + "/", formData, {
    headers: {
      Authorization: "Bearer " + String(authTokens),
    },
  });
};

export const fetchEliminarProducto = (productId, authTokens) => {
  return axios.delete(URL + productId + "/", {
    headers: {
      Authorization: "Bearer " + String(authTokens),
    },
  });
};
