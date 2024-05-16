import { useContext, useState } from "react";
import { Notes } from "@/types/Notes";
import { Box, Typography } from "@mui/material";
import CCheck from "./Button/CCheck";
import { CSquareButton } from "./Button/CSquareButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotesContext from "@/context/NotesContext";
import { NotesContextValue } from "@/types/NotesContextValue";
import CAddNote from "./CAddNote";

const CItem = ({ note }: { note: Notes }) => {
  const { deleteNotes } = useContext(NotesContext) as NotesContextValue;
  const [modificar, setModificar] = useState<boolean>(true);

  const handleEdit = () => {
    setModificar(false);
  };

  const handleDelete = () => {
    deleteNotes(note.id);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: {
          lg: 2,
          xs: 1,
        },
        m: {
          lg: 2,
          xs: 1,
        },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CCheck check={note.checked} id={note.id} />
      <Typography
        sx={{
          width: "100%",
          ml: {
            lg: 3,
            xs: 1,
          },
          mr: {
            lg: 3,
            xs: 1,
          },
          fontSize: {
            lg:"1rem",
            xs:".8rem",
          }
        }}
      >
        {note.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CSquareButton icon={<EditIcon />} onClick={handleEdit} />
        <CSquareButton
          icon={<DeleteIcon />}
          color="red"
          onClick={handleDelete}
        />
      </Box>
      <CAddNote crear={modificar} setCrear={setModificar} note={note} />
    </Box>
  );
};

export default CItem;
