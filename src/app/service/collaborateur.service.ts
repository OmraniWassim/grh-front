import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  updateCollaborateur(
    etudeNatureId?: number,
    etudeLevelId?: number,
    contractTypeId?: number,
    salaryAdvantageId?: number,
    posteId?: number,
    responsableId?: number,
    withDocument?:boolean,
    updatedCollaborateur?: Collaborateur
  ): Observable<Collaborateur> {
    const url = `${this.apiUrl}/update/${etudeNatureId}/${etudeLevelId}/${contractTypeId}/${salaryAdvantageId}/${posteId}/${responsableId}/${withDocument}`;
    return this.http.put<Collaborateur>(url, updatedCollaborateur);
  }


  deleteCollaborateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  calculateMassSalariale(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/calculateMassSalariale`);
  }

  calculateAgePyramid(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.apiUrl}/calculateAgePyramid`);
  }

  calculateAverageSalary(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/calculateAverageSalary`);
  }
  downloadPdf(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
  
    return this.http.get(`${this.apiUrl}/report`, {
      headers: headers,
      responseType: 'blob' 
    });
  }
}
