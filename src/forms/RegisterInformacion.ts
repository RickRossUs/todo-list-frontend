export const RegisterInformacion = [
  {
    name: "username",
    label: "Usuario",
    rules: {
      required: "Username requerido",
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
      required: "Correo requerido",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Correo no válido",
      },
    },
    type: "email",
  },
  {
    name: "password",
    label: "Contraseña",
    rules: {
      required: "Contraseña requerida",
      minLength: {
        value: 8,
        message: "La contraseña debe tener al menos 8 caracteres",
      },
      validate: {
        hasUppercase: (value: string) =>
          /[A-Z]/.test(value) ||
          "La contraseña debe contener al menos una letra mayúscula",
        hasSpecialChar: (value: string) =>
          /[@$!%*?&.]/.test(value) ||
          "La contraseña debe contener al menos un carácter especial",
        hasLowercase: (value: string) =>
          /[a-z]/.test(value) ||
          "La contraseña debe contener al menos una letra minúscula",
        hasNumber: (value: string) =>
          /\d/.test(value) || "La contraseña debe contener al menos un número",
      },
    },
    type: "password",
  },
  {
    name: "passwordConfirm",
    label: "Verificar contraseña",
    rules: {
      required: "Confirmación de contraseña requerida",
    },
    type: "password",
  },
];
