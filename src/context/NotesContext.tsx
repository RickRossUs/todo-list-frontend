import { createContext, useState, ReactNode } from "react";
import { AxiosResponse } from "axios";
import { Notes } from "../types/Notes";
import {
  fetchGetNotes,
  fetchUpdateNotes,
  fetchRegisterNotes,
  fetchDeleteNotes,
} from "@/services/NotesService";
import { NotesContextValue } from "@/types/NotesContextValue";

const NotesContext = createContext<NotesContextValue | null>(null);

export default NotesContext;

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  let [notes, setNotes] = useState<Array<Notes>>([]);
  let [checked, setChecked] = useState<boolean>(false);

  const getNotes = async (check:string = "") => {
    try {
      const response: AxiosResponse<Array<Notes>> = await fetchGetNotes(check);
      setNotes(response.data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerNotes = async (note: FormData) => {
    console.log(note)
    const response: AxiosResponse<Array<Notes>> = await fetchRegisterNotes(
      note
    );

    if (response) {
      checked ? getNotes("true") : getNotes("false")
      return true;
    } else {
      console.log("Something went wrong while logging in the tcp!");
    }
    return false;
  };

  const updateNotes = async (id: number, formData: FormData) => {
    const response: AxiosResponse<Array<Notes>> = await fetchUpdateNotes(
      id,
      formData
    );

    if (response) {
      checked ? getNotes("true") : getNotes("false")
    } else {
      console.error("Error al eliminar el usuario:", response);
    }
  };

  const deleteNotes = async (id: number, ) => {
    const response = await fetchDeleteNotes(id);
    if (response) {
      checked ? getNotes("true") : getNotes("false")
    }
  };

  let contextData = {
    notes,
    setNotes,
    checked,
    setChecked,
    getNotes,
    registerNotes,
    updateNotes,
    deleteNotes,
  };

  return (
    <NotesContext.Provider value={contextData}>
      {children}
    </NotesContext.Provider>
  );
};
