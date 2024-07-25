import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleForm!: FormGroup;
  roles: any[] = [];
  roleData: any = {};
  currentAction: 'add' | 'update' = 'add';
  currentRoleId: any = null;

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.loadAllRole();
    this.initializeRoleForm();
  }

  initializeRoleForm() {
    this.roleForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required])
    });
  }

  loadAllRole() {
    this.roleService.getAllRole().subscribe({
      next: (resp) => {
        this.roles = resp;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openModal(action: 'add' | 'update', roleIndex?: any) {
    this.currentAction = action;
    this.currentRoleId = null;
    this.roleForm.reset();

    if (action === 'update' && roleIndex !== undefined) {
      this.currentRoleId = roleIndex;
      this.roleData = this.roles.find((roleData: { Id: any }) => roleData.Id === roleIndex);
      if (this.roleData) {
        this.roleForm.setValue({
          Name: this.roleData.Name,
          Description: this.roleData.Description
        });
      }
    }

    const modalElement: any = document.getElementById('roleModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeModal() {
    const modalElement: any = document.getElementById('roleModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }

  saveRole() {
    if (this.roleForm.valid) {
      if (this.currentAction === 'add') {
        this.roleService.createRole(this.roleForm.value).subscribe({
          next: (resp) => {
            this.roleForm.reset();
            this.loadAllRole();
            this.closeModal();
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else if (this.currentAction === 'update' && this.currentRoleId !== null) {
        const roleId = this.currentRoleId;
        let updateRoleData = { ...this.roleForm.value };

        this.roleService.updateRole(roleId, updateRoleData).subscribe({
          next: (resp) => {
            this.roleForm.reset();
            this.loadAllRole();
            this.closeModal();
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }

  deleteRole(id: any): void {
    let confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.roleService.deleteRole(id).subscribe({
        next: (resp: any) => {
          console.log(resp);
          alert('Role deleted successfully');
          this.roles = this.roles.filter(role => role.id !== id);
          this.loadAllRole();
        },
        error: (err: any) => {
          console.error(err);
          alert('An error occurred while deleting the role');
        }
      });
    }
  }
}
