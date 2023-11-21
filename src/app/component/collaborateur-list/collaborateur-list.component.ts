import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem} from 'primeng/api';
import { CollaborateurService } from 'src/app/service/collaborateur.service';



@Component({
  selector: 'app-collaborateur-list',
  templateUrl: './collaborateur-list.component.html',
  styleUrls: ['./collaborateur-list.component.scss'],
})

export class CollaborateurListComponent implements OnInit {

  collaborateurs: any[] = [];
  masseSalariale:any;
  pyramidesDesAges:any;
  salaireMoyen:any;
  breadcrumbItems: MenuItem[] =[];
  deleteProductDialog: boolean=false;
  collabNametoDelete: string="test";
  collabIdTodelete: number=0;

  constructor(private collaborateurService: CollaborateurService, private router: Router,private toaster:ToastrService) {}

  ngOnInit(): void {
    this.loadCollaborateurs();
    this.breadcrumbItems = [

      {
          label: 'Consult GRH', icon: 'pi pi-fw pi-search'
      },

  ];

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
    console.log("enterd");

    this.collaborateurService.getAllCollaborateurs().subscribe((data) => {
      this.collaborateurs = data;
      console.log("data =",data)
    });
  }

  addNewCollab() {
    this.router.navigate(['/add-collaborateur']);
  }

  updateCollab(collabId: number) {
    this.router.navigate(['/update-collaborateur', collabId]);
  }

  deleteCollab(collabId: number) {
    console.log("deleted");

  }

  downloadPDF(collabId: number) {

  }
}
