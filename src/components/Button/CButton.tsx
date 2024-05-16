import { Button } from "@mui/material";

export const CButton = ({
  msg,
  color="red",
  type= "submit",
  onClick,
}: {
  msg: string;
  color?: string;
  type?: "submit" | "button" | "reset"; // Asegúrate de que el tipo sea uno de estos valores
  onClick?: () => void;
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        size="small"
        sx={{
          height: 40,
          width: "100%",
          bgcolor: color,
          borderRadius: 3,
          border: "1px solid " + color,
          color: "white",
          fontSize: { md: "1rem", xs: ".8rem" },
          fontWeight: "bold",
          cursor: "pointer",
          m:1,
          "&:hover": {
            backgroundColor: "transparent",
            color: color,
            border: "1px solid " + color,
          },
        }}
        type={type}
      >
        {msg}
      </Button>
    </>
  );
};
