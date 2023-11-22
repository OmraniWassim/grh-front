import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PiecesJointes } from '../model/ContractType';

@Injectable({
  providedIn: 'root',
})
export class PiecesJointesService {
  private apiUrl = 'http://localhost:8081/api/piecesJointes/all';

  constructor(private http: HttpClient) {}

  getAllPiecesJointess(): Observable<PiecesJointes[]> {
    return this.http.get<PiecesJointes[]>(this.apiUrl);
  }
}