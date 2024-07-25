import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/user', data);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/user');
  }

  getByUserId(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/user/${id}`);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`http://localhost:8000/user/updateUser/${id}`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8000/user/deleteUser/${id}`);
  }
}
