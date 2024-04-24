import axios from "axios";

const axiosProductos = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/productos/",
});

export const fetchGetProductos = (
  search = "",
  categoriaId: number,
  usuarioId: number,
  limit = 20,
  offset = 0
) => {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };
  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
    : null;
  if (authTokens) {
    headers.Authorization = `Bearer ${authTokens}`;
  }

  return axiosProductos.get(
    "?nombre=" +
      search +
      "&categoria=" +
      (categoriaId === 0 ? "" : categoriaId) +
      (location.pathname === "/productos"
        ? ""
        : "&usuario=" + (usuarioId !== 0 ? usuarioId : "")) +
      "&limit=" +
      limit +
      "&offset=" +
      offset,
    { headers }
  );
};

export const fetchGetProducto = (productId: number) => {
  return axiosProductos.get(productId + "/", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        String(
          (localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
            : ""
          )
        ),
    },
  });
};

export const fetchGetCategorias = (userId: number) => {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };
  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
    : null;
  if (authTokens) {
    headers.Authorization = `Bearer ${authTokens}`;
  }

  return axiosProductos.get(
    "categorias/?usuario=" + (userId !== 0 ? userId : ""),
    { headers }
  );
};

export const fetchPostProducto = (formData: FormData) => {
  return axiosProductos.post("", formData, {
    headers: {
      Authorization:
        "Bearer " +
        String(
          (localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
            : ""
          )
        ),
    },
  });
};

export const fetchUpdateProducto = (formData: FormData, productId: number) => {
  return axiosProductos.put(productId + "/", formData, {
    headers: {
      Authorization:
        "Bearer " +
        String(
          (localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
            : ""
          )
        ),
    },
  });
};

export const fetchEliminarProducto = (productId: number) => {
  return axiosProductos.delete(productId + "/", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        String(
          (localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
            : ""
          )
        ),
    },
  });
};
