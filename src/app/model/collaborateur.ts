import { ContractType } from "./ContractType";
import { Departement } from "./Departement";
import { EtudeLevel } from "./EtudeLevel";
import { EtudeNature } from "./EtudeNature";
import { Poste } from "./Poste";
import { Responsable } from "./Responsable";
import { SalaryAdvantage } from "./SalaryAdvantage";

export interface Collaborateur {
  id: number;
  cin: number;
  nomComplet: string;
  numCompte: number;
  numSecuriteSociale: number;
  numTelephone: number;
  dateNaissance: Date;
  adresse: string;
  email: string;
  certifications: string;
  anneeExperience: number;
  dateDebutContrat: Date;
  recommandation: boolean;
  collaborateurRecommande: string;
  commentaire: string;
  piecesJointe: ScannedDocument;
  etudeNature: EtudeNature;
  etudeLevel: EtudeLevel;
  contractType: ContractType;
  salaryAdvantage: SalaryAdvantage;
  poste: Poste;
  responsable: Responsable;
}

export interface ScannedDocument {

    id: number;
    name: string;
    type: string;
    pdfData: string;
    collaborateur: any;

}












