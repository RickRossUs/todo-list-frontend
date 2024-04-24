import { Producto } from './Producto';
import { UsuarioReducido } from './UsuarioReducido';

export interface Satisfaccion {
    id: number;
    usuario: UsuarioReducido;
    producto: Producto;
    calificacion: number;
}
