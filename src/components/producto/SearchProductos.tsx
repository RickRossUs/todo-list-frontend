import { useState, useContext, useRef, useEffect } from "react";
import {
  Box,
  TextField
} from "@mui/material";
import ProductosContext from "@/context/ProductosContext";
import AuthContext from "@/context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";

const SearchProductos = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textFieldRef = useRef(null);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const { productos, getProductos, getFavoritos, esFavorito } = useContext(ProductosContext);
  const { authTokens } = useContext(AuthContext);

  const handleSearchIconClick = () => {
    if (!active) {
      setIsExpanded(true);
      setActive(true);
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
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
    if (esFavorito) getFavoritos(search, "", 0)
    else getProductos(search);
  }, [search]);

  return (
    <div>
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
            mr: 2,
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
    </div>
  );
};

export default SearchProductos;
