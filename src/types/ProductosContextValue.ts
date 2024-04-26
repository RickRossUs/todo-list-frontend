import { Categoria } from "./Categoria";
import { Producto } from "./Producto";

export interface ProductosContextValue {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
  totalProductos: number;
  setTotalProductos: React.Dispatch<React.SetStateAction<number>>;
  categorias: Categoria[];
  setCategorias: React.Dispatch<React.SetStateAction<Categoria[]>>;
  selectedCategoria: number;
  setSelectedCategoria: React.Dispatch<React.SetStateAction<number>>;
  esFavorito: boolean;
  setEsFavorito: React.Dispatch<React.SetStateAction<boolean>>;
  getProductos: (
    search?: string,
    categoriaId?: number,
    usuarioId?: number,
    limit?: number,
    offset?: number
  ) => Promise<void>;
  getProducto: (productId: number) => Promise<Producto | undefined>;
  getCategorias: (userId: number) => Promise<void>;
  postProducto: (formData: FormData) => Promise<boolean>;
  updateProducto: (formData: FormData, productId: number) => Promise<boolean>;
  eliminarProducto: (productId: number) => Promise<void>;
  toggleFavorito: (
    productoId: number,
    favoritoId: number,
    isFavorito: boolean
  ) => void;
  getFavoritos: (
    nombre?: string,
    categoriaId?: number,
    offset?: number
  ) => Promise<void>;
}
