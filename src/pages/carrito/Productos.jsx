import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Chip,
  Tab,
  Tabs,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import "./Producto.css";
import HeaderProducto from "./HeaderProducto";
import { useLocation } from "react-router-dom";
import ProductosContext from "@/context/ProductosContext";
import CardProducto from "./CardProducto";
import Categorias from "./Categorias";

const Productos = () => {
  const { productos } = useContext(ProductosContext);
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/productos" && <HeaderProducto />}
      <Categorias />
      <Box
        className="container-items"
        sx={{
          width: "90%",
          mt: "0vh",
          mx: "5vw",
          display: "grid",
          mb: 3,
          gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
          rowGap: 2,
        }}
      >
        {productos.map((producto) => (
          <CardProducto producto={producto} key={producto.id} />
        ))}
      </Box>
    </div>
  );
};

export default Productos;
