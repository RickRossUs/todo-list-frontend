import { Direccion } from './Direccion';
import { Producto } from './Producto';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  imagen: string | null;
  direccion: Direccion | null;
  productos: Array<Producto>
}
