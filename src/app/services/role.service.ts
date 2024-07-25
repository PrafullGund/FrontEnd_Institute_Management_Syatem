import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  createRole(role: any): Observable<any> {
    return this.http.post('http://localhost:8000/role', role);
  }

  getAllRole(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/role');
  }

  getByRoleId(id:any):Observable<any[]>
  {
    return this.http.get<any[]>(`http://localhost:8000/role/${id}`);
  }

  updateRole(roleId: any, role: any): Observable<any> {
    return this.http.put(`http://localhost:8000/role/updateRole/${roleId}`, role);
  }
  
  
  deleteRole(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8000/role/deleteRole/${id}`);
  }
}