import { useContext } from "react";
import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import NotesContext from "@/context/NotesContext";
import { NotesContextValue } from "@/types/NotesContextValue";

const CCheck = ({ check, id }: { check: boolean; id: number }) => {
  const { updateNotes } = useContext(NotesContext) as NotesContextValue;

  const baseStyles = {
    borderRadius: "50%",
    width: 25,
    height: 20,
    cursor: "pointer",
    transition: "all .5s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      bgcolor: "purple",
      transition: "all .5s ease-in-out",
    },
  };

  const iconStyles = {
    color: check ? "purple" : "grey",
    width: 15,
    height: 15,
    transition: "all .5s ease-in-out",
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("checked", String(!check));
    updateNotes(id, formData);
  };

  return (
    <Box
      sx={{
        ...baseStyles,
        border: `1px solid ${check ? "purple" : "grey"}`,
      }}
      onClick={handleClick}
    >
      {check && <CheckIcon sx={iconStyles} />}
    </Box>
  );
};

export default CCheck;
