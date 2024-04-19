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

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/productos/:favorito?"
        element={
          <CarritoProvider>
            <Productos />
          </CarritoProvider>
        }
      />
      <Route path="/crear-producto/:productId?" element={<CrearProducto />} />
      <Route
        path="/perfil/:userId?"
        element={
          <ProtectedRoute>
            <CarritoProvider>
              <Perfil />
            </CarritoProvider>
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
