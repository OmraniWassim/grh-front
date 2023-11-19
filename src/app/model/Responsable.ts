import { Collaborateur } from "./collaborateur";

export interface Responsable {
  id: number;
  resName: string;
  collaborateurs: Collaborateur[];
}
