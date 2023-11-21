import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../model/Departement';

@Injectable({
  providedIn: 'root',
})
export class DepartementService {
  private apiUrl = 'http://localhost:8081/api/departement/all';

  constructor(private http: HttpClient) {}

  getAllDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }
}
