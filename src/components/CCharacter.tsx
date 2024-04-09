import React from "react";
import { Box, Typography } from "@mui/material";

const CCharacter = ({ icon: Icon, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: 12,
      }}
    >
      <Icon sx={{ fontSize: 15 }} />
      <Typography
        sx={{
          fontSize: 14,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default CCharacter;
