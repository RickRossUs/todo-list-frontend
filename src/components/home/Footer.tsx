import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import './footer.css'

const Footer = () => {
  return (
    <div>
      <Box component="footer" sx={{width:'100%', height:'40vh', mt:2}}>
        <Box className="footer_overlay" sx={{width:'100%', height:'40vh', p:2, backdropFilter:"blur(5px)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:1}}>
          <Typography variant="h6">AgroMarketHub</Typography>
          <Typography variant="small">Sus compras al alcance de un click.</Typography>
          <Box className="redes" sx={{width:"10%", display:"flex", justifyContent:"space-between"}}>
            <Box component="a" href="#facebook" sx={{textDecoration:"none", color:"black"}}><Box component="i" className="bi bi-facebook" sx={{fontSize:18}}></Box></Box>
            <Box component="a" href="#instagram" sx={{textDecoration:"none", color:"black"}}><Box component="i" className="bi bi-instagram" sx={{fontSize:18}}></Box></Box>
            <Box component="a" href="#telegram" sx={{textDecoration:"none", color:"black"}}><Box component="i" className="bi bi-telegram" sx={{fontSize:18}}></Box></Box>
          </Box>
          <Divider sx={{width:"95%", mt:3}}/>
          <Box>
            <Typography>&copy; AgroMarketHub. Todos los derechos reservados.</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Footer
