import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private collaborateurService: CollaborateurService, private router: Router) {}

  ngOnInit(): void {
    this.loadCollaborateurs();
  }
  displayInformation(){
    
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
