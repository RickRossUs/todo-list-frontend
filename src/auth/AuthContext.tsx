import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPerfil = async () => {
    try {
      const URL = "http://127.0.0.1:8000/usuarios/self/";

      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      });
      const data = await response.json();

      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } else {
        console.error("Error al eliminar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  let loginUser = async ({ username, password }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error de autenticación: ${response.statusText}`);
      }

      let data = await response.json();

      if (data) {
        localStorage.setItem("authTokens", JSON.stringify(data.token));
        setAuthTokens(data.token);
        return true;
      } else {
        throw new Error("No se pudo obtener el token de autenticación.");
      }
    } catch (error) {
      console.error("Error al autenticar al usuario:", error);
      alert("Error al autenticar al usuario: " + error.message);
      return false;
    }
  };

  let registerUser = async (usuario) => {
    const response = await fetch("http://127.0.0.1:8000/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    let data = await response.json();

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return true;
    } else {
      alert("Something went wrong while logging in the user!");
    }
    return false;
  };

  const updateUser = async (formData) => {
    const response = await fetch(
      "http://127.0.0.1:8000/usuarios/" + user.id + "/",
      {
        method: "PATCH",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: formData,
      }
    );
    let data = await response.json();

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/perfil");
    } else {
      console.error("Error al eliminar el usuario:", response.statusText);
    }
  };

  const deleteUser = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/usuarios/" + user.id + "/",
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    if (response.ok) {
      // localStorage.setItem("authTokens", JSON.stringify(data.token));
      logoutUser();
    } else {
      console.error("Error al eliminar el usuario:", response.statusText);
    }
  };

  const updateToken = async () => {
    const response = await fetch("http://127.0.0.1:8000/auth/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
    fetchPerfil();

    if (loading) {
      setLoading(false);
    }
  };

  let logoutUser = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    setAuthTokens(null);
    setUser(null);
    navigate("/");
  };

  function getImageSrc(imagen) {
    try {
      new URL(imagen);
      return imagen;
    } catch (_) {
      return "http://127.0.0.1:8000" + imagen;
    }
  }

  let contextData = {
    user: user,
    setUser: setUser,
    authTokens: authTokens,
    fetchPerfil: fetchPerfil,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getImageSrc: getImageSrc,
  };

  useEffect(() => {
    if (loading && authTokens) {
      updateToken();
    }
    if (authTokens) {
      fetchPerfil();
    }
    localStorage.setItem("user", JSON.stringify(user));

    const REFRESH_INTERVAL = 1000 * 60 * 60; // 60 minutes
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
