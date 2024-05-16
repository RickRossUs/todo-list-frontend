import { Box } from "@mui/material";

export const CSquareButton = ({
  icon,
  color = "green",
  onClick,
}: {
  icon: React.ReactElement;
  color?: string;
  onClick: () => void;
}) => {
  return (
    <div>
      <Box
        onClick={onClick}
        sx={{
          bgcolor: color,
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          mr: {
            lg:2,
            xs:1,
          },
          aspectRatio: "1/1",
          height: {
            lg: "40px",
            xs: "20px",
          },
          width: {
            lg: "40px",
            xs: "20px",
          },
          cursor: "pointer",
          fontSize: {
            lg: "16px",
            xs: "8px",
          },
          border: "1px solid " + color,
          transition: "all .5s ease-in-out",
          "&:hover": {
            bgcolor: "white",
            color,
            transition: "all .5s ease-in-out",
          },
          "& svg": {
            fontSize: {
              lg: "26px",
              xs: "13px",
            },
          },
        }}
      >
        {icon}
      </Box>
    </div>
  );
};
