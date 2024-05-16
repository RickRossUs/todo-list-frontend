import { Usuario } from "./Usuario"

export interface Notes {
  id: number,
  title: string
  checked: boolean,
  date: Date,
  user: Usuario
}
