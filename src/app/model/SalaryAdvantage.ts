import { Collaborateur } from "./collaborateur";

export interface SalaryAdvantage {
  id: number;
  advantage: string;
  collaborateurs: Collaborateur[]; // Adjust the type based on your actual Collaborateur model
}
