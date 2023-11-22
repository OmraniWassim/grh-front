import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractType } from '../model/ContractType';

@Injectable({
  providedIn: 'root',
})
export class ContractTypeService {
  private apiUrl = 'http://localhost:8081/api/contract-type';

  constructor(private http: HttpClient) {}

  getAllContractTypes(): Observable<ContractType[]> {
    return this.http.get<ContractType[]>(this.apiUrl+"/all");
  }
  getPiecesJointesByContractType(contractTypeName: string): Observable<string[]> {
    const url = `${this.apiUrl}/${contractTypeName}/pieces-jointes`;
    return this.http.get<string[]>(url);
}
}