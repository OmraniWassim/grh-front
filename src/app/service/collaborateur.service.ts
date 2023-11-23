import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborateur } from '../model/collaborateur';

@Injectable({
  providedIn: 'root',
})
export class CollaborateurService {
  private apiUrl = 'http://localhost:8081/api/collaborateurs';

  constructor(private http: HttpClient) {}

  getAllCollaborateurs(): Observable<Collaborateur[]> {
    return this.http.get<Collaborateur[]>(`${this.apiUrl}/all`);
  }

  getCollaborateurById(id: number): Observable<Collaborateur> {
    return this.http.get<Collaborateur>(`${this.apiUrl}/${id}`);
  }

  createCollaborateur(
    etudeNatureId?: number,
    etudeLevelId?: number,
    contractTypeId?: number,
    salaryAdvantageId?: number,
    posteId?: number,
    responsableId?: number,
    collaborateur?: Collaborateur
  ): Observable<Collaborateur> {
    const url = `${this.apiUrl}/add/${etudeNatureId}/${etudeLevelId}/${contractTypeId}/${salaryAdvantageId}/${posteId}/${responsableId}`;
    return this.http.post<Collaborateur>(url, collaborateur);
  }

  updateCollaborateur(id: number, updatedCollaborateur: Collaborateur): Observable<Collaborateur> {
    return this.http.put<Collaborateur>(`${this.apiUrl}/${id}`, updatedCollaborateur);
  }

  deleteCollaborateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
