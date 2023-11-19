import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaborateurService } from 'src/app/service/collaborateur.service';

@Component({
  selector: 'app-collaborateur-list',
  templateUrl: './collaborateur-list.component.html',
  styleUrls: ['./collaborateur-list.component.css'],
})
export class CollaborateurListComponent implements OnInit {
  collaborateurs: any[] = []; // Adjust the type based on your actual Collaborateur model

  constructor(private collaborateurService: CollaborateurService, private router: Router) {}

  ngOnInit(): void {
    this.loadCollaborateurs();
  }

  loadCollaborateurs() {
    this.collaborateurService.getAllCollaborateurs().subscribe((data) => {
      this.collaborateurs = data;
    });
  }

  addNewCollab() {
    this.router.navigate(['/add-collaborateur']);
  }

  updateCollab(collabId: number) {
    this.router.navigate(['/update-collaborateur', collabId]);
  }

  deleteCollab(collabId: number) {
    // Implement delete logic
  }

  downloadPDF(collabId: number) {

  }
}
