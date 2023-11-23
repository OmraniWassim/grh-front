import {SalaryAdvantage} from "../model/SalaryAdvantage";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaryAdvantageService {
  private apiUrl = 'http://localhost:8081/api/avantage/all';

  constructor(private http: HttpClient) {}

  getAllSalaryAdvantages(): Observable<SalaryAdvantage[]> {
    return this.http.get<SalaryAdvantage[]>(this.apiUrl);
  }
}
