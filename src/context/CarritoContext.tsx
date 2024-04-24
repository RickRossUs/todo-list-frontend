import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { AxiosResponse } from "axios";
import {
  fetchGetCarrito,
  fetchBuyCarrito,
  fetchPostCarrito,
  fetchPatchCarrito,
  fetchDeleteCarrito,
} from "@/services/CarritoService";
import AuthContext from "@/context/AuthContext";
import { Carrito } from "@/types/Carrito";
import { CarritoContextValue } from "@/types/CarritoContextValue";
import { AuthContextValue } from "@/types/AuthContextValue";

const CarritoContext = createContext<CarritoContextValue | null>(null);

export default CarritoContext;

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<Array<Carrito>>([]);
  const { authTokens } = useContext(AuthContext) as AuthContextValue;

  const getCarrito = async () => {
    const response: AxiosResponse<Carrito[]> = await fetchGetCarrito();
    setCarrito(response.data);
  };

  const buyCarrito = async (carritoId: number) => {
    try{
      await fetchBuyCarrito(carritoId);
      setCarrito([]);
      return true
    } catch (err) {
      console.log(err);
      return false
    }
  };
  const addCarrito = async (productoId: number) => {
    const existingItem = carrito.find(
      (item) => item.producto.id === productoId
    );

    if (existingItem) {
      await plusCarrito(existingItem.id, true);
    } else {
      const formData = new FormData();
      formData.append("producto", productoId.toString());
      formData.append("cantidad", "1");
      const response: AxiosResponse<Carrito> = await fetchPostCarrito(formData);

      setCarrito([...carrito, response.data]);
    }
  };

  const plusCarrito = async (carritoId: number, plus: boolean) => {
    const itemIndex = carrito.findIndex((item) => item.id === carritoId);

    if (itemIndex !== -1) {
      const updatedItem = {
        ...carrito[itemIndex],
        cantidad: carrito[itemIndex].cantidad + (plus ? 1 : -1),
      };

      setCarrito(
        carrito.map((item, index) => (index === itemIndex ? updatedItem : item))
      );

      if (updatedItem.cantidad === 0) {
        removeFromCarrito(carritoId);
      } else {
        const formData = new FormData();
        formData.append("cantidad", updatedItem.cantidad.toString());
        await fetchPatchCarrito(carritoId, formData);
      }
    }
  };

  const removeFromCarrito = async (carritoId: number) => {
    await fetchDeleteCarrito(carritoId);
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== carritoId)
    );
  };

  const value = {
    carrito,
    setCarrito,
    getCarrito,
    buyCarrito,
    addCarrito,
    plusCarrito,
    removeFromCarrito,
  };

  useEffect(() => {
    if (authTokens) getCarrito();
  }, []);

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
};
