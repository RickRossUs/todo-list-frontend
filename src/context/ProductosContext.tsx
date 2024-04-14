import React, { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { useLocation } from "react-router-dom";
import {
  fetchGetProductos,
  fetchGetProducto,
  fetchGetCategorias,
  fetchFilterProductosByCategoria,
  fetchPostProducto,
  fetchUpdateProducto,
  fetchEliminarProducto,
} from "@/services/ProductosService";

const ProductosContext = createContext();

export default ProductosContext;

export const ProductosProvider = ({ children }) => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(0);
  const location = useLocation();
  const URL = import.meta.env.VITE_APP_API_URL + "/productos/";

  const getProductos = async (search) => {
    let response = await fetchGetProductos(search, authTokens.access);

    if (response) {
      setProductos(response.results);
      setSelectedCategoria(0);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const getProducto = async (productId) => {
    try {
      const response = await fetchGetProducto(productId, authTokens.access)
      return response;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const getCategorias = async () => {
    try {
      const response = await fetchGetCategorias()
      setCategorias(response);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const filterProductosByCategoria = async (categoriaId, usuarioId) => {
    let response = await fetchFilterProductosByCategoria(categoriaId, usuarioId, authTokens.access)
    setProductos(response);
    setSelectedCategoria(categoriaId);
  };

  const postProducto = async (formData) => {
    const response = await fetchPostProducto(formData, authTokens.access)
    if(response) {
      getProductos();
    }
  };

  const updateProducto = async (formData, productId) => {
    const response = await fetchUpdateProducto(formData, productId, authTokens.access)
    console.log(response);
    if(response.status === 200) {
      getProductos();
    }
  };

  const eliminarProducto = async (productId) => {
    const response = await fetchEliminarProducto(productId, authTokens.access)
    const productosActualizados = productos?.filter(
      (producto) => producto.id !== productId
    );
    setProductos(productosActualizados);
  };

  const value = {
    productos: productos,
    setProductos: setProductos,
    categorias: categorias,
    selectedCategoria: selectedCategoria,
    setSelectedCategoria: setSelectedCategoria,
    getProductos: getProductos,
    getProducto: getProducto,
    getCategorias: getCategorias,
    filterProductosByCategoria: filterProductosByCategoria,
    postProducto: postProducto,
    updateProducto: updateProducto,
    eliminarProducto: eliminarProducto,
  };

  useEffect(() => {
    if (location.pathname === "/productos") {
      getProductos();
    }
    getCategorias();
  }, []);

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};
