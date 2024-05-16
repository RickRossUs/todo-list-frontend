import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import { AlertProvider } from "./context/AlertContext";
import { combineProviders } from "@/helpers/CombineHelper";
import { UsuarioProvider } from "./context/UsuarioContext";
import Router from "./router/Router";
import "./App.css";

function App(): React.ReactElement {
  const CombinedProviders = combineProviders([
    AuthProvider,
    UsuarioProvider,
    NotesProvider,
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
