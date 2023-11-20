import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {

  constructor() { }
  cin!: number;
  nomComplet!: string ;
  numCompte!: number;
  numSecuriteSociale!: number;
  numTelephone!: number;
  dateNaissance!: Date;
  adresse!: string;
  email!: string;

  ngOnInit(): void {
  }

}
