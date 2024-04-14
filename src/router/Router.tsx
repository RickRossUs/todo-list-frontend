import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Perfil from "../pages/Perfil";
import CrearPerfil from "../pages/CrearPerfil";
import CrearProducto from "@/pages/CrearProducto";
import Productos from "../pages/Productos";
import { CarritoProvider } from "@/context/CarritoContext";
import { ProductosProvider } from "@/context/ProductosContext";
import { combineProviders } from "@/helpers/CombineHelper";

const Router = () => {
  const CombinedProviders = combineProviders([
    CarritoProvider,
    ProductosProvider,
  ]);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/productos"
        element={
          <CombinedProviders>
            <Productos />
          </CombinedProviders>
        }
      />
      <Route
        path="/crear-producto/:productId?"
        element={
          <ProductosProvider>
            <CrearProducto />
          </ProductosProvider>
        }
      />
      <Route
        path="/perfil/:userId?"
        element={
          <ProtectedRoute>
            <CombinedProviders>
              <Perfil />
            </CombinedProviders>
          </ProtectedRoute>
        }
      />
      <Route
        path="/detalles-perfil"
        element={
          <ProtectedRoute>
            <CrearPerfil />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
