import { useState, useEffect, useContext } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import ProductosContext from "@/context/ProductosContext";

const Categorias = () => {
  const { categorias, selectedCategoria, setSelectedCategoria, getProductos, filterProductosByCategoria } = useContext(ProductosContext);

  const handleCategoria = (e, newValue) => {
    if (newValue === 0) {
      getProductos();
    } else {
      filterProductosByCategoria(newValue)
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          mt: 10,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            borderBottom: 2,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs value={selectedCategoria} onChange={handleCategoria}>
            <Tab label="Todo" />
            {categorias.map((categoria) => (
              <Tab
                label={categoria.nombre}
                value={categoria.id}
                key={categoria.id}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};

export default Categorias;
