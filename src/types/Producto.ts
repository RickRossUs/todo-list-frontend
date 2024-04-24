import { UsuarioReducido } from "./UsuarioReducido";
import { Categoria } from "./Categoria";
import { Es_Favorito } from "./Es_Favorito";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  categoria: Categoria;
  usuario: UsuarioReducido;
  promedio_satisfaccion: number;
  es_favorito: Es_Favorito;
}
