import { Box, Avatar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UsuarioContext from "@/context/UsuarioContext";
import { UsuariosContextValue } from "@/types/UsuariosContextValue";
import { useContext } from "react";

const CAvatar = () => {
  const { user } = useContext(UsuarioContext) as UsuariosContextValue;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width:"100%",
        pb:4,
        mb:2,
        borderBottom: "1px solid purple",
        borderRadius: "50%"
      }}
    >
      <Avatar sx={{ width: 80, height: 80, mt:4, bgcolor:"purple" }}>
        <AccountCircleIcon sx={{ width: "100%", height: "100%" }} />
      </Avatar>
      <Typography sx={{ fontFamily: "cursive", fontSize: "24px", mt: 1 }}>
        {user?.username}
      </Typography>
    </Box>
  )
}

export default CAvatar