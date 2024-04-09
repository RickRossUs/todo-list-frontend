import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginView from "../pages/LoginView";
import DashboardView from "../pages/DashboardView";
import TicketsView from "../pages/TicketsView";
import EventFormView from "../pages/EventFormView";
import ProtectedRoute from "./ProtectedRoute";
import CNavbar from "../components/CNavbar";

// Michell
import Home from "../pages/home/Home.jsx";
import LoginUno from "../pages/login/LoginUno.jsx";
import Register from "../pages/login/Register.jsx";
import Perfil from "../pages/perfil/Perfil.jsx";
import CrearPerfil from "../pages/perfil/CrearPerfil";
import CrearProducto from "@/pages/perfil/CrearProducto";
import CarritoContainer from "../pages/carrito/CarritoContainer.jsx";
import { CarritoProvider } from "@/context/CarritoContext";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginUno />} />
      <Route path="/register" element={<Register />} />
      <Route path="/carrito" element={<CarritoContainer />} />
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
