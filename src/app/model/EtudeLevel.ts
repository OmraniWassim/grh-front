import { Collaborateur } from "./collaborateur";

export interface EtudeLevel {
  id: number;
  niveaux: string;
  collaborateurs: Collaborateur[];
}
