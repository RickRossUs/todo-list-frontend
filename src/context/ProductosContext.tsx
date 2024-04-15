import React, { createContext, useState, useEffect, useContext } from "react";
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
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(0);
  const location = useLocation();

  const getProductos = async (search) => {
    let response = await fetchGetProductos(search);
    setProductos(JSON.parse(response).results);
    setSelectedCategoria(0);
  };

  const getProducto = async (productId) => {
    try {
      const response = await fetchGetProducto(productId);
      return JSON.parse(response);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const getCategorias = async () => {
    const response = await fetchGetCategorias();
    setCategorias(JSON.parse(response));
  };

  const filterProductosByCategoria = async (categoriaId, usuarioId) => {
    let response = await fetchFilterProductosByCategoria(
      categoriaId,
      usuarioId
    );
    setProductos(JSON.parse(response));
    setSelectedCategoria(categoriaId);
  };

  const postProducto = async (formData) => {
    const response = await fetchPostProducto(formData);
    if (response) {
      getProductos();
    }
  };

  const updateProducto = async (formData, productId) => {
    const response = await fetchUpdateProducto(
      formData,
      productId,
    );
    if (response) {
      getProductos();
    }
  };

  const eliminarProducto = async (productId) => {
    const response = await fetchEliminarProducto(productId);
    const productosActualizados = productos?.filter(
      (producto) => producto.id !== productId
    );
    setProductos(productosActualizados);
  };

  const toggleFavorito = (productoId, favoritoId, isFavorito) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === productoId
          ? {
              ...producto,
              es_favorito: {
                is: isFavorito,
                id: favoritoId,
              },
            }
          : producto
      )
    );
  };

  const value = {
    productos,
    setProductos,
    categorias,
    selectedCategoria,
    setSelectedCategoria,
    getProductos,
    getProducto,
    getCategorias,
    filterProductosByCategoria,
    postProducto,
    updateProducto,
    eliminarProducto,
    toggleFavorito,
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
