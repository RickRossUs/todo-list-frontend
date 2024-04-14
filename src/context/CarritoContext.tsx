import React, { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

const CarritoContext = createContext();

export default CarritoContext;

export const CarritoProvider = ({ children }) => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [carrito, setCarrito] = useState([]);
  const URL = import.meta.env.VITE_APP_API_URL + "/productos/compra/";

  const getCarrito = async () => {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      setCarrito(data);
    }
  };

  const buyCarrito = async (productoId: number) => {
    const existingItem = carrito.find((item) => item.producto.id === productoId);

    if (existingItem) {
      // If the product exists, call plusCarrito to increase the quantity
      await plusCarrito(existingItem.id, true);
    } else {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({ producto: productoId, cantidad: 1 }),
      });

      const newItem = await response.json(); // Assuming the server responds with the item details
      setCarrito([...carrito, newItem]);
    }
  };

  const plusCarrito = async (carritoId: number, plus: boolean) => {
    const itemIndex = carrito.findIndex((item) => item.id === carritoId);

    if (itemIndex !== -1) {
      const updatedItem = {
        ...carrito[itemIndex],
        cantidad: plus
          ? carrito[itemIndex].cantidad + 1
          : carrito[itemIndex].cantidad - 1,
      };

      const updatedCarrito = [...carrito];
      updatedCarrito[itemIndex] = updatedItem;
      setCarrito(updatedCarrito);

      if (updatedItem.cantidad === 0) {
        removeFromCarrito(carritoId);
      } else {
        const response = await fetch(URL + carritoId + "/", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({
            cantidad: updatedItem.cantidad,
          }),
        });
      }
    }
  };

  const removeFromCarrito = async (carritoId: number) => {
    const response = await fetch(URL + carritoId + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
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
