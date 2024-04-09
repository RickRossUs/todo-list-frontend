import React, { useState, useEffect, useContext } from "react";
import HeaderCarrito from "./HeaderCarrito";
import Carrito from "./Carrito";
import AuthContext from "@/auth/AuthContext";
import { CarritoProvider } from "@/context/CarritoContext";

const CarritoContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const URL = "http://127.0.0.1:8000/";
        let headers = {
          "Content-Type": "application/json",
        };

        if (authTokens) {
          headers.Authorization = "Bearer " + String(authTokens.access);
        }

        const response = await fetch(URL + "productos/", {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CarritoProvider>
          <HeaderCarrito />
          <Carrito products={products} setProducts={setProducts} />
        </CarritoProvider>
      )}
    </div>
  );
};

export default CarritoContainer;
