const data = [
  {
    user: "@miaBrooks",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 50.00",
    img: "pimiento-amarillo.jpg",
    name: "Pimiento Amarillo",
    desc: "Pimiento",
    cat: "Especia",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@victorSalazar",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 100.00",
    img: "arandano.jpg",
    name: "Arándano",
    desc: "Baya azul",
    cat: "Fruta",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@PilarSalazar",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 90.00",
    img: "blueberry.jpg",
    name: "Blue Berry",
    desc: "Baya azul oscura",
    cat: "Fruta",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@andrewRowls",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 80.00",
    img: "cafe.jpg",
    name: "Café",
    desc: "Granos de café enteros",
    cat: "Grano",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@benjiMendez",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 50.00",
    img: "calabaza.jpg",
    name: "Calabaza",
    desc: "",
    cat: "Vianda",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@felixFernandez",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 100.00",
    img: "durazno.jpg",
    name: "Durazno",
    desc: "Durazno",
    cat: "Fruta",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@rahimMoan",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 30.00",
    img: "kiwi.jpg",
    name: "Kiwi",
    desc: "Fruta verde semiácida",
    cat: "Fruta",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@lakeSander",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 50.00",
    img: "manzana-verde.jpg",
    name: "Manzana",
    desc: "Manzana verde",
    cat: "Fruta",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@derekHels",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 65.00",
    img: "pistacho.jpg",
    name: "Pistacho",
    desc: "",
    cat: "Grano",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@bramGreenfeld",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 85.00",
    img: "piña.jpg",
    name: "Piña",
    desc: "Piña dulce",
    cat: "Fruta",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@adrianSalazar",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 150.00",
    img: "queso.jpg",
    name: "Queso Mozzarella",
    desc: "Queso de lata calidad",
    cat: "Lácteo",
    buy: <i className="bi bi-cart"></i>,
  },
  {
    user: "@simonSpier",
    fav: <i className="bi bi-heart"></i>,
    price: "$ 230.00",
    img: "salmon.jpg",
    name: "Salmón Rojo",
    desc: "Filete de salmón rojo",
    cat: "Cárnico",
    buy: <i className="bi bi-cart"></i>,
  },
];

const options = [
  { label: "Fruta", value: "fruta" },
  { label: "Vegetal", value: "Vegetal" },
  { label: "Hortaliza", value: "Hortaliza" },
  { label: "Grano", value: "Grano" },
  { label: "Cereal", value: "Cereal" },
  { label: "Cárnico", value: "Cárnico" },
  { label: "Lácteo", value: "Lácteo" },
];

const tarjetasGaleria = [
  {id: 1, img: '../../assets/img/Productos/cafe.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 2, img: '../../assets/img/Productos/canela-estrellada.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 3, img: '../../assets/img/Productos/embutidos.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 4, img: '../../assets/img/Productos/fruit.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 5, img: '../../assets/img/Productos/huevos-roto.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 6, img: '../../assets/img/Productos/leche.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 7, img: '../../assets/img/Productos/maiz.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 8, img: '../../assets/img/Productos/pimiento-amarillo.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 9, img: '../../assets/img/Productos/pimiento-verde.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 10, img: '../../assets/img/Productos/pimientos-oscurs.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 11, img: '../../assets/img/Productos/quesos.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 12, img: '../../assets/img/Productos/cafe.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 13, img: '../../assets/img/Productos/pimientos-oscurs.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 14, img: '../../assets/img/Productos/pimientos-oscurs.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 15, img: '../../assets/img/Productos/pimientos-oscurs.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='bi bi-trash'></i>},
  {id: 16, img: '../../assets/img/Productos/pimientos-oscurs.jpg', iconEditar: <i className='bi bi-pen'></i>, iconEliminar: <i className='b/pimientos-oscurs.jpgi bi-trash'></i>},
]

{/* <Box>
  <Box className="tarjeta tarjeta-2" sx={{width:"20%", height:"80%", borderRadius:5, display:"flex", justifyContent:"center", alignItems:"center", position:"relative"}}>
  <Typography variant="h5">Manzana</Typography>
  <Box component="a" href="#" sx={{position:"absolute", bottom:0, textDecoration:"none", color:"black", backdrop:"blur(5px)",p:1, opacity:0, transition:".3s", bgcolor:"lightgreen", borderRadius:2}}>Frutas <i className="bi bi-chevron-right"></i></Box>
  </Box>
  <Box className="tarjeta tarjeta-3" sx={{width:"20%", height:"80%", borderRadius:5, display:"flex", justifyContent:"center", alignItems:"center", position:"relative"}}>
  <Typography variant="h5">Arroz Criollo</Typography>
  <Box component="a" href="#" sx={{position:"absolute", bottom:0, textDecoration:"none", color:"black", backdrop:"blur(5px)",p:1, opacity:0, transition:".3s", bgcolor:"lightgreen", borderRadius:2}}>Cereales <i className="bi bi-chevron-right"></i></Box>
  </Box>
  <Box className="tarjeta tarjeta-4" sx={{width:"20%", height:"80%", borderRadius:5, display:"flex", justifyContent:"center", alignItems:"center", position:"relative"}}>
  <Typography variant="h5">Frijol Rojo</Typography>
  <Box component="a" href="#" sx={{position:"absolute", bottom:0, textDecoration:"none", color:"black", backdrop:"blur(5px)",p:1, opacity:0, transition:".3s", bgcolor:"lightgreen", borderRadius:2}}>Semillas <i className="bi bi-chevron-right"></i></Box>
  </Box>
  <Box className="tarjeta tarjeta-5" sx={{width:"20%", height:"80%", borderRadius:5, display:"flex", justifyContent:"center", alignItems:"center", position:"relative"}}>
  <Typography variant="h5">Queso Blanco</Typography>
  <Box component="a" href="#" sx={{position:"absolute", bottom:0, textDecoration:"none", color:"black", backdrop:"blur(5px)",p:1, opacity:0, transition:".3s", bgcolor:"lightgreen", borderRadius:2}}>Lácteos <i className="bi bi-chevron-right"></i></Box>
  </Box>
  <Box className="tarjeta tarjeta-6" sx={{width:"20%", height:"80%", borderRadius:5, display:"flex", justifyContent:"center", alignItems:"center", position:"relative"}}>
  <Typography variant="h5">Chorizo</Typography>
  <Box component="a" href="#" sx={{position:"absolute", bottom:0, textDecoration:"none", color:"black", backdrop:"blur(5px)",p:1, opacity:0, transition:".3s", bgcolor:"lightgreen", borderRadius:2}}>Cárnicos <i className="bi bi-chevron-right"></i></Box>
  </Box>
</Box> */}

const lista = [
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
  {
    id: 1,
    img: "../../assets/img/Productos/cafe.jpg",
    cant: 1,
    name: "Nombre",
    price: " 00.00",
  },
];

const data =[
  {
      id: 1,
      price: 50,
      quantity: 1
  },
  {
      id: 2,
      nameProduct: "Café",
      price: 50,
      quantity: 1
  },
  {
      id: 3,
      nameProduct: "Café",
      price: 50,
      quantity: 1
  },
  {
      id: 4,
      nameProduct: "Café",
      price: 50,
      quantity: 1
  },
]