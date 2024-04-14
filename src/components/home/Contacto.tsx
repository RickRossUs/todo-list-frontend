import React from 'react'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import './Contacto.css'

const Contacto = () => {
  return (
    <div>
      <Box className="contenedor" sx={{width:'85%', p:0, bgcolor:"lightgreen", borderRadius:5, boxShadow:"5px 5px 10px grey", display:"flex", fontFamily:"poppins", height:{xs:'40vh', md:"60vh"}, ml:"8vw"}}>
        <Box sx={{height:"100%",borderRadius:5, bgcolor:"white", display:"flex", flexDirection:"column", alignItems:"start", p:2, px:5, boxShadow:"5px 2px 5px #00000055",width:{xs:"80%",md:"85%"}}}>
          <Typography variant="h3" sx={{fontFamily:"poppins", fontSize:{xs:16, md:48}, fontWeight:{xs:700,md:500}}}>Contáctanos!</Typography>
          <Typography variant="p" sx={{width:{xs:"60%",md:"50%"}, fontSize:{xs:8, md:16}, mb:{xs:1, md:1}}}>Contáctanos si tienes dudas o sugerencias. Disponibles todo el tiempo.</Typography>
          <Box component="form" sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", width:"50%", height:"70%"}}>
            <Box component="input" type="text" name="" id="" placeholder='Nombre' sx={{fontSize:{xs:9, md:16}}}/>
            <Box component="input" type="text" name="" id="" placeholder='Correo' sx={{fontSize:{xs:9, md:16}}}/>
            <Box component="textarea" name="" id="" cols="10" rows="3" placeholder='Mensaje' sx={{fontSize:{xs:9, md:16}, mb:{xs:3, md:1} }}/>
            <Button className="botonV" variant="contained" sx={{bgcolor:"black", fontSize:{xs:9, md:18}}}>Enviar</Button>
          </Box>
        </Box>
        <Box className="" sx={{position:"relative",bgcolor:"transparent", width:"15%", height:"100%", display:"flex", justifyContent:"center", alignItems:"end"}}>
          <Box sx={{ width:{xs:"100%",md:"70%"}, display:"flex", justifyContent:"space-around", p:{xs:0,md:1}, ml:{xs:1,md:0}}}>
            <Box component="a" href="#" className="bi bi-facebook" sx={{textDecoration:"none", color:"black", fontSize:{xs:12, md:16}}}></Box>
            <Box component="a" href="#" className="bi bi-instagram" sx={{textDecoration:"none", color:"black", fontSize:{xs:12, md:16}}}></Box>
            <Box component="a" href="#" className="bi bi-telegram" sx={{textDecoration:"none", color:"black", fontSize:{xs:12, md:16}}}></Box>
          </Box>
          <Box sx={{position:"absolute", width:{xs:"40vw",md:"30vw"}, height:{xs:"25vh",md:"40vh"}, bgcolor:"black", top:"15%", border:{md:5}, borderColor:"lightgreen", borderRight:"none", right:{xs:"-4vw",md:0}, display:"flex", flexDirection:"column", justifyContent:"space-around", alignItems:"start", p:5}}>
            <Typography color="white" variant="h5" sx={{fontSize:{xs:12,md:15}}}>Información</Typography>
            <Typography color="white" variant="p" sx={{fontSize:{xs:5,md:12}, opacity:0.5}}><i className="bi bi-envelope"></i> info@agromarket.we</Typography>
            <Typography color="white" variant="p" sx={{fontSize:{xs:5,md:12}, opacity:0.5}}><i className="bi bi-telephone"></i> +53 55270040</Typography>
            <Typography color="white" variant="p" sx={{fontSize:{xs:5,md:12}, opacity:0.5}}><i className="bi bi-buildings"></i> Reparto Flores, Playa, La Habana</Typography>
            <Typography color="white" variant="p" sx={{fontSize:{xs:5,md:12}, opacity:0.5}}><i className="bi bi-clock"></i> 09:00 - 18:00</Typography>
          </Box>
          <Box sx={{position:"absolute", bgcolor:"lightgreen", outline:3, top:{xs:28,md:30}, right:{xs:170,md:380}, width:"4vw", aspectRatio:"1/1"}}></Box>
        </Box>
      </Box>
    </div>
  )
}

export default Contacto
