import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtudeNature } from '../model/EtudeNature';
import { EtudeLevel } from '../model/EtudeLevel';

@Injectable({
  providedIn: 'root',
})
export class EtudeService {
  private apiUrl = 'http://localhost:8081/api/etude';

  constructor(private http: HttpClient) {}

  getAllEtudeNatures(): Observable<EtudeNature[]> {
    return this.http.get<EtudeNature[]>(this.apiUrl+'/getNatures');
  }
  getAllEtudeLevels(): Observable<EtudeLevel[]> {
    return this.http.get<EtudeLevel[]>(this.apiUrl+'/getLevels');
  }
}
