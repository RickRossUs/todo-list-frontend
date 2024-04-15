import React, { createContext, useState, useEffect, useContext } from "react";
import {
  fetchGetCarrito,
  fetchPostCarrito,
  fetchPatchCarrito,
  fetchDeleteCarrito,
} from "@/services/CarritoService";

const CarritoContext = createContext();

export default CarritoContext;

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const getCarrito = async () => {
    const response = await fetchGetCarrito();
    setCarrito(JSON.parse(response));
  };

  const buyCarrito = async (productoId: number) => {
    const existingItem = carrito.find(
      (item) => item.producto.id === productoId
    );

    if (existingItem) {
      await plusCarrito(existingItem.id, true);
    } else {
      const response = await fetchPostCarrito({
        producto: productoId,
        cantidad: 1,
      });

      setCarrito([...carrito, JSON.parse(response)]);
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
        await fetchPatchCarrito(carritoId, { cantidad: updatedItem.cantidad });
      }
    }
  };

  const removeFromCarrito = async (carritoId: number) => {
    const response = await fetchDeleteCarrito(carritoId);
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== carritoId)
    );
  };

  const value = {
    carrito: carrito,
    setCarrito: setCarrito,
    getCarrito: getCarrito,
    buyCarrito: buyCarrito,
    plusCarrito: plusCarrito,
    removeFromCarrito: removeFromCarrito,
  };

  useEffect(() => {
    getCarrito();
  }, []);

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
};
