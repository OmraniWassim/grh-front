import { Collaborateur } from "./collaborateur";

export interface ContractType {
  id: number;
  type: string;
  piecesJointes: PiecesJointes[];
  collaborateurs: Collaborateur[];


}

  export interface PiecesJointes {
    id: number;
    contractTypes: ContractType[];
    name: string;
    obligatoire: boolean;
    statut: boolean;
  }


