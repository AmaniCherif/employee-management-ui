import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseURL ="http://localhost:9001/departments";

  constructor(private httpClient:HttpClient) { }
  
  getDepartments() : Observable<Department[]>{
    return this.httpClient.get<Department[]>(`${this.baseURL}`);
  }
  addDepartments(department: Department){
    return this.httpClient.post<Department>(`${this.baseURL}`,department)
    }
    public updateDepartments(department:Department): Observable<Department>{
      const reqHeader = new HttpHeaders().set('Content-Type',"application/json").set("accept",'application/json');
      return this.httpClient.put<Department>(`${this.baseURL}`,department,  {headers : reqHeader})     }

      public deleteDepartments(id: any): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
      }
}
