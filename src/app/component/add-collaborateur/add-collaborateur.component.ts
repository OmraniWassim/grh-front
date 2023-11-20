import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PiecesJointes } from 'src/app/model/ContractType';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {
selectedTypeContrat: any;
breadcrumbItems: MenuItem[]=[];
onSubmit() {
throw new Error('Method not implemented.');
}
test() {
console.log("recomm=",this.recommendation);

}

onBasicUpload() {
throw new Error('Method not implemented.');
}
pieces!: any[];
uploadDocuments() {
throw new Error('Method not implemented.');
}
contractTypes!: any[];
salaireDeBase: any;
avantages!: any[];
dateDebutContrat: any;
selectedAvantage: any;
selectedContractType: any;
departements!: any[];
postes!: any[];
selectedDepartement: any;
selectedPoste: any;
responsables!: any[];
selectedResponsable: any;
documents!: PiecesJointes[];
cin!: number;
  nomComplet!: string ;
  numCompte!: number;
  numSecuriteSociale!: number;
  numTelephone!: number;
  dateNaissance!: Date;
  adresse!: string;
  email!: string;
  natureEtudeOptions! :any[];
  niveauEtudeOptions! :any[];
  selectedNatureEtude!:any;
  selectedNiveauEtude!:any;
  certifications!:any;
  anneeExperience!:any;
  recommendation: boolean=false; // Default to 'no'
collaborateurs!: string;
comment!: string;


  constructor() {}


  ngOnInit(): void {
    this.breadcrumbItems = [

      {
          label: 'Consult GRH', icon: 'pi pi-fw pi-search'
      },
      {
        label: 'Nouveau collaborateur', icon: 'pi pi-fw pi-plus'
     },

  ];
  }

}
