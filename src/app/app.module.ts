import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollaborateurListComponent } from './component/collaborateur-list/collaborateur-list.component';
import { AddCollaborateurComponent } from './component/add-collaborateur/add-collaborateur.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { AppLayoutModule } from './layout/app.layout.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastrModule } from 'ngx-toastr';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { FieldsetModule } from 'primeng/fieldset';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json")
}

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
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    ReactiveFormsModule,
    RadioButtonModule,
    BreadcrumbModule,
    DialogModule,
    MessagesModule,
    ToastrModule.forRoot(),
    AutoCompleteModule,
    ChartModule,
    ToastModule,
    TranslateModule.forRoot({
      loader: {

        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],

      }
    }),
    FieldsetModule



  ],
  providers: [MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
