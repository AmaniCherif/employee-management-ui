import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employe } from './employe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private baseURL ="http://localhost:9001/employees";
  

  constructor(private httpClient:HttpClient) { }
  getEmployees() : Observable<Employe[]>{
    return this.httpClient.get<Employe[]>(`${this.baseURL}`);
  }
  addEmploye(employe: Employe){
    return this.httpClient.post<Employe>(`${this.baseURL}`,employe)
    }
    public updateEmploye(employe: Employe): Observable<Employe> {
      const reqHeader = new HttpHeaders().set('Content-Type',"application/json").set("accept",'application/json');
      console.log("toto:::::::::::::"+employe.nom)
      return this.httpClient.put<Employe>(`${this.baseURL}`, employe,  {headers : reqHeader});
    }
      public deleteEmploye(id: any): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
      }
    }
