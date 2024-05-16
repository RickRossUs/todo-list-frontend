import { useContext, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CButton } from "./Button/CButton";
import NotesContext from "@/context/NotesContext";
import { NotesContextValue } from "@/types/NotesContextValue";
import { Notes } from "@/types/Notes";

const CAddNote = ({
  crear,
  setCrear,
  note,
}: {
  crear: boolean;
  setCrear: (value: boolean) => void;
  note?: Notes;
}) => {
  const { registerNotes, updateNotes } = useContext(
    NotesContext
  ) as NotesContextValue;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("date", data.date);
    note ? await updateNotes(note.id, formData) : await registerNotes(formData);
    setCrear(true);
    reset(); 
  };

  useEffect(() => {
    const fetchNote = async () => {
      setValue("title", note?.title);
      const formattedDate = note?.date
        ? new Date(note.date).toISOString().slice(0, 16)
        : "";
      setValue("date", formattedDate);
    };

    if (note) {
      fetchNote();
    }
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        display: crear ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,.2)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "300px",
          height: "auto",
          bgcolor: "white",
          borderRadius: "20px",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          {...register("title", { required: "Este campo es requerido" })}
          label="Nota"
          multiline
          rows={5}
          maxRows={5}
          variant="outlined"
          fullWidth
          error={!!errors.title}
          helperText={
            errors.title && errors.title.message
              ? String(errors.title.message)
              : ""
          }
        />
        <TextField
          {...register("date", { required: "Este campo es requerido" })}
          label="Fecha y Hora"
          type="datetime-local"
          variant="outlined"
          fullWidth
          error={!!errors.date}
          helperText={
            errors.date && errors.date.message
              ? String(errors.date.message)
              : ""
          }
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Box sx={{ width: "100%", display: "flex" }}>
          <CButton
            msg="Cancelar"
            type="button"
            onClick={() => {
              setCrear(true);
            }}
          />
          <CButton msg={note ? "Modificar" : "Crear"} color="green" />
        </Box>
      </Box>
    </Box>
  );
};

export default CAddNote;
