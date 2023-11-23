// collaborateur.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SacannedDocumentService {
  private apiUrl = 'http://localhost:8081/pdf';

  constructor(private http: HttpClient) {}

  public uploadPdf(file: File, cin: number): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('pdf', file);
    formData.append('cin', cin.toString());

    return this.http.post<string>(`${this.apiUrl}/add`, formData);
  }

}
