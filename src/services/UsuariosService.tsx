import axios from "axios";

const axiosUsuarios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/usuarios/",
  headers: {
    Authorization:
      "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
  },
});

axiosUsuarios.interceptors.response.use(
  function (response) {
    return JSON.stringify(response.data);
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
export const fetchGetPerfil = (userId) => {
  return axiosUsuarios.get(userId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchRegisterUsuario = async (usuario) => {
  return axiosUsuarios.post("", usuario, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchUpdatePerfil = async (userId, formData) => {
  return axiosUsuarios.patch(userId + "/", formData);
};

export const fetchDeleteUsuario = async (usuarioId) => {
  return axiosUsuarios.delete(usuarioId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
