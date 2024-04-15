import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchLogin,
  fetchUpdateToken,
  fetchLogout,
} from "@/services/AuthService";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(
    () => JSON.parse(localStorage.getItem("authTokens")) || null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginUsuario = async (credentials) => {
    const response = await fetchLogin(credentials);
    const data = JSON.parse(response);
    localStorage.setItem("authTokens", JSON.stringify(data.token));
    setAuthTokens(data.token);
    return data.token;
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
      const tokens = JSON.parse(localStorage.getItem("authTokens"));
      if (tokens) {
        setAuthTokens(tokens);
        await fetchUpdateToken(tokens.refresh);
      }
      setLoading(false);
    };

    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
