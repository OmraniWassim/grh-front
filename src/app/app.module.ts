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
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CalendarModule } from "primeng/calendar";


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
    ButtonModule,
    FormsModule,
    InputTextModule,
    CardModule,
    CalendarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
