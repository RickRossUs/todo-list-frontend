import React, { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "../auth/AuthContext";

const ProductosContext = createContext();

export default ProductosContext;

export const ProductosProvider = ({ children }) => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(0);

  const getProductos = async () => {
    let response = await fetch("http://127.0.0.1:8000/productos/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (data) {
      setProductos(data);
      setSelectedCategoria(0);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const getCategorias = async () => {
    try {
      const URL = "http://127.0.0.1:8000/productos/categorias/";

      const response = await fetch(URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const filterProductos = async (searchParam) => {
    let response = await fetch("http://127.0.0.1:8000/productos/" + searchParam, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setProductos(data);
    }
  };
  const filterProductosByCategoria = async (categoriaId) => {
    let response = await fetch("http://127.0.0.1:8000/productos/?categoria=" + categoriaId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setProductos(data);
      setSelectedCategoria(categoriaId);
    }
  };

  const myProductos = async (searchParam) => {
    let response = await fetch("http://127.0.0.1:8000/productos/myProductos/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setProductos(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const postProducto = async (Producto) => {
    const response = await fetch("http://127.0.0.1:8000/productos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(Producto),
    });
    const newTicket = await response.json();
    setProductos(newTicket);
  };

  const deleteProducto = async (id) => {
    const response = await fetch("http://127.0.0.1:8000/productos/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(id),
    });
    const newTicket = await response.json();
    setProductos(newTicket);
  };

  const value = {
    productos: productos,
    setProductos: setProductos,
    categorias: categorias,
    selectedCategoria: selectedCategoria,
    setSelectedCategoria: setSelectedCategoria,
    getProductos: getProductos,
    getCategorias: getCategorias,
    filterProductos: filterProductos,
    filterProductosByCategoria: filterProductosByCategoria,
    myProductos: myProductos,
    postProducto: postProducto,
    deleteProducto: deleteProducto,
  };

  useEffect(() => {
    getProductos();
    getCategorias()
  }, []);

  return (
    <ProductosContext.Provider value={value}>{children}</ProductosContext.Provider>
  );
};
