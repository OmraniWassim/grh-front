import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsable } from '../model/Responsable';

@Injectable({
  providedIn: 'root',
})
export class ResponsableService {
  private apiUrl = 'http://localhost:8081/api/responsable/all';

  constructor(private http: HttpClient) {}

  getAllResponsables(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(this.apiUrl);
  }
}