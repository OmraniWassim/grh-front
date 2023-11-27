import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { Departement } from 'src/app/model/Departement';
import { EtudeLevel } from 'src/app/model/EtudeLevel';
import { EtudeNature } from 'src/app/model/EtudeNature';
import { Poste } from 'src/app/model/Poste';
import { SalaryAdvantage } from 'src/app/model/SalaryAdvantage';
import { Collaborateur } from 'src/app/model/collaborateur';
import { ContractTypeService } from 'src/app/service/ContractType.service';
import { DepartementService } from 'src/app/service/Departement.service';
import { EtudeService } from 'src/app/service/Etude.service';
import { PiecesJointesService } from 'src/app/service/PiecesJointes.service';
import { ResponsableService } from 'src/app/service/Responsable.service';
import { SalaryAdvantageService } from 'src/app/service/SalaryAdvantage.service';
import { CollaborateurService } from 'src/app/service/collaborateur.service';
import { ToastrService } from 'ngx-toastr';
import { SacannedDocumentService } from 'src/app/service/ScannedDocument.service';
import { Responsable } from 'src/app/model/Responsable';


@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.scss']
})
export class AddCollaborateurComponent implements OnInit {
  selectedTypeContrat: any="";
  breadcrumbItems: MenuItem[]=[];
  contractTypesList: string[]=[];
  dateDebutContrat: Date;
  etudeLevelList: EtudeLevel[] | undefined;
  natureEtudeList!: EtudeNature[];
  responsablesList!: Responsable[] ;
  postesList: Poste[] | undefined;
  avantagesList: SalaryAdvantage[] | undefined;
  uploadedFiles: any;
  collaborateursList!: string[];
  selectedCollabName!:string;
  collaborateursListFinal!: string[];
  pieces!: any[];
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
  niveauEtudeOptions! :string[];
  selectedNatureEtude!:any;
  selectedNiveauEtude!:any;
  certifications!:any;
  anneeExperience!:any;
  recommendation: boolean=false;
  collaborateurs!: Collaborateur[];
  comment!: string;
  obligedDocuments:string[]=[] ;
  departements: Departement[] = [];
  departmentsList:string[]=[];
  selectedDepartement: any;
  postes: any[] = [];
  showResponsableDropdown:boolean=true;
 dateFintContrat!: Date;
  dateFinContrat: Date | undefined ;


  constructor(private messageService: MessageService,private sannedDocumentService:SacannedDocumentService,private collaborateurService:CollaborateurService, private avantageService:SalaryAdvantageService,private departementService: DepartementService,private responsableService: ResponsableService,
    private contractTypeService:ContractTypeService,private piecesService : PiecesJointesService,private etudeService: EtudeService ) {
    this.dateDebutContrat = new Date();

  }


  ngOnInit(): void {


    this.avantageService.getAllSalaryAdvantages().subscribe(
      (data) => {
        this.avantagesList=data;
      }
    );

    this.breadcrumbItems = [

      {
          label: 'Consult GRH', icon: 'pi pi-fw pi-search', routerLink: ['/collaborateurs']
      },
      {
        label: 'Nouveau collaborateur', icon: 'pi pi-fw pi-plus'
      },

     ];
     this.loadDepartements();
     this.loadResponsables();
     this.loadContractTypes();
     this.loadPieces();
     this.loadEtudes();
     this.loadCollabs();
  }
  loadPieces(){
    this.piecesService.getAllPiecesJointess().subscribe(
      (data) => {
        this.documents=data;
      },
      (error) => {
        console.error('Error fetching departements:', error);
      }
    );
  }
  loadEtudes(){
    this.etudeService.getAllEtudeLevels().subscribe(
      (data) => {
        this.etudeLevelList=data;
        this.niveauEtudeOptions = data.map((c) => c.niveaux);
        console.log(this.niveauEtudeOptions);

      },
      (error) => {
        console.error('Error fetching etudes levels:', error);
      }
    );
    this.etudeService.getAllEtudeNatures().subscribe(
      (data) => {
        console.log(data);
        this.natureEtudeOptions = data.map((c) => c.nature);
        this.natureEtudeList=data;

      },
      (error) => {
        console.error('Error fetching etude natures:', error);
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
        this.responsablesList=data;
        this.responsables = data.map((responsable) => responsable.resName);
      },
      (error) => {
        console.error('Error fetching departements:', error);
      }
    );
  }
  onDepartementChange(selectedValue:any): void {
    this.selectedDepartement=selectedValue;
    if (this.selectedDepartement) {
      console.log("entered");

      const selectedDep = this.departements.find(dep => dep.depName === this.selectedDepartement);
      if (selectedDep) {
        console.log("eneteed here ");
        this.postesList=selectedDep.postes;
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
addCollaborator(x:NgForm) {
  if(this.uploadedFiles){
    if(this.selectedContractType!="CDD"){
      this.dateFintContrat=new Date;
    }

    if (this.dateFintContrat <= this.dateDebutContrat) {
        this.messageService.add({severity:'info',detail:'Date fin de contrat doit etre après date début de contrat'})
    return;
     }

    const etudeNatureId = this.natureEtudeList.find(o => o.nature === this.selectedNatureEtude)?.id;

    const etudeLevelId = this.etudeLevelList?.find(o => o.niveaux === this.selectedNiveauEtude)?.id;

    const contractTypeId = this.contractTypes.find(o => o.type === x.value.typeContrat)?.id;

    const salaryAdvantageId = this.avantagesList?.find( o=>o.advantage === x.value.avantageSalaire)?.id;

    const posteId = this.postesList?.find(o => o.posteName === x.value.poste)?.id;

    const responsableId = this.responsablesList?.find(o => o.resName === this.selectedResponsable)?.id;

    const requestPayload: Collaborateur = {
      cin: x.value.cin,
      nomComplet: x.value.nomComplet,
      numCompte: x.value.numCompte,
      numSecuriteSociale: x.value.numSecuriteSociale,
      numTelephone: x.value.numTelephone,
      dateNaissance: new Date(x.value.dateNaissance),
      adresse: x.value.adresse,
      email: x.value.email,
      certifications: x.value.certifications,
      salaireDeBase:x.value.salaireDeBase,
      anneeExperience: x.value.anneeExperience,
      dateDebutContrat: new Date(x.value.dateDebutContrat),
      dateFinContrat: new Date(x.value.dateFinContrat),
      recommandation:this.recommendation? true:false,
      collaborateurRecommande: x.value.collaborateurs,
      commentaire: x.value.comment,
    };
    console.log("req playload= ",requestPayload );

    this.collaborateurService.createCollaborateur(
      etudeNatureId,
      etudeLevelId,
      contractTypeId,
      salaryAdvantageId,
      posteId,
      responsableId? responsableId:0,
      requestPayload
    ).subscribe(data => {
      console.log("data at the end :",data);
      this.messageService.add({severity:'success',summary:'Success',detail:'collaborateur ajouter'})
      this.uploadedFiles.forEach((file: File) => {
        this.sannedDocumentService.uploadPdf(file, x.value.cin).subscribe(

        );
      });

    },(error)=>{
      if(error.status===400){
        this.messageService.add({severity:'error',summary:'Erreur',detail:error.error})

      }
      this.messageService.add({severity:'error',summary:'Erreur',detail:"verifier les donnees"})


    });}
    else{
      this.messageService.add({severity:'info',summary:'Attention',detail:'svp uploader le document :)'})
    }




}
onBasicUpload(event:any) {
   this.uploadedFiles = event.files;

}
loadCollabs(){
  this.collaborateurService.getAllCollaborateurs().subscribe(data=>{
    this.collaborateurs=data;
    this.collaborateursList=data.map(c=>c.nomComplet);

  })
}

search(event: any) {
  const query = event.query.toLowerCase();
  this.collaborateursListFinal = this.collaborateursList.filter((collaborateur) =>
    collaborateur.toLowerCase().includes(query)
  );
}
resetForm(form: NgForm): void {
  form.resetForm();
  this.recommendation=false;
}







}
