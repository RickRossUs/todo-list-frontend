import { createContext, useState, useEffect, ReactNode } from "react";
import { AxiosResponse } from "axios";
import { Producto } from "../types/Producto";
import { Categoria } from "../types/Categoria";
import {
  fetchGetProductos,
  fetchGetProducto,
  fetchGetCategorias,
  fetchPostProducto,
  fetchUpdateProducto,
  fetchEliminarProducto,
} from "@/services/ProductosService";
import { fetchGetFavoritos } from "@/services/FavoritosService";
import { ProductosContextValue } from "@/types/ProductosContextValue";
import { OffsetResponse } from "@/types/OffsetResponse";

const ProductosContext = createContext<ProductosContextValue | null>(null);

export default ProductosContext;

export const ProductosProvider = ({ children }: { children: ReactNode }) => {
  const [productos, setProductos] = useState<Array<Producto>>([]);
  const [totalProductos, setTotalProductos] = useState<number>(0);
  const [categorias, setCategorias] = useState<Array<Categoria>>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number>(0);
  const [esFavorito, setEsFavorito] = useState<boolean>(false);

  const getProductos = async (
    search: string = "",
    categoriaId: number = 0,
    usuarioId: number = 0,
    limit: number = 20,
    offset: number = 0
  ) => {
    let response: AxiosResponse<OffsetResponse> = await fetchGetProductos(
      search,
      categoriaId,
      usuarioId,
      limit,
      offset
    );
    if (offset && offset !== 0)
      setProductos((prevProductos) => [
        ...prevProductos,
        ...response.data.results,
      ]);
    else setProductos(response.data.results);
    setTotalProductos(response.data.count);
    setSelectedCategoria(categoriaId);
  };

  const getProducto = async (productId: number) => {
    try {
      const response: AxiosResponse<Producto> = await fetchGetProducto(
        productId
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const getCategorias = async (userId: number) => {
    const response: AxiosResponse<Categoria[]> = await fetchGetCategorias(
      userId
    );
    setCategorias(response.data);
  };

  const postProducto = async (formData: FormData) => {
    const response = await fetchPostProducto(formData);
    if (response) return true;
    else return false;
  };

  const updateProducto = async (formData: FormData, productId: number) => {
    const response = await fetchUpdateProducto(formData, productId);
    if (response) return true;
    else return false;
  };

  const eliminarProducto = async (productId: number) => {
    await fetchEliminarProducto(productId);
    const productosActualizados = productos?.filter(
      (producto) => producto.id !== productId
    );
    setProductos(productosActualizados);
  };

  const toggleFavorito = (
    productoId: number,
    favoritoId: number,
    isFavorito: boolean
  ) => {
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

  const getFavoritos = async (
    nombre: string = "",
    categoriaId: number = 0,
    offset: number = 0
  ) => {
    const response: AxiosResponse<OffsetResponse> = await fetchGetFavoritos(
      nombre,
      categoriaId,
      offset
    );
    if (offset && offset !== 0)
      setProductos((prevProductos) => [
        ...prevProductos,
        ...response.data.results.map((item) => item.producto),
      ]);
    else setProductos(response.data.results.map((item) => item.producto));
    setTotalProductos(response.data.count);
    setSelectedCategoria(categoriaId || 0);
  };

  useEffect(() => {
    getCategorias(0);
  }, []);

  const value: ProductosContextValue = {
    productos,
    setProductos,
    totalProductos,
    setTotalProductos,
    categorias,
    setCategorias,
    selectedCategoria,
    setSelectedCategoria,
    getProductos,
    getProducto,
    getCategorias,
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
