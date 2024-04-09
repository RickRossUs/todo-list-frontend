import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Chip,
  Tab,
  Tabs,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import "./Carrito.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AuthContext from "@/auth/AuthContext";
import CarritoContext from "@/context/CarritoContext";
import Satisfaccion from "./Satisfaccion";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Carrito = ({ products, setProducts }) => {
  const { authTokens, user, getImageSrc } = useContext(AuthContext);
  const { buyCarrito } = useContext(CarritoContext);
  const [categorias, setCategorias] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const handleCategoria = (e, newValue) => {
    setSelectedTab(newValue);

    if (newValue === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.categoria.id === newValue
      );
      setFilteredProducts(filtered);
    }
  };

  const onFavProduct = async (productId, favoritoId) => {
    let action = "POST";
    let URL = "http://127.0.0.1:8000/productos/favoritos/";

    if (products.find((product) => product.id === productId).es_favorito.is) {
      URL += favoritoId + "/";
      action = "DELETE";
    }

    try {
      const response = await fetch(URL, {
        method: action,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({ producto: productId }),
      });

      if (action === "POST") {
        const data = await response.json();

        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, es_favorito: { is: true, id: data.id } };
          }
          return product;
        });
        const updatedProductsFiltered = filteredProducts.map((product) => {
          if (product.id === productId) {
            return { ...product, es_favorito: { is: true, id: data.id } };
          }
          return product;
        });

        setProducts(updatedProducts);
        setFilteredProducts(updatedProductsFiltered);
      } else {
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, es_favorito: { is: false, id: null } };
          }
          return product;
        });
        const updatedProductsFiltered = filteredProducts.map((product) => {
          if (product.id === productId) {
            return { ...product, es_favorito: { is: false, id: null } };
          }
          return product;
        });

        setProducts(updatedProducts);
        setFilteredProducts(updatedProductsFiltered);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const URL = "http://127.0.0.1:8000/productos/categorias/";

        const response = await fetch(URL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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
          <Tabs
            aria-lael="Tabs example"
            value={selectedTab}
            onChange={handleCategoria}
          >
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
        {filteredProducts.map((product) => (
          <Paper
            className="item"
            key={product.id}
            elevation={2}
            sx={{
              width: { xs: "200px", md: "300px" },
              height: { xs: "300px", md: "400px" },
              bgcolor: "#88d488aa",
              borderRadius: 5,
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <Box
              className="item__img"
              sx={{
                height: { xs: "130px", md: "180px" },
                bgcolor: "green",
                position: "relative",
                borderRadius: 5,
                oerflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={getImageSrc(product.imagen)}
                alt={product.name}
                sx={{
                  width: "100%",
                  borderRadius: 5,
                  position: "relative",
                  bgcolor: "red",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {authTokens ? (
                user.id !== product.usuario.id ? (
                  <Box
                    onClick={() => {
                      onFavProduct(product.id, product.es_favorito.id);
                    }}
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "10px",
                      color: "white",
                      fontSize: { xs: "13px", md: "16px" },
                      "& .MuiSvgIcon-root": {
                        fill: product.es_favorito.is ? "red" : "none",
                        stroke: product.es_favorito.is ? "none" : "white",
                        "&:hover": {
                          fill: "white",
                          stroke: "none",
                        },
                      },
                    }}
                  >
                    <FavoriteIcon
                      sx={{ fontSize: { xs: "14px", md: "18px" } }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "10px",
                      fontSize: { xs: "13px", md: "16px" },
                    }}
                  >
                    <AccountCircleIcon
                      sx={{
                        fontSize: { xs: "14px", md: "18px" },
                        color: "#FFD700",
                      }}
                    />
                  </Box>
                )
              ) : (
                ""
              )}
              {user?.id !== product.usuario.id ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: 3,
                    left: "37%",
                    bgcolor: "lightgreen",
                    p: "4px",
                    borderRadius: 5,
                    fontSize: { xs: 10, md: 12 },
                  }}
                  onClick={() => {
                    navigate("/perfil/" + product.usuario.id + "/");
                  }}
                >
                  {product.usuario.username}
                </Box>
              ) : (
                ""
              )}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 3,
                  right: "8px",
                  bgcolor: "lightgreen",
                  borderRadius: "20px",
                  p: "0 4px",
                  fontSize: { xs: 10, md: 12 },
                }}
              >
                {"$ " + product.precio}
              </Box>
            </Box>
            <Box
              className="item__info"
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                height: { xs: "180px", md: "220px" },
                justifyContent: "space-around",
                position: "relative",
                backdropFilter: "blur(50px)",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: { xs: "16px" } }}>
                {product.nombre}
              </Typography>
              <Typography variant="p" sx={{ fontSize: { xs: "12px" } }}>
                {product.descripcion}
              </Typography>
              <Satisfaccion
                value={product.promedio_satisfaccion}
                productoId={product.id}
              />
              <Chip
                label={product.categoria.nombre}
                variant="outlined"
                color="success"
                sx={{
                  fontFamily: "poppins",
                  width: "fit-content",
                  fontSize: { xs: "10px" },
                }}
                onClick={(e) => handleCategoria(e, product.categoria.id)}
              ></Chip>
              {authTokens && user.id !== product.usuario.id ? (
                <Button
                  className="btn-cart"
                  onClick={() => buyCarrito(product.id)}
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    borderBottomRightRadius: { xs: "12px", md: "10px" },
                    borderBottomLeftRadius: { xs: "12px", md: "10px" },
                    fontSize: { xs: "10px" },
                  }}
                >
                  <ShoppingCartIcon />
                </Button>
              ) : (
                ""
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default Carrito;
