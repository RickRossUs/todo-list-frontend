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
  fetchGetFavoritos,
} from "@/services/ProductosService";

const ProductosContext = createContext();

export default ProductosContext;

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);
  const location = useLocation();

  const getProductos = async (search, limit, offset) => {
    let response = await fetchGetProductos(search, limit, offset);
    if (offset && offset !== 0)
      setProductos((prevProductos) => [
        ...prevProductos,
        ...JSON.parse(response).results,
      ]);
    else setProductos(JSON.parse(response).results);
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

  const getCategorias = async (userId) => {
    const response = await fetchGetCategorias(userId);
    setCategorias(JSON.parse(response));
  };

  const filterProductosByCategoria = async (
    categoriaId,
    usuarioId = 0,
    offset
  ) => {
    let response = await fetchFilterProductosByCategoria(
      categoriaId,
      usuarioId,
      offset
    );
    if (offset && offset !== 0)
      setProductos((prevProductos) => [
        ...prevProductos,
        ...JSON.parse(response).results,
      ]);
    else setProductos(JSON.parse(response).results);
    setSelectedCategoria(categoriaId || 0);
  };

  const postProducto = async (formData) => {
    const response = await fetchPostProducto(formData);
    if (response) {
      getProductos();
    }
  };

  const updateProducto = async (formData, productId) => {
    const response = await fetchUpdateProducto(formData, productId);
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

  const getFavoritos = async (nombre, categoriaId, offset) => {
    const response = await fetchGetFavoritos(nombre, categoriaId, offset);
    setProductos(JSON.parse(response).map((item) => item.producto));
    setSelectedCategoria(categoriaId || 0);
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const value = {
    productos,
    setProductos,
    categorias,
    setCategorias,
    selectedCategoria,
    setSelectedCategoria,
    getProductos,
    getProducto,
    getCategorias,
    filterProductosByCategoria,
    postProducto,
    updateProducto,
    eliminarProducto,
    esFavorito,
    setEsFavorito,
    toggleFavorito,
    getFavoritos,
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};
