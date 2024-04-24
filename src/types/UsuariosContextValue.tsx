import { Usuario } from "./Usuario";

export interface UsuariosContextValue {
    user: Usuario | null;
    setUser: React.Dispatch<React.SetStateAction<Usuario | null>>;
    getPerfil: () => Promise<void>;
    registerUser: (usuario: FormData) => Promise<boolean>;
    updateUser: (formData: FormData) => Promise<void>;
    deleteUser: () => Promise<any>;
  }