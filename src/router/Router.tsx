import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginView from "../pages/LoginView";
import DashboardView from "../pages/DashboardView";
import TicketsView from "../pages/TicketsView";
import EventFormView from "../pages/EventFormView";
import ProtectedRoute from "./ProtectedRoute";
import CNavbar from "../components/CNavbar";

// Michell
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import Perfil from "../pages/perfil/Perfil";
import CrearPerfil from "../pages/perfil/CrearPerfil";
import CrearProducto from "@/pages/perfil/CrearProducto";
import Productos from "../pages/carrito/Productos";
import { CarritoProvider } from "@/context/CarritoContext";
import { ProductosProvider } from "@/context/ProductosContext";

const Router = () => {
  const compose = (providers) =>
    providers.reduce((Prev, Curr) => ({ children }) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ));

  const CombinedProviders = compose([CarritoProvider, ProductosProvider]);
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
