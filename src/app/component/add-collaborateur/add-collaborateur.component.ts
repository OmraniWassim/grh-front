import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PiecesJointes } from 'src/app/model/ContractType';
import { Departement } from 'src/app/model/Departement';
import { SalaryAdvantage } from 'src/app/model/SalaryAdvantage';
import { ContractTypeService } from 'src/app/service/ContractType.service';
import { DepartementService } from 'src/app/service/Departement.service';
import { PiecesJointesService } from 'src/app/service/PiecesJointes.service';
import { ResponsableService } from 'src/app/service/Responsable.service';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {
selectedTypeContrat: any="";
breadcrumbItems: MenuItem[]=[];
contractTypesList: string[]=[];
dateDebutContrat: Date;
onSubmit() {
throw new Error('Method not implemented.');
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
selectedAvantage: any;
selectedContractType: any;

selectedPoste: any="responsable";
responsables!: string[];
selectedResponsable: any;
documents!: any[];
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

obligedDocuments:string[]=[] ;
  departements: Departement[] = [];
  departmentsList:string[]=[];
  selectedDepartement: String | null = null;
  postes: any[] = []; 
  showResponsableDropdown:boolean=true;


  constructor(private departementService: DepartementService,private responsableService: ResponsableService,private contractTypeService:ContractTypeService,private piecesService : PiecesJointesService) {
    this.dateDebutContrat = new Date();

  }


  ngOnInit(): void {
    this.documents = [
      { id: 1, name: 'CIN', obligatoire: 'Yes' },
      { id: 2, name: 'Passport', obligatoire: 'No' },
      { id: 3, name: 'Resume', obligatoire: 'Yes' },
      { id: 4, name: 'Diplome', obligatoire: 'No' }
    ];
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
     this.loadContractTypes();
      this.loadPieces();
  }
  loadPieces(){
    this.piecesService.getAllPiecesJointess().subscribe(
      (data) => {
        this.documents=data;
        console.log("pieces jpointes=",this.documents);
        
        
      },
      (error) => {
        console.error('Error fetching departements:', error);
      }
    );
  }
  

  loadContractTypes(): void {
    this.contractTypeService.getAllContractTypes().subscribe(
      (data) => {
        this.contractTypes=data;
        this.contractTypesList = data.map((c) => c.type);
      },
      (error) => {
        console.error('Error fetching departements:', error);
      }
    );
  };
  loadDepartements(): void {
    this.departementService.getAllDepartements().subscribe(
      (data) => {
        this.departements=data;
        this.departmentsList = data.map((departement) => departement.depName);
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

    } else {
      console.error("Selected Departement not found.");
    }
  } else {
    this.postes = [];
  }
}
 onPosteChange(event: any): void {

  
  if (this.selectedPoste === 'Responsable') {
      this.showResponsableDropdown = false;

  } else {
    this.showResponsableDropdown = true; 

  }
}
OnSelectType(){
  const selectedType = this.contractTypes.find(c => c.type===this.selectedTypeContrat);
  this.salaireDeBase=selectedType.salaireBase;
  this.avantages=selectedType.salaryAdvantages.map((s: { advantage: SalaryAdvantage; })=>s.advantage);

  this.contractTypeService.getPiecesJointesByContractType(this.selectedTypeContrat).subscribe(
    (data) => {
      this.obligedDocuments=data;
    },
    (error) => {
      console.error('Error fetching pieces jointes:', error);
    }
  );

  


}



  
  

}
