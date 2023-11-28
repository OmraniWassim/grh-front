import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, MessageService} from 'primeng/api';
import { Collaborateur } from 'src/app/model/collaborateur';
import { SacannedDocumentService } from 'src/app/service/ScannedDocument.service';
import { CollaborateurService } from 'src/app/service/collaborateur.service';
import { Departement } from 'src/app/model/Departement';

import { ContractTypeService } from 'src/app/service/ContractType.service';
import { DepartementService } from 'src/app/service/Departement.service';
import { EtudeService } from 'src/app/service/Etude.service';
import { PiecesJointesService } from 'src/app/service/PiecesJointes.service';
import { ResponsableService } from 'src/app/service/Responsable.service';
import { SalaryAdvantageService } from 'src/app/service/SalaryAdvantage.service';
import { NgForm } from '@angular/forms';
import { EtudeLevel } from 'src/app/model/EtudeLevel';
import { EtudeNature } from 'src/app/model/EtudeNature';
import { Poste } from 'src/app/model/Poste';
import { Responsable } from 'src/app/model/Responsable';
import { SalaryAdvantage } from 'src/app/model/SalaryAdvantage';



@Component({
  selector: 'app-collaborateur-list',
  templateUrl: './collaborateur-list.component.html',
  styleUrls: ['./collaborateur-list.component.scss'],
})

export class CollaborateurListComponent implements OnInit {
data: any;
options: any;

  toggleRecommendation(value: boolean) {
    this.recommendation = value;
  }





  massSalariale!: number;
  agePyramid!: Map<number, number>;
  averageSalary!: number;
  collaborateurs: any[] = [];
  masseSalariale:any;
  pyramidesDesAges:any;
  salaireMoyen:any;
  breadcrumbItems: MenuItem[] =[];
  deleteProductDialog: boolean=false;
  collabNametoDelete: string="test";
  collabIdTodelete: number=0;
  collabDialog: boolean = false;
  selectedTypeContrat: any="";
  contractTypesList: string[]=[];
  dateDebutContrat!: Date;
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
  recommendation: boolean=false; // Default to 'no'
  comment!: string;
  obligedDocuments:string[]=[] ;
  departements: Departement[] = [];
  departmentsList:string[]=[];
  selectedDepartement!: any;
  postes: any[] = [];
  showResponsableDropdown:boolean=true;
  dateFinContrat!: Date ;
  idOfCollabToUpdate:number | undefined;
  @ViewChild('addForm') addForm!: NgForm;

  constructor(private messageService: MessageService,private cdr: ChangeDetectorRef,private router: Router,private sannedDocumentService:SacannedDocumentService,private collaborateurService:CollaborateurService, private avantageService:SalaryAdvantageService,private departementService: DepartementService,private responsableService: ResponsableService,
    private contractTypeService:ContractTypeService,private piecesService : PiecesJointesService,private etudeService: EtudeService,private toaster:ToastrService) {}

  ngOnInit(): void {
    this.collaborateurService.calculateMassSalariale().subscribe((result) => {
      this.massSalariale = result;
    });

    this.collaborateurService.calculateAgePyramid().subscribe((result) => {
      this.agePyramid = result;
      console.log("result=",result);
      
      const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
      this.data = {
        labels: Object.keys(result),
        datasets: [
          {
              data: Object.values(result),
              backgroundColor: ['#3498db', '#f1c40f', '#2ecc71', '#e74c3c', '#9b59b6', '#e67e22'],
              hoverBackgroundColor: ['#2980b9', '#f39c12', '#27ae60', '#c0392b', '#8e44ad', '#d35400']
          }
      ]
      
    };

    this.options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
    });

    this.collaborateurService.calculateAverageSalary().subscribe((result) => {
      this.averageSalary = result;
    });




    this.avantageService.getAllSalaryAdvantages().subscribe(
      (data) => {
        this.avantagesList=data;
      }
    );
     this.loadCollaborateurs();
     this.loadDepartements();
     this.loadResponsables();
     this.loadContractTypes();
     this.loadPieces();
     this.loadEtudes();
     this.loadCollabs();
    this.breadcrumbItems = [

      {
          label: 'Consult GRH', icon: 'pi pi-fw pi-search'
      },

  ];

  }

  formatAgePyramid(agePyramid: any): string {
    return JSON.stringify(agePyramid);
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.collaborateurService.deleteCollaborateur(this.collabIdTodelete).subscribe(() => {
      this.toaster.success("success","collaboratuer supprimer");
      this.loadCollaborateurs();

    });
    console.log('deleted');
  }

  displayInformation(){

  }
  deleteProduct(collabId: number,name:string) {
    this.deleteProductDialog = true;
    this.collabNametoDelete=name;
    this.collabIdTodelete=collabId;

}

  loadCollaborateurs() {

    this.collaborateurService.getAllCollaborateurs().subscribe((data) => {
      this.collaborateurs = data;
    });
  }

  addNewCollab() {
    this.router.navigate(['/add-collaborateur']);
  }

  updateCollab(collaborateur: Collaborateur) {
    console.log("collab=",collaborateur);
    this.idOfCollabToUpdate=collaborateur.id;

    //intilise the form with the collaborateur passed with parameter
    this.cin= collaborateur.cin;
    this.selectedDepartement = collaborateur.poste?.departement.depName;
    this.onDepartementChange(this.selectedDepartement);
    this.nomComplet= collaborateur.nomComplet;
    this.numCompte= collaborateur.numCompte;
    this.numSecuriteSociale= collaborateur.numSecuriteSociale;
    this.dateNaissance= new Date(collaborateur.dateNaissance);
    this.numTelephone= collaborateur.numTelephone;
    this.adresse= collaborateur.adresse;
    this.email= collaborateur.email;
    this.certifications = collaborateur.certifications;
    this.selectedNatureEtude = collaborateur.etudeNature?.nature;
    this.selectedNiveauEtude = collaborateur.etudeLevel?.niveaux;
    this.anneeExperience = collaborateur.anneeExperience;
    this.selectedTypeContrat = collaborateur.contractType?.type;
    this.OnSelectType(false);
    this.salaireDeBase = collaborateur.salaireDeBase    ;
    this.selectedAvantage = collaborateur.salaryAdvantage?.advantage;
    this.dateDebutContrat = new Date(collaborateur.dateDebutContrat);
    this.dateFinContrat = new Date(collaborateur.dateFinContrat);
    this.selectedPoste = collaborateur.poste?.posteName;
    this.selectedResponsable = collaborateur.responsable;
    this.recommendation=collaborateur.recommandation;
    this.comment=collaborateur.commentaire;
    this.selectedCollabName=collaborateur.collaborateurRecommande;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.collabDialog = true;
    }, 0.5);

  }

  deleteCollab(collabId: number) {
    console.log("deleted");

  }

  downloadPDF(id: number): void {
    this.sannedDocumentService.downloadPdf(id).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `document_${id}.pdf`;
        link.click();
      },
      (error) => {
        console.error('Error downloading PDF:', error);
      }
    );
  }
  saveProduct() {
    throw new Error('Method not implemented.');
    }
    hideDialog() {
      this.collabDialog = false;
    }

    loadPieces(){
      this.piecesService.getAllPiecesJointess().subscribe(
        (data: any[]) => {
          this.documents=data;
        },
        (error: any) => {
          console.error('Error fetching departements:', error);
        }
      );
    }
    loadEtudes(){
      this.etudeService.getAllEtudeLevels().subscribe(
        (data: any[]) => {
          this.etudeLevelList=data;
          this.niveauEtudeOptions = data.map((c: { niveaux: any; }) => c.niveaux);
          console.log(this.niveauEtudeOptions);

        },
        (error: any) => {
          console.error('Error fetching etudes levels:', error);
        }
      );
      this.etudeService.getAllEtudeNatures().subscribe(
        (data: any[]) => {
          console.log(data);
          this.natureEtudeOptions = data.map((c: { nature: any; }) => c.nature);
          this.natureEtudeList=data;

        },
        (error: any) => {
          console.error('Error fetching etude natures:', error);
        }
      );

    }


    loadContractTypes(): void {
      this.contractTypeService.getAllContractTypes().subscribe(
        (data: any[]) => {
          this.contractTypes=data;
          this.contractTypesList = data.map((c: { type: any; }) => c.type);
        },
        (error: any) => {
          console.error('Error fetching departements:', error);
        }
      );
    };
    loadDepartements(): void {
      this.departementService.getAllDepartements().subscribe(
        (data: any[]) => {
          this.departements=data;
          this.departmentsList = data.map((departement: { depName: any; }) => departement.depName);
        },
        (error: any) => {
          console.error('Error fetching departements:', error);
        }
      );
    }
    loadResponsables(): void {
      this.responsableService.getAllResponsables().subscribe(
        (data: any[]) => {
          this.responsablesList=data;
          this.responsables = data.map((responsable: { resName: any; }) => responsable.resName);
        },
        (error: any) => {
          console.error('Error fetching departements:', error);
        }
      );
    }
    onDepartementChange(selectedValue:any): void {
      this.selectedDepartement=selectedValue;
      if (this.selectedDepartement) {
        console.log("entered");

        const selectedDep = this.departements.find((dep) => dep.depName === this.selectedDepartement);
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
  OnSelectType(afterChange:boolean){
    const selectedType = this.contractTypes.find((c: { type: any; }) => c.type===this.selectedTypeContrat);
    if(afterChange)this.salaireDeBase=selectedType.salaireBase;
    this.avantages=selectedType.salaryAdvantages.map((s: { advantage: SalaryAdvantage; })=>s.advantage);

    this.contractTypeService.getPiecesJointesByContractType(this.selectedTypeContrat).subscribe(
      (data: any) => {
        this.obligedDocuments=data;
      },
      (error: any) => {
        console.error('Error fetching pieces jointes:', error);
      }
    );
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

 saveUpdate(x: NgForm) {
  if(this.selectedContractType!="CDD"){
    this.dateFinContrat=new Date;
  }

  if (this.dateFinContrat <= this.dateDebutContrat) {
      this.messageService.add({severity:'info',detail:'Date fin de contrat doit etre après date début de contrat'})
  return;
   }
    const etudeNatureId = this.natureEtudeList.find(o => o.nature === this.selectedNatureEtude)?.id;
    console.log('etudeNatureId:', etudeNatureId);

    const etudeLevelId = this.etudeLevelList?.find(o => o.niveaux === this.selectedNiveauEtude)?.id;
    console.log('etudeLevelId:', etudeLevelId);

    const contractTypeId = this.contractTypes.find(o => o.type === x.value.typeContrat)?.id;
    console.log("contract type id:", contractTypeId);

    console.log("contract type id:" ,contractTypeId);

    const salaryAdvantageId = this.avantagesList?.find( o=>o.advantage === x.value.avantageSalaire)?.id;
    console.log('salaryAdvantageId:', salaryAdvantageId);

    const posteId = this.postesList?.find(o => o.posteName === x.value.poste)?.id;
    console.log('posteId:', posteId);

    const responsableId = this.responsablesList?.find(o => o.resName === this.selectedResponsable)?.id;
    console.log('responsableId:', responsableId);

    const departementId=this.departements.find(o=>o.depName===this.selectedDepartement)?.id;
    console.log("depId= ",departementId);

    const requestPayload: Collaborateur = {
      id:this.idOfCollabToUpdate,
      cin: x.value.cin,
      nomComplet: x.value.nomComplet,
      numCompte: x.value.numCompte,
      numSecuriteSociale: x.value.numSecuriteSociale,
      numTelephone: x.value.numTelephone,
      dateNaissance: new Date(x.value.dateNaissance),
      adresse: x.value.adresse,
      email: x.value.email,
      salaireDeBase:x.value.salaireDeBase,
      certifications: x.value.certifications,
      anneeExperience: x.value.anneeExperience,
      dateDebutContrat: new Date(x.value.dateDebutContrat),
      dateFinContrat: new Date(x.value.dateFinContrat),
      recommandation:this.recommendation? true:false,
      collaborateurRecommande: x.value.collaborateurs,
      commentaire: x.value.comment,
    };
    console.log("req playload= ",requestPayload );

    if(!this.uploadedFiles)
    {this.collaborateurService.updateCollaborateur(
      etudeNatureId,
      etudeLevelId,
      contractTypeId,
      salaryAdvantageId,
      posteId,
      responsableId,
      false,
      requestPayload
    ).subscribe(data => {
      console.log("data at the end :",data);
      this.collabDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

      this.loadCollaborateurs();

    },(error)=>{
      console.log("error happened here ");
      this.toaster.error("error happened")

    });}
    else{
      this.collaborateurService.updateCollaborateur(
        etudeNatureId,
        etudeLevelId,
        contractTypeId,
        salaryAdvantageId,
        posteId,
        responsableId,
        true,
        requestPayload
      ).subscribe(data => {
        console.log("data at the end :",data);
        this.collabDialog = false;
        this.uploadedFiles.forEach((file: File) => {
          this.sannedDocumentService.uploadPdf(file, x.value.cin).subscribe(data=>{

          },(error)=>{
            if(error.status===200){
              this.loadCollaborateurs();

            }
          });
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });


      },(error)=>{
        console.log("error happened here ");
        this.toaster.error("error happened");

      });
    }
 }
 uploadJasper(){
  this.collaborateurService.downloadPdf().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Jasper Report.pdf`;
        link.click();
      },
      (error) => {
        console.error('Error downloading PDF:', error);
      }
    );

 }




}
