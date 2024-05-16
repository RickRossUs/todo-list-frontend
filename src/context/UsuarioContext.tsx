import { createContext, useState, useEffect, ReactNode } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../types/Usuario";
import {
  fetchGetMyPerfil,
  fetchUpdatePerfil,
  fetchRegisterUsuario,
  fetchDeleteUsuario,
} from "@/services/UsuariosService";
import { UsuariosContextValue } from "@/types/UsuariosContextValue";

const UsuarioContext = createContext<UsuariosContextValue | null>(null);

export default UsuarioContext;

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  let [user, setUser] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  const getPerfil = async () => {
    const response: AxiosResponse<Array<Usuario>> = await fetchGetMyPerfil();
    console.log(response.data)
    setUser(response.data[0]);
  };

  const registerUser = async (usuario: FormData, onSuccess: (data: FormData) => any): Promise<boolean> => {
    try {
      const response: AxiosResponse<Usuario> = await fetchRegisterUsuario(usuario);
      setUser(response.data);
      if (response) {
        onSuccess(usuario);
        return true
      }
      return false;
    } catch (error) {
      console.error("Something went wrong while registering the user:", error);
      return false;
    }
  };

  const updateUser = async (formData: FormData) => {
    const response: AxiosResponse<Usuario> = await fetchUpdatePerfil(
      user?.id || 0,
      formData
    );

    if (response) {
      setUser(response.data);
      navigate(-1);
    } else {
      console.error("Error al eliminar el usuario:", response);
    }
  };

  const deleteUser = async () => {
    const response = await fetchDeleteUsuario(user?.id || 0);
    return response;
  };

  let contextData: UsuariosContextValue = {
    user: user,
    setUser: setUser,
    getPerfil: getPerfil,
    registerUser: registerUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
  };

  useEffect(() => {
    const tokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
      : "";
    if (tokens) getPerfil();
  }, []);

  return (
    <UsuarioContext.Provider value={contextData}>
      {children}
    </UsuarioContext.Provider>
  );
};
