import { Producto } from './Producto';
import { UsuarioReducido } from './UsuarioReducido';

export interface Carrito {
    id: number;
    usuario: UsuarioReducido;
    producto: Producto;
    cantidad: number;
    comprado: boolean;
}
