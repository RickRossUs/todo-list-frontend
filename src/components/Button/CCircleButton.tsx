import { useState } from "react"
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CAddNote from "../CAddNote";

const CCircleButton = () => {
  const [crear, setCrear] = useState<boolean>(true);

  return (
    <>
      <Box
      onClick={() => {setCrear(false)}}
        sx={{
          position: "fixed",
          bottom: "5vh",
          right: "5vw",
          width: 60,
          height: 60,
          borderRadius: "50%",
          bgcolor: "purple",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "5px 5px 10px 1px rgba(128,0,128,0.5)",
          transition: "all .5s ease-in-out",
          "&:hover": {
            bgcolor: "white",
            transition: "all .5s ease-in-out",
            "& .MuiSvgIcon-root": {
              color: "purple",
              transition: "all .5s ease-in-out",
            },
          },
        }}
      >
        <AddIcon sx={{ color: "white" }} />
      </Box>
      <CAddNote crear={crear} setCrear={setCrear} />
    </>
  );
};

export default CCircleButton;
