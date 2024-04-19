import axios from "axios";

const axiosProductos = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/",
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

export const fetchGetProductos = (search = "", limit = 20, offset = 0) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  if (authTokens && authTokens.access) {
    headers["Authorization"] = `Bearer ${authTokens.access}`;
  }

  return axiosProductos.get(
    `?nombre=${search}&limit=${limit}&offset=${offset}`,
    { headers }
  );
};

export const fetchGetProducto = (productId) => {
  return axiosProductos.get(productId + "/", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        String(JSON.parse(localStorage.getItem("authTokens"))?.access),
    },
  });
};

export const fetchGetCategorias = (userId = "") => {
  const headers = {
    "Content-Type": "application/json",
  };
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  if (authTokens && authTokens.access) {
    headers["Authorization"] = `Bearer ${authTokens.access}`;
  }

  return axiosProductos.get("categorias/?usuario=" + userId, { headers });
};

export const fetchFilterProductosByCategoria = (
  categoriaId,
  usuarioId = "",
  offset = 0
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  if (authTokens && authTokens.access) {
    headers["Authorization"] = `Bearer ${authTokens.access}`;
  }

  return axiosProductos.get(
    "?categoria=" +
      (categoriaId === 0 ? "" : categoriaId) +
      (location.pathname === "/productos" ? "" : "&usuario=" + usuarioId) +
      "&limit=20&offset=" +
      offset,
    { headers }
  );
};

export const fetchPostProducto = (formData) => {
  return axiosProductos.post("", formData, {
    headers: {
      Authorization:
        "Bearer " +
        String(JSON.parse(localStorage.getItem("authTokens"))?.access),
    },
  });
};

export const fetchUpdateProducto = (formData, productId) => {
  return axiosProductos.put(productId + "/", formData, {
    headers: {
      Authorization:
        "Bearer " +
        String(JSON.parse(localStorage.getItem("authTokens"))?.access),
    },
  });
};

export const fetchEliminarProducto = (productId) => {
  return axiosProductos.delete(productId + "/", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        String(JSON.parse(localStorage.getItem("authTokens"))?.access),
    },
  });
};

export const fetchGetFavoritos = (
  nombre = "",
  categoriaId = "",
  offset = ""
) => {
  return axiosProductos.get(
    `/favoritos/?nombre=${nombre}&categoria=${categoriaId === 0 ? "" : categoriaId}&limit=20&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
    }
  );
};
