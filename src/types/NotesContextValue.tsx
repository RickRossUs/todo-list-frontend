import { Notes } from "./Notes";

export interface NotesContextValue {
    notes: Array<Notes> | [];
    setNotes: React.Dispatch<React.SetStateAction<Array<Notes> | []>>;
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    getNotes: (check?:string) => Promise<boolean>;
    registerNotes: (note: FormData) => Promise<boolean>;
    updateNotes: (id: number, formData: FormData) => Promise<void>;
    deleteNotes: (id: number, ) => Promise<any>;
  }