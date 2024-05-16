import { useEffect, useContext } from "react";
import { Notes } from "@/types/Notes";
import NotesContext from "@/context/NotesContext";
import { NotesContextValue } from "@/types/NotesContextValue";
import { Box } from "@mui/material";
import CItem from "./CItem";
import CDividerDate from "./CDividerDate";

const Clista = () => {
  const { notes, getNotes } = useContext(NotesContext) as NotesContextValue;

  useEffect(() => {
    getNotes("false");
  }, []);

  return (
    <Box
      sx={{
        border: "5px solid white",
        borderRadius: "0 10px 10px 0",
        width: {
          lg: "70%",
          xs: "90%",
        },
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      {notes?.map((note: Notes, index: number) => (
        <Box key={note.id} sx={{ width: "100%" }}>
          {index === 0 || new Date(notes[index - 1].date).toDateString() !== new Date(note.date).toDateString() ? (
            <CDividerDate date={String(note.date)} />
          ) : (
            ""
          )}
          <CItem note={note} />
        </Box>
      ))}
    </Box>
  );
};

export default Clista;
