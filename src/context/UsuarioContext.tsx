import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  fetchGetMyPerfil,
  fetchUpdatePerfil,
  fetchRegisterUsuario,
  fetchDeleteUsuario,
} from "@/services/UsuariosService";

const UsuarioContext = createContext();

export default UsuarioContext;

export const UsuarioProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getPerfil = async () => {
    const response = await fetchGetMyPerfil();
    setUser(JSON.parse(response));
  };

  const registerUser = async (usuario) => {
    const response = await fetchRegisterUsuario(usuario)

    if (response) {
      setUser(JSON.parse(response));
      return true;
    } else {
      alert("Something went wrong while logging in the user!");
    }
    return false;
  };

  const updateUser = async (formData) => {
    const response = await fetchUpdatePerfil(user.id, formData)

    if (response) {
      setUser(JSON.parse(response));
      navigate("/perfil");
    } else {
      console.error("Error al eliminar el usuario:", response.statusText);
    }
  };

  const deleteUser = async () => {
    const response = await fetchDeleteUsuario(user.id)
    return response
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
