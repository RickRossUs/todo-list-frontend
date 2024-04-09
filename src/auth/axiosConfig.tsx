import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// Función para obtener el token JWT del almacenamiento local
const getToken = () => localStorage.getItem('token');

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(null, (error) => {
  if (error.response.status ===  401) {
    // Aquí puedes manejar el error de autenticación, por ejemplo, redirigir al usuario a la página de inicio de sesión
  }
  return Promise.reject(error);
});

export default api;
