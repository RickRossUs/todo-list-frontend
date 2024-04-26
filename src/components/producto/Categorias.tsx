import { useEffect, useContext } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import ProductosContext from "@/context/ProductosContext";
import { useLocation, useParams } from "react-router-dom";
import { ProductosContextValue } from "../../types/ProductosContextValue";

const Categorias = () => {
  const {
    productos,
    categorias,
    getCategorias,
    selectedCategoria,
    getProductos,
    esFavorito,
    getFavoritos,
  } = useContext(ProductosContext) as ProductosContextValue;
  const location = useLocation();
  const { userId } = useParams();

  const handleCategoria = (_: React.SyntheticEvent, newValue: number) => {
    if (esFavorito) getFavoritos("", newValue, 0);
    else
      getProductos(
        "",
        newValue,
        location.pathname.includes("/perfil") ? Number(userId) : 0,
        20,
        0
      );
  };

  useEffect(() => {
    if (location.pathname.includes("/perfil")) getCategorias(Number(userId));
  }, [productos]);

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
