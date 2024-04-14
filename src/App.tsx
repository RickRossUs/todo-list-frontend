// App.js
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { UsuarioProvider } from "./context/UsuarioContext";
import { AlertProvider } from "./context/AlertContext";
import { combineProviders } from "@/helpers/CombineHelper";
import Router from "./router/Router";
import "./App.css";

function App() {
  const CombinedProviders = combineProviders([
    AuthProvider,
    UsuarioProvider,
    AlertProvider,
  ]);

  return (
    <div className="App">
      <CombinedProviders>
        <Router />
      </CombinedProviders>
    </div>
  );
}

export default App;
