// App.js
import React from "react";
import { AuthProvider } from "./auth/AuthContext"; // Asegúrate de que la ruta de importación es correcta
import Router from "./router/Router";
import { AlertProvider } from "./context/AlertContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AlertProvider>
          <Router />
        </AlertProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
