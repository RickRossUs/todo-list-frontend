import { AuthTokens } from "./AuthTokens";

export interface AuthContextValue {
  authTokens: AuthTokens;
  loginUsuario: (credentials: any) => Promise<any>;
  logoutUsuario: () => void;
}
