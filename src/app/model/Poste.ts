import { Collaborateur } from "./collaborateur";

export interface Poste {
  id?: number;
  posteName?: string;
  collaborateurs?: Collaborateur[];
}
