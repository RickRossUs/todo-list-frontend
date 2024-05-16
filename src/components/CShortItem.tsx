import { Box } from "@mui/material";

const CShortItem = ({
  msg,
  check,
  onClick,
}: {
  msg: string;
  check: boolean;
  onClick: () => void;
}) => {
  return (
    <Box
    onClick={onClick}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        bgcolor: check ? "rgba(128,0,128,0.1)" : "white",
        color: "purple",
        height: 50,
        borderRadius: 2,
        pl: 2,
        m: 2,
        cursor: "pointer",
        "&:hover": {
          bgcolor: "rgba(128,0,128,0.1)",
        },
      }}
    >
      {msg}
    </Box>
  );
};

export default CShortItem;
