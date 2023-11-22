import { SalaryAdvantage } from "./SalaryAdvantage";
import { Collaborateur } from "./collaborateur";

export interface ContractType {
  id: number;
  type: string;
  piecesJointes: PiecesJointes[];
  collaborateurs: Collaborateur[];
  salaireBase:number;
  salaryAdvantages:SalaryAdvantage[];


}

  export class PiecesJointes {
    id!: number;
    contractTypes!: ContractType[];
    name!: string;
    obligatoire: boolean=false;
    statut!: boolean;
  }


