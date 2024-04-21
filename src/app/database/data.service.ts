import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let employees: Employee[]=[
      {
        id:'1',
        department:'Accounts',
        empName:'Hassan',
        mobile: '03211234567',
        gender:'Male',
        joiningDate:'2024-01-01',
        email:'sajidmct1@gmail.com',
        salary:123456,
        password:'123',
        status:true
      },
      {
        id:'2',
        department:'Accounts',
        empName:'Sajid',
        mobile: '03211234567',
        gender:'Male',
        joiningDate:'2024-01-01',
        email:'sajidmct2@gmail.com',
        salary:123456,
        password:'123',
       status:true
      }, 
      {
        id:'3',
        department:'Accounts',
        empName:'Abid',
        mobile: '03211234567',
        gender:'Male',
        joiningDate:'2024-01-01',
        email:'sajidmct3@gmail.com',
        salary:123456,
        password:'123',
       status:false
      }, 
    ]
    return employees;
  }
}
