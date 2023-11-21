import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PiecesJointes } from 'src/app/model/ContractType';
import { Departement } from 'src/app/model/Departement';
import { Poste } from 'src/app/model/Poste';
import { DepartementService } from 'src/app/service/Departement.service';
import { ResponsableService } from 'src/app/service/Responsable.service';

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

selectedPoste: any;
responsables!: string[];
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

  departements: Departement[] = [];
  departmentsList:string[]=[];
  selectedDepartement: String | null = null;
  postes: any[] = []; 


  constructor(private departementService: DepartementService,private responsableService: ResponsableService) {}


  ngOnInit(): void {
    this.breadcrumbItems = [

      {
          label: 'Consult GRH', icon: 'pi pi-fw pi-search'
      },
      {
        label: 'Nouveau collaborateur', icon: 'pi pi-fw pi-plus'
      },

     ];
     this.loadDepartements();
     this.loadResponsables();
  }


  loadDepartements(): void {
    this.departementService.getAllDepartements().subscribe(
      (data) => {
        this.departements=data;
        this.departmentsList = data.map((departement) => departement.depName);
        console.log("deps= ",this.departmentsList);
      },
      (error) => {
        console.error('Error fetching departements:', error);
      }
    );
  }
  loadResponsables(): void {
    this.responsableService.getAllResponsables().subscribe(
      (data) => {
        this.responsables = data.map((responsable) => responsable.resName);
        console.log("resp= ",this.responsables);
      },
      (error) => {
        console.error('Error fetching departements:', error);
      }
    );
  }
  onDepartementChange(): void {
  console.log("changed");
  if (this.selectedDepartement) {
    const selectedDep = this.departements.find(dep => dep.depName === this.selectedDepartement);
    if (selectedDep) {
      this.postes=selectedDep.postes.map((poste)=>poste.posteName);
      console.log("postes list=", this.postes);

    } else {
      console.error("Selected Departement not found.");
    }
  } else {
    this.postes = [];
  }
}

  
  

}
