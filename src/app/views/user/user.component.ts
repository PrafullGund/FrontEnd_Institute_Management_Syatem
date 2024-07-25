import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RoleService } from 'src/app/services/role.service';
import { UsertypeService } from 'src/app/services/usertype.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  userForm!: FormGroup;
  roles: any[] = [];
  userTypes: any[] = [];
  currentAction: 'add' | 'update' = 'add';
  currentUserId: any = null;
  userData: any;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private userTypeService: UsertypeService
  ) {}

  ngOnInit(): void {
    this.initializeUserForm();
    this.loadAllRole();
    this.loadAllUserType();
    this.loadAllUser();
  }

  initializeUserForm() {
    this.userForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      UserTypeId: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      Password: new FormControl(''),
      AddressLineOne: new FormControl('', Validators.required),
      AddressLineTwo: new FormControl(''),
      Country: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      PostalCode: new FormControl('', Validators.required),
      EducationTitle: new FormControl('', Validators.required),
      Description: new FormControl(''),
      PassingYear: new FormControl('', Validators.required),
      RoleId: new FormControl('', Validators.required)
    });
  }

  addOrUpdateUser() {
    if (this.userForm.valid) {
      if (this.currentAction === 'add') {
        this.userService.addUser(this.userForm.value).subscribe({
          next: (resp) => {
            this.userForm.reset();
            this.loadAllUser();
            this.closeModal();
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else if (this.currentAction === 'update' && this.currentUserId !== null) {
        const userId = this.currentUserId;
        const updatedUserData = { ...this.userForm.value, Id: userId };
        this.userService.updateUser(userId, updatedUserData).subscribe({
          next: (resp) => {
            this.userForm.reset();
            this.loadAllUser();
            this.closeModal();
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }

  loadAllRole() {
    this.roleService.getAllRole().subscribe({
      next: (resp) => {
        this.roles = resp;
      },
      error: (err) => {
        console.error('Error loading roles:', err);
      }
    });
  }

  loadAllUserType() {
    this.userTypeService.getAllUserType().subscribe({
      next: (resp) => {
        this.userTypes = resp;
      },
      error: (err) => {
        console.error('Error loading user types:', err);
      }
    });
  }

  loadAllUser() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  openModal(action: 'add' | 'update', userId?: any) {
    this.currentAction = action;
    this.currentUserId = null;
    this.userForm.reset();
  
    if (action === 'update' && userId !== undefined) {
      this.currentUserId = userId;
      this.userService.getByUserId(userId).subscribe({
        next: (data) => {
          this.userData = data;
          if (this.userData) {
            this.userForm.setValue({
              FirstName: this.userData.FirstName,
              LastName: this.userData.LastName,
              DOB: this.userData.DOB,
              UserTypeId: this.userData.UserTypeId,
              Email: this.userData.UserCredential?.Email,
              Mobile: this.userData.UserCredential?.Mobile,
              Password: '',
              AddressLineOne: this.userData.UserAdresses?.[0]?.AddressLineOne || '',
              AddressLineTwo: this.userData.UserAdresses?.[0]?.AddressLineTwo || '',
              Country: this.userData.UserAdresses?.[0]?.Country || '',
              State: this.userData.UserAdresses?.[0]?.State || '',
              City: this.userData.UserAdresses?.[0]?.City || '',
              PostalCode: this.userData.UserAdresses?.[0]?.PostalCode || '',
              EducationTitle: this.userData.UserEducationDetails?.[0]?.EducationTitle || '',
              Description: this.userData.UserEducationDetails?.[0]?.Description || '',
              PassingYear: this.userData.UserEducationDetails?.[0]?.PassingYear || '',
              RoleId: this.userData.Role || ''
            });
          }
          this.showModal();
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.showModal();
    }
  }

  showModal() {
    const modalElement: any = document.getElementById('userModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeModal() {
    const modalElement: any = document.getElementById('userModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
    this.userForm.reset();
  }

  deleteUser(id: any): void {
    let confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.userService.deleteUser(id).subscribe({
        next: (resp: any) => {
          alert('User deleted successfully.');
          this.loadAllUser();
        },
        error: (err: any) => {
          console.error(err);
          alert('An error occurred while deleting the user.');
        }
      });
    }
  }
}
