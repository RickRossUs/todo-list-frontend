import { createContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";
import { AlertContextValue } from "@/types/AlertContextValue";

const AlertContext = createContext<AlertContextValue | null>(null);

export default AlertContext;

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>("success");

  const showAlert = (msg: string, sev: 'success' | 'error' | 'warning' | 'info' = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
    setTimeout(() => setOpen(false), 4000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
