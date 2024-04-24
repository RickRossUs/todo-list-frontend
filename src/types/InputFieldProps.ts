import { FieldValues, FieldPath } from "react-hook-form";

export interface InputFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: any;
  label: string;
  type: string;
  rules?: any;
  errors: any;
  defaultValue?: T[keyof T]; // Añade defaultValue aquí
}