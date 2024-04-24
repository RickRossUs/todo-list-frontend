export interface AlertContextValue {
  showAlert: (
    msg: string,
    sev?: "success" | "error" | "warning" | "info"
  ) => void;
}
