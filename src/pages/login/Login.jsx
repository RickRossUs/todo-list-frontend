import React, { useState } from 'react'
import { Box, Button, Chip, Drawer, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import './Login.css'

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin=(e)=>{
    e.preventDefault();
    alert(`Usuario: ${user}, Contraseña: ${password}`);
  }

  const [formValues, setFormValues] = useState({
    user: '',
    email: '',
    password: ''
  })

  const handleChange = (event) =>{
    const {name, value} = event.target;
    setFormValues({...formValues, [name]:value});
  }

  const handleCancel=()=>{
  setFormValues({
      user: '',
      email: '',
    password: ''
  })
  }

/*  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMoseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault();
  }*/

  return (
    <div>
      <Grid item xs={12} sm={8} md={5} sx={{width:"90%",height:"80vh", margin:"0 auto", mt:"10vh", display:"flex", borderRadius:5, fontFamily:"poppins"}} component={Paper} elevation={6} square>
        <Box  className="lateral_login" sx={{width:"35%", height:"100%", borderRadius:5}}></Box>
        <Box sx={{width:"65%", height:"100%", p:5, textAlign:"center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:5, fontFamily:"poppins"}}>
        <Typography component="h5" variant="h5" sx={{fontFamily:"poppins"}}>Iniciar Sesión <i className="bi bi-lock"></i></Typography>
        <Box component="form" noValidate sx={{width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
          <TextField 
            variant="outlined"
            color="success"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuario"
            name="user"
            autoComplete="user"
            autoFocus
            value={user}
            onChange={(e)=> setUser(e.target.value)} />
          <TextField 
            variant="outlined"
            color="success"
            margin="normal"
            type="password"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)} />
          <Box sx={{display:"flex", justifyContent:"space-between",  width:"100%"}}>
          <Button type="submit"
            fullWidth
            variant="outlined"
            color="success"
            onClick={handleCancel}
            sx={{width:"40%", fontFamily:"poppins", fontWeight:700, border:2}} >Cancelar</Button>
          <Button type="submit"
            fullWidth
            variant="contained"
            color="success"
            onClick={handleLogin}
            sx={{width:"40%", fontFamily:"poppins"}} >Aceptar</Button>
          </Box>
          <Typography sx={{fontFamily:"poppins"}}>No tienes cuenta? <Typography component="a" href="#" sx={{color:"green", fontFamily:"poppins"}} >Regístrate!</Typography></Typography>
        </Box>
        </Box>
      </Grid>
    </div>
  )
}

export default Login
