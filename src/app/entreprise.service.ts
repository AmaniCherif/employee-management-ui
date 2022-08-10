import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entreprise } from './entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  getEntreprises() {
    throw new Error('Method not implemented.');
  }
  private baseURL ="http://localhost:9001/entreprises";

  constructor(private httpClient:HttpClient) { }

  getEntreprise() : Observable<Entreprise[]>{
    return this.httpClient.get<Entreprise[]>(`${this.baseURL}`);
  }
  addEntreprise(entreprise: Entreprise){
    return this.httpClient.post<Entreprise>(`${this.baseURL}`,entreprise)
    }
    public updateEntreprise(entreprise: Entreprise): Observable<Entreprise>{
     
      return this.httpClient.put<Entreprise>(`${this.baseURL}`,entreprise)     }

      public deleteEntreprise(id: any): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
      }
}
