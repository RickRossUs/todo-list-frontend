import React, { useState } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'

const Confirmacion = () => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

  return (
    <div>
        <Button onClick={handleOpen} >Eliminar</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description' sx={{ bgcolor:"grey", width:"fit-content", height:"fit-content", p:"2%", left:"40%", top:"40%", borderRadius:"10px"}}>
        <Box>
            <Typography id='modal-modal-title' variant="h6" component="h2" color="white" >Está seguro de realizar la acción?</Typography>
            <Typography id='modal--modal-description' sx={{mt:2}}>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <Button color="success" variant="outlined" onClick={handleClose} sx={{}} >Cancelar</Button>
                    <Button color="success" variant="contained">Aceptar</Button>
                </Box>
            </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Confirmacion
