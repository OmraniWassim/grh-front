import { Collaborateur } from "./collaborateur";

export interface Departement {
  id: number;
  depName: string;
  collaborateurs: Collaborateur[];
}
