import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin, fetchUpdateToken, fetchLogout } from "@/services/AuthService";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginUsuario = async (credentials) => {
    const token = await fetchLogin(credentials);
    localStorage.setItem("authTokens", token);
    setAuthTokens(token);
    return token;
  };

  const logoutUsuario = () => {
    fetchLogout();
    setAuthTokens(null);
    navigate("/");
  };

  let contextData = {
    authTokens: authTokens,
    loginUsuario: loginUsuario,
    logoutUsuario: logoutUsuario,
  };

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const tokens = localStorage.getItem("authTokens");
      if (tokens) {
        setAuthTokens(JSON.parse(tokens));
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
