import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Contrat } from './contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private baseURL ="http://localhost:9001/contrats";

  constructor(private httpClient:HttpClient) { }
  getContrats() : Observable<Contrat[]>{
    return this.httpClient.get<Contrat[]>(`${this.baseURL}`);
  }
  addContrat(contrat: Contrat){
    return this.httpClient.post<Contrat>(`${this.baseURL}`,contrat)
    }
    public updateContrat(contrat:Contrat): Observable<Contrat>{
      console.log("contrat :: " + contrat.employeeId)
      return this.httpClient.put<Contrat>(`${this.baseURL}`,contrat)     }

      public deleteContrat(reference: any): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseURL}/${reference}`);
      }
  }
