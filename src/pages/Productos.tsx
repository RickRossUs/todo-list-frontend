import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import "@/assets/css/Producto.css";
import HeaderProducto from "@/components/producto/HeaderProducto";
import CardProducto from "@/components/producto/CardProducto";
import Categorias from "@/components/producto/Categorias";
import ProductosContext from "@/context/ProductosContext";
import { useLocation, useParams } from "react-router-dom";
import { ProductosContextValue } from "@/types/ProductosContextValue";

const Productos = () => {
  const {
    productos,
    getProductos,
    selectedCategoria,
    setEsFavorito,
    getFavoritos,
  } = useContext(ProductosContext) as ProductosContextValue;
  const location = useLocation();
  const { userId, favorito } = useParams();
  const [cantProductos, setCantProductos] = useState(0);
  const [pantallaAnterior, setPantallaAnterior] = useState(10);

  useEffect(() => {
    if (favorito) getFavoritos("", selectedCategoria, cantProductos);
    else if (cantProductos > 0 && !location.pathname.includes("/perfil")) {
      getProductos("", selectedCategoria, location.pathname.includes("/perfil") ? Number(userId) : 0, 20, cantProductos);
    }
  }, [pantallaAnterior]);

  useEffect(() => {
    setCantProductos(0);
    setPantallaAnterior(0);
  }, [selectedCategoria]);

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.offsetHeight;

    if (
      pantallaAnterior < scrollHeight &&
      scrollPosition >= scrollHeight - 500 &&
      scrollHeight > 250
    ) {
      setCantProductos((prevCantProductos) => prevCantProductos + 20);
      setPantallaAnterior(scrollHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setCantProductos(0);
    if (favorito) {
      getFavoritos();
      setEsFavorito(true);
    } else {
      getProductos();
      setEsFavorito(false);
    }
  }, [favorito]);

  return (
    <div>
      {location.pathname.includes("/productos") && <HeaderProducto />}
      <Categorias />
      <Box
        className="container-items"
        sx={{
          width: "90%",
          mt: "0vh",
          mx: "5vw",
          display: "grid",
          mb: 3,
          gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
          rowGap: 2,
        }}
      >
        {productos?.map((producto) => (
          <CardProducto producto={producto} key={producto.id} />
        ))}
      </Box>
    </div>
  );
};

export default Productos;
