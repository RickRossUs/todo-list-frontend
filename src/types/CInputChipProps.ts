import { Categoria } from "./Categoria";

export interface CInputChipProps {
  name: string;
  control: any;
  label?: string;
  rules?: any;
  errors?: any;
  lista: Categoria[];
  checked: number;
  setChecked: (id: number) => void;
}
