import { Box, Divider, Typography } from "@mui/material";

const CDividerDate = ({ date }: { date: string }) => {
  const dateObject = new Date(date);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        my: 2,
      }}
    >
      <Divider sx={{ flexGrow: 1, bgcolor: "purple" }} />
      <Typography sx={{ mx: 2, color: "purple" }}>
        {dateObject instanceof Date ? dateObject.toLocaleDateString() : "Invalid Date"}
      </Typography>
      <Divider sx={{ flexGrow: 1, bgcolor: "purple" }} />
    </Box>
  );
};

export default CDividerDate;
