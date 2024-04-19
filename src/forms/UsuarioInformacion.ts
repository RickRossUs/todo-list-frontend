export const UsuarioInformacion = [
  {
    name: "username",
    label: "Nombre de usuario",
    rules: {
      required: "Nombre es requerido",
      minLength: {
        value: 6,
        message: "Min 6 caracteres",
      },
    },
    type: "text",
  },
  {
    name: "email",
    label: "Correo",
    rules: {
      required: "Correo es requerido",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Correo no válido",
      },
    },
    type: "text",
  },
  {
    name: "first_name",
    label: "Nombre",
    rules: {},
    type: "text",
  },
  {
    name: "last_name",
    label: "Apellidos",
    rules: {},
    type: "text",
  },
];
