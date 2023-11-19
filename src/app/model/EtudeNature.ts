import { Collaborateur } from "./collaborateur";

export interface EtudeNature {
  id: number;
  nature: string;
  collaborateurs: Collaborateur[];
}
