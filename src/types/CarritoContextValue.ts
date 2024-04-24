import { Carrito } from "./Carrito";

export interface CarritoContextValue {
    carrito: Array<Carrito>;
    setCarrito: React.Dispatch<React.SetStateAction<Carrito[]>>;
    getCarrito: () => Promise<void>;
    buyCarrito: (carritoId: number) => Promise<boolean>;
    addCarrito: (productoId: number) => Promise<void>;
    plusCarrito: (carritoId: number, plus: boolean) => Promise<void>;
    removeFromCarrito: (carritoId: number) => Promise<void>;
  }