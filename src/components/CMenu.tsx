import { useContext, useState } from "react";
import { Box, Fab } from "@mui/material";
import CAvatar from "./CAvatar";
import CShortItem from "./CShortItem";
import { CButton } from "./Button/CButton";
import AuthContext from "@/context/AuthContext";
import { AuthContextValue } from "../types/AuthContextValue";
import NotesContext from "@/context/NotesContext";
import { NotesContextValue } from "@/types/NotesContextValue";
import MenuIcon from "@mui/icons-material/Menu";

const CMenu = () => {
  const { logoutUsuario } = useContext(AuthContext) as AuthContextValue;
  const { getNotes, setChecked } = useContext(
    NotesContext
  ) as NotesContextValue;
  const [category, setCategory] = useState<string>("ToDo");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleClick = (check: string) => {
    setCategory(check);
    if (check == "ToDo") {
      setChecked(false);
      getNotes("false");
    } else {
      setChecked(true);
      getNotes("true");
    }
    setMenuOpen(false)
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: {
            lg: 250,
            xs: menuOpen ? "90%" : 0,
          },
          opacity: {
            lg: 1,
            xs: menuOpen ? 1 : 0,
          },
          position: {
            lg: "static",
            xs: "fixed",
          },
          height: "90vh",
          bgcolor: "white",
          border: "5px solid white",
          borderRadius: "10px 0 0 10px",
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
      >
        <CAvatar />
        <Box sx={{ height: "100%", width: "100%" }}>
          <CShortItem
            msg="ToDo"
            check={category == "ToDo"}
            onClick={() => {
              handleClick("ToDo");
            }}
          />
          <CShortItem
            msg="Checked"
            check={category == "Checked"}
            onClick={() => {
              handleClick("Checked");
            }}
          />
        </Box>
        <CButton
          msg="LogOut"
          onClick={() => {
            logoutUsuario();
          }}
        />
      </Box>
      {/* Botón en la parte inferior izquierda */}
      <Fab
        color="success"
        aria-label="menu"
        sx={{
          position: "fixed",
          bottom: "5vh",
          left: "5vw",
          width:60,
          height:60,
          display: { lg: "none", xs: "flex" },
        }}
        onClick={toggleMenu}
      >
        <MenuIcon />
      </Fab>
    </>
  );
};

export default CMenu;
