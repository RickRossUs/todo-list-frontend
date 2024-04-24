import axios from "axios";

const axiosUsuarios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/usuarios/",
});

axiosUsuarios.interceptors.request.use(
  function (config) {
    const authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "{}").access
      : null;
    if (authTokens) {
      config.headers.Authorization = `Bearer ${authTokens}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchGetMyPerfil = () => {
  return axiosUsuarios.get("self/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchGetPerfiles = (search = "") => {
  return axiosUsuarios.get("?username=" + search + "&limit=10", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchGetPerfil = (userId: number) => {
  return axiosUsuarios.get(userId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchRegisterUsuario = async (usuario: FormData) => {
  return axiosUsuarios.post("", usuario, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchUpdatePerfil = async (userId: number, formData: FormData) => {
  return axiosUsuarios.patch(userId + "/", formData);
};

export const fetchDeleteUsuario = async (usuarioId: number) => {
  return axiosUsuarios.delete(usuarioId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchDireccion = async (
  direccionId: number,
  direccion: FormData
) => {
  return axiosUsuarios.patch("direccion/" + direccionId + "/", direccion, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
