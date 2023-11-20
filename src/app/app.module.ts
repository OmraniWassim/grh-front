import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollaborateurListComponent } from './component/collaborateur-list/collaborateur-list.component';
import { AddCollaborateurComponent } from './component/add-collaborateur/add-collaborateur.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { AppLayoutModule } from './layout/app.layout.module';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    AppComponent,
    CollaborateurListComponent,
    AddCollaborateurComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    AppLayoutModule,
    ButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
