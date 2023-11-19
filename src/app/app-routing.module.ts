import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaborateurListComponent } from './component/collaborateur-list/collaborateur-list.component';
import { AddCollaborateurComponent } from './component/add-collaborateur/add-collaborateur.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

const routes: Routes = [
  { path: '', component:AppLayoutComponent ,
  children: [
    {path:'',component : AppLayoutComponent},
    { path: 'collaborateurs', component: CollaborateurListComponent},
    { path: 'add-collaborateur', component: AddCollaborateurComponent }

  ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
