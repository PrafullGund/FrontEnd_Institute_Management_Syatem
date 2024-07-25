import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseForm!: FormGroup;
  courses: any[] = [];
  courseData: any = {};
  courseTypesName: any[] = [];
  index: any;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadAllCourseTypeName();
    this.initializeCourseForm();
    this.loadAllCourse();
  }

  addCourse() {
    if (this.courseForm.valid) {
      this.courseService.createCourse(this.courseForm.value).subscribe({
        next: () => {
          this.courseForm.reset();
          this.loadAllCourse();
        }
      });
    }
  }

  closeModal(courseId: string) {
    const modalElement = document.getElementById(courseId) as HTMLElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  deleteCourse(id:any):void
  {
    let confirmation=window.confirm('Are you sure you want to delete this user');
    if(confirmation){
      this.courseService.deleteCourse(id).subscribe({
        next:(resp:any)=>{
          console.log(resp);
          alert('Course deleted successfully');
          this.courses=this.courses.filter(course => course.id!==id);
          this.loadAllCourse();
        },
        error:(err:any)=>{
          console.error(err);
          alert('An error occurred while deleting the course')
        }
      })
    }
  }

  initializeCourseForm() {
    this.courseForm = new FormGroup({
      CourseName: new FormControl('',[Validators.required]),
      Description: new FormControl('',[Validators.required]),
      CourseFees: new FormControl('',[Validators.required]),
      CourseDuration: new FormControl('',[Validators.required]),
      CourseTypeId: new FormControl('',[Validators.required])
    });
  }

  loadAllCourse() {
    this.courseService.getAllCourse().subscribe({
      next: (resp) => {
        this.courses = resp.map((course: any) => {
          const courseType = this.courseTypesName.find(ct => ct.Id === course.CourseTypeId);
          return { ...course, TypeName: courseType ? courseType.TypeName : 'Unknown' };
        });
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  loadAllCourseTypeName() {
    this.courseService.getAllCourseType().subscribe({
      next: (resp) => {
        this.courseTypesName = resp;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openModal(courseId: string, courseIndex?: any) {
    if (courseId === 'updateCourseModal' && courseIndex !== undefined) {
      this.index = courseIndex;
      this.courseData = this.courses.find(course => course.Id === courseIndex);

      if (this.courseData) {
        this.courseForm.setValue({
          CourseName: this.courseData.CourseName,
          Description: this.courseData.Description,
          CourseFees: this.courseData.CourseFees,
          CourseDuration: this.courseData.CourseDuration,
          CourseTypeId: this.courseData.CourseTypeId
        });
      }
    }

    const modalElement = document.getElementById(courseId) as HTMLElement;
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  resetForm()
  {
    this.courseForm.reset();
  }

  updateCourse() {
    const updateCourseData = { ...this.courseForm.value };
    this.courseService.updateCourse(updateCourseData, this.index).subscribe({
      next: () => {
        this.closeModal('updateCourseModal');
        this.loadAllCourse();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
