import React from 'react'
import { AppBar, Box, Chip, Container } from '@mui/material'

const Tarjeta = () => {
  return (
    <div>
        <Container sx={{display:"flex", justifyContent:"center"}}>
            <Box sx={{width:"50%", height:"60vh", bgcolor:"red", position:"relative", }}>
                <Chip label="$150.00" variant="contained" color="success" sx={{position:"absolute", top:0, left:"45%"}}/>
            </Box>
        </Container>
    </div>
  )
}

export default Tarjeta
