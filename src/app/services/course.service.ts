import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  createCourse(course:any):Observable<any>
  {
    return this.http.post('http://localhost:8000/course',course);
  }

  getAllCourseType(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/courseType');
  }

  getAllCourse():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8000/course')
  }

  updateCourse(course: any, courseId: any): Observable<any> {
    return this.http.put(`http://localhost:8000/course/updateCourse/${courseId}`, course)
  }
  
  deleteCourse(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8000/course/deletecourse/${id}`);
  }
}
