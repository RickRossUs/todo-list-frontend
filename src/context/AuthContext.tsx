import { createContext, useState, useEffect, ReactNode } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import {
  fetchLogin,
  fetchUpdateToken,
  fetchLogout,
} from "@/services/AuthService";
import { AuthContextValue } from "@/types/AuthContextValue";
import { AuthTokens } from "@/types/AuthTokens";

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
      : ""
  );
  const navigate = useNavigate();

  const loginUsuario = async (credentials: FormData) => {
    const response: AxiosResponse<AuthTokens> = await fetchLogin(credentials);
    localStorage.setItem("authTokens", JSON.stringify(response.data.token));
    setAuthTokens(response.data.token);
    return response.data.token;
  };

  const logoutUsuario = () => {
    fetchLogout();
    setAuthTokens(null);
    navigate("/");
  };

  const contextData = {
    authTokens: authTokens,
    loginUsuario: loginUsuario,
    logoutUsuario: logoutUsuario,
  };

  useEffect(() => {
    const loadUserFromStorage = async () => {
      setAuthTokens(tokens);
      await fetchUpdateToken(tokens.refresh);
    };

    const tokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "{}")
      : "";
    if (tokens) loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
