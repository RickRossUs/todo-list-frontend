import { Box } from "@mui/material";
import Clista from "@/components/CLista";
import CCircleButton from "@/components/Button/CCircleButton";
import CMenu from "@/components/CMenu";

export const DashboardView = () => {

  return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100%"}}>
      <CMenu />
      <Clista />
      <CCircleButton />
    </Box>
  );
};
