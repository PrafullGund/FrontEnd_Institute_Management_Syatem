import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }

  createActivities(activities: any): Observable<any> {
    return this.http.post('http://localhost:8000/activities', activities);
  }

  getAllActivitiesType(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8000/activityType');
  }

  getAllActivitiesStatus(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8000/activityStatus');
  }

  getAllActivities(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8000/activities');
  }

  getActivitiesById(id:any):Observable<any>{
    return this.http.get<any[]>(`http://localhost:8000/activities/${id}`)
  }

  updateActivities(data: any, id: any): Observable<any> {
    return this.http.put(`http://localhost:8000/activities/updateActivities/${id}`, data);
  }

  
}
