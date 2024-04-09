import React from "react";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const CBtnNavbar = ({ icon: Icon, color = "#5ABE5D", onClick }) => {
 return (
    <Button
      size="small"
      sx={{
        height: 40,
        width: 5,
        m: 1,
        bgcolor: color,
        borderRadius: 2,
        color: "white",
        fontSize: { md: "1rem", xs: ".8rem" },
      }}
      onClick={onClick}
    >
      <Icon />
    </Button>
 );
};

export default CBtnNavbar;

