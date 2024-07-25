import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
import { UserService } from 'src/app/services/user.service';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit, AfterViewInit {
  activityForm!: FormGroup;
  activities: any[] = [];
  activityTypes: any[] = [];
  activityStatus: any[] = [];
  salesRepresentatives: any[] = [];
  currentAction:'add'|'update'='add';
  currentActivityId:any=null;
  activityData: any = [];
  index: any;

  constructor(
    private activitiesService: ActivitiesService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initializeActivitiesForm();
    this.loadAllActivityType();
    this.loadAllActivityStatus();
    this.loadAllUser();
    this.loadAllActivity();
  }

  ngAfterViewInit(): void {

  }

  initializeActivitiesForm() {
    this.activityForm = new FormGroup({
      ActivityTypeId: new FormControl(''),
      ActivityStatusId: new FormControl(''),
      DueDate: new FormControl(''),
      SalesRepresentativeId: new FormControl(''),
      Summary: new FormControl('')
    });
  }

  addOrUpdateActivities()
  {
    if(this.activityForm.valid){
      if(this.currentAction==='add'){
        this.activitiesService.createActivities(this.activityForm.value).subscribe({
          next:(resp)=>{
            this.activityForm.reset();
            this.loadAllActivity();
            this.closeModal();
          }
        })
      }
    }
  }

  loadAllActivity() {
    this.activitiesService.getAllActivities().subscribe({
      next: (resp: any) => {
        this.activities = resp.map((activity: any) => {
          return {
            ...activity,
            TypeName: this.getActivityTypeName(activity.ActivityTypeId),
            StatusName: this.getActivityStatusName(activity.ActivityStatusId)
          };
        });
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  loadAllActivityType() {
    this.activitiesService.getAllActivitiesType().subscribe({
      next: (resp: any) => {
        this.activityTypes = resp;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  loadAllActivityStatus() {
    this.activitiesService.getAllActivitiesStatus().subscribe({
      next: (resp: any) => {
        this.activityStatus = resp;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  loadAllUser() {
    this.userService.getAllUsers().subscribe({
      next: (resp: any) => {
        this.salesRepresentatives = resp;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  openModal(action:'add'|'update',activitiesId?:any){
    this.currentAction=action;
    this.currentActivityId=null;
    this.activityForm.reset();

    if(action==='update' && activitiesId!==undefined){
      this.currentActivityId=activitiesId;
      this.activitiesService.getActivitiesById(activitiesId).subscribe({
        next:(data)=>{
          this.activityData=data;
          if(this.activityData){
            this.activityForm.setValue({
              ActivityTypeId:this.activityData.ActivityTypeId,
              ActivityStatusId:this.activityData.ActivityStatusId,
              DueDate:this.activityData.DueDate,
              SalesRepresentativeId:this.activityData.SalesRepresentativeId,
              Summary:this.activityData.Summary
            });
          }
          this.showModal();
        },
        error:(err)=>{
          console.error(err);
        }
      })
    }else{
      this.showModal();
    }
  }

  showModal(){
    const modalElement:any=document.getElementById('addActivitiesModal');
    const modal=new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeModal(){
    const modalElement:any=document.getElementById('addActivitiesModal');
    const modal=bootstrap.Modal.getInstance(modalElement);
    if(modal){
      modal.hide();
    }
    this.activityForm.reset()
  }

  getActivityTypeName(activityTypeId: number): string {
    const type = this.activityTypes.find(type => type.Id === activityTypeId);
    return type ? type.TypeName : 'Unknown';
  }

  getActivityStatusName(activityStatusId: number): string {
    const status = this.activityStatus.find(status => status.Id === activityStatusId);
    return status ? status.StatusName : 'Unknown';
  }
}
