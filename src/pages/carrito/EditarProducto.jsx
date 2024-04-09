import React, { useState } from 'react'
import { Box, Button, Chip, Container, InputLabel, TextField, Typography } from '@mui/material'

const EditarProducto = () => {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No hay imagen");
    const [value, setValue] = useState()
  
    function handleSelect(e){
      setValue(e.target.value)
    }
    
    const options =[
      {label: "Fruta", value: "fruta"},
      {label: "Vegetal", value: "Vegetal"},
      {label: "Hortaliza", value: "Hortaliza"},
      {label: "Grano", value: "Grano"},
      {label: "Cereal", value: "Cereal"},
      {label: "Cárnico", value: "Cárnico"},
      {label: "Lácteo", value: "Lácteo"},
  ]
  
  const active = (e) =>{
    e.preventDefault();
    alert(options.target.value)
  }
  
    return (
      <div>
          <Container
           sx={{ height:"100vh", 
           display:"flex", justifyContent:"center", 
           alignItems:"center"}}>
            <Box className="tarjeta-crear-producto"
             sx={{ width:{xs:"60%",md:"40%"}, 
             height:"95%", borderRadius:{xs:2,md:5}}}>
              <form className='form-img-add'
                    onClick={()=> document.querySelector(".input-img").click()}
                    onChange={({target: {files}}) =>{
                      files[0] && setFileName(files[0].name)
                      if(files){
                          setImage(URL.createObjectURL(files[0]))
                      }
                    }} >
                  <input type="file" 
                  accept='image/*' 
                  required
                  className='input-img' 
                  hidden/>
                    { image 
                      ? <Box component="img" src={image} sx={{width:"100%", height:"100%", objectFit:"cover", borderRadius:{xs:2,md:5}, position:"relative"}} alt={fileName}/> 
                      : <>
                          <Box component="i" className='bi bi-camera' color='white' fontSize={40}></Box>
                          <Typography sx={{fontFamily:"poppins", color:"white"}}>Cambiar imagen..</Typography>
                        </> 
                    }
              </form>
              <form className='form-info-add'>
                  <Box sx={{display:"flex", gap:2, justifyContent:"space-around", mb:{xs:5, md:8}}}>
                    <TextField label="Nuevo nombre" color="warning" margin="normal" size="small" sx={{height:"2vh", fontFamily:"poppins"}}/>
                    <TextField label="Descripción" color="warning" margin="normal" size="small" sx={{height:"2vh", fontFamily:"poppins"}}/>
                  </Box>
                  <Box>
                      <Typography variant="p" sx={{fontFamily:"poppins", fontSize:{xs:"14px", md:"16px"}}} >Escoja nueva categoría:</Typography>
                      <Box className="categorias" sx={{bgcolor:"lightgreen", width:{xs:"100%"}, height:{xs:"18vh", md:"15vh"}, p:1, display:{xs:"flex", md:"grid"}, gridTemplateColumns:{md:"repeat(4,1fr)"}, gap:1, flexWrap:"wrap"}}>
                          {options.map(option => (
                              <Chip className="categoria" label={option.label} value={option.value} onClick={active} color="success" size="small" sx={{width:"fit-content", cursor:"pointer"}}/>
                          ))}
                      </Box>
                  </Box>
                  <Box sx={{display:"flex", mt:{xs:2, md:3}, alignItems:"center"}}>
                      <InputLabel>Nuevo precio:</InputLabel>
                      <TextField size="small" type="number" label="$ 00.00" color="warning" sx={{width:{xs:"40%"}, ml:"5%"}}></TextField>
                  </Box>
                  <Box sx={{display:"flex", flexDirection:{xs:"column", md:"row"}, justifyContent:"space-between", gap:{xs:1, md:0}, mt:2, width:"90%", ml:"5%"}}>
                      <Button variant="outlined" color="success" sx={{bgcolor:'white'}}>Cancelar</Button>
                      <Button variant="contained" color="success">Aceptar</Button>
                  </Box>
              </form>
            </Box>
          </Container>
      </div>
  )
}

export default EditarProducto
