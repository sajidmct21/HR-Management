import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  // Variable
  baseURL:string ='http://localhost:3000/employees'

  constructor(private httpClient:HttpClient) { }

  getAllEmployees():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`)
  }

  getEmp(id:string):Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/${id}`);
  }

  postEmployee(empObj:any):Observable<any>{
    return this.httpClient.post<any>(`${this.baseURL}`,empObj);
  }

  updateEmployee(empObje:any, id:string):Observable<any>{
    return this.httpClient.put<any>(`${this.baseURL}/${id}`,empObje)
  }

  deleteEmp(id:string):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseURL}/${id}`)
  }


}
