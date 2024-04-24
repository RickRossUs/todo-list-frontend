import { Producto } from './Producto';
import { UsuarioReducido } from './UsuarioReducido';

export interface Favorito {
    id: number;
    usuario: UsuarioReducido;
    producto: Producto;
}
