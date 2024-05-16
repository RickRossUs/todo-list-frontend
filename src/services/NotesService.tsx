import axios from "axios";

const axiosNotes = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/notes/",
});

axiosNotes.interceptors.request.use(
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

export const fetchGetNotes = (check:string) => {
  return axiosNotes.get("?check="+check, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchRegisterNotes = async (usuario: FormData) => {
  return axiosNotes.post("", usuario, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchUpdateNotes = async (userId: number, formData: FormData) => {
  return axiosNotes.patch(userId + "/", formData);
};

export const fetchDeleteNotes = async (usuarioId: number) => {
  return axiosNotes.delete(usuarioId + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

