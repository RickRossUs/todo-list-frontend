import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, Paper, List, ListItem, ListItemText } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "@/auth/AuthContext";
import perfilDefault from "@/assets/img/Perfil//png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [active, setActive] = useState(false);
  const [usuarios, setUsaurios] = useState([]);
  const [search, setSearch] = useState("");
  const { authTokens, user, getImageSrc } = useContext(AuthContext);
  const textFieldRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    setIsExpanded(true);
    setActive(true);

    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const closeSearch = () => {
    setTimeout(() => {
      setIsExpanded(false);
      setActive(false);
    }, 300);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const getUsuarios = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/usuarios/?username=" + search + "&limit=10",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      const data = await response.json();
      if (data) {
        setUsaurios(data.results);
      }
    };

    getUsuarios();
  }, [search]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <SearchIcon
          sx={{
            color: "white",
            mr: isExpanded ? 1 : 0,
            cursor: "pointer",
            transition: "margin-right 0.5s ease-in-out",
          }}
          onClick={handleSearchIconClick}
        />
        <TextField
          id="standard-basic"
          label="Buscar usuarios"
          variant="standard"
          value={search}
          onBlur={() => {
            closeSearch();
          }}
          onChange={handleSearchChange}
          sx={{
            width: isExpanded ? "200px" : "0",
            transition: "all 0.5s ease-in-out",
            mb: 1,
            color: "white !important",
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "&.Mui-focused": {
              "& .MuiInputBase-input": {
                color: "white",
              },
            },
          }}
          InputProps={{
            classes: {
              notchedOutline: {
                borderColor: "white",
              },
            },
          }}
          inputRef={textFieldRef}
        />
      </Box>
      <Paper
        elevation={5}
        sx={{
          position: "absolute",
          right: 10,
          top: { xs: "60px", md: "" },
          zIndex: 2,
          minWidth: "20vh",
          maxWidth: { xs: "70vh", md: "80vh" },
          overflow: "auto",
          display: active ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          border: 10,
          borderColor: "white",
          borderRadius: 3,
        }}
      >
        {usuarios.length !== 0 ? (
          <>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                p: 0,
              }}
            >
              {usuarios
                .filter((usuario) => usuario.id !== user.id)
                .map((usuario) => (
                  <ListItem
                    className="ListItem"
                    onClick={() => {
                      navigate("/perfil/" + usuario.id + "/");
                    }}
                    key={usuario.id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      component="img"
                      src={
                        usuario.imagen
                          ? getImageSrc(usuario.imagen)
                          : perfilDefault
                      }
                      sx={{
                        width: { xs: "20%", md: "10%" },
                        aspectRatio: "1/1",
                        borderRadius: 2,
                        mr: 2,
                        objectFit: "cover",
                      }}
                    ></Box>
                    <ListItemText
                      sx={{
                        pointerEvents: "none",
                        display: { xs: "none", md: "block" },
                      }}
                    >
                      {usuario.username}
                    </ListItemText>
                  </ListItem>
                ))}
            </List>
          </>
        ) : (
          <>
            <Box component="i" sx={{ p: 2 }}>
              No hay usuarioos añadidos
            </Box>
          </>
        )}
      </Paper>
    </>
  );
}

export default SearchBar;
