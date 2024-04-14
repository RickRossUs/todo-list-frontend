import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UsuarioContext = createContext();

export default UsuarioContext;

export const UsuarioProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_APP_API_URL + "/usuarios/";
  
  const getPerfil = async () => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    try {
      const response = await fetch(URL + "self/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
      });
      const data = await response.json();

      if (data) {
        setUser(data);
      } else {
        console.error("Error al eliminar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  let registerUser = async (usuario) => {
    const response = await fetch(URL + "/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    let data = await response.json();

    if (data) {
      setUser(data);
      return true;
    } else {
      alert("Something went wrong while logging in the user!");
    }
    return false;
  };

  const updateUser = async (formData, token) => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const response = await fetch(URL + "/usuarios/" + user.id + "/", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + authTokens.access,
      },
      body: formData,
    });
    let data = await response.json();

    if (data) {
      setUser(data);
      navigate("/perfil");
    } else {
      console.error("Error al eliminar el usuario:", response.statusText);
    }
  };

  const deleteUser = async (token) => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const response = await fetch(URL + "/usuarios/" + user.id + "/", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authTokens.access,
      },
    });
  };

  let contextData = {
    user: user,
    setUser: setUser,
    getPerfil: getPerfil,
    registerUser: registerUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
  };

  useEffect(() => {
    getPerfil();
  }, []);

  return (
    <UsuarioContext.Provider value={contextData}>
      {children}
    </UsuarioContext.Provider>
  );
};
