import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectsService } from "app/projects/service/projects-service.service";
import { UsersService } from "app/user/service/users.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from "app/models/project";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'msg-error-dialog',
  templateUrl: './msg-error-dialog.html',
  styleUrls: ['./msg-error-dialog.scss']
})
export class MsgErrorDialog implements OnInit {

  ngOnInit(): void {
    
  }
  public listOfUsers: any;
  public delProjectForm: FormGroup;
  public selectedMember: Object;
  public saved: EventEmitter<any> = new EventEmitter();
  errorMsg: HttpErrorResponse;

  constructor(
    public dialogRef: MatDialogRef<MsgErrorDialog>, private UsersService: UsersService, 
    private fb: FormBuilder, public Project: Project, private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: HttpErrorResponse,) { 
      this.createProjectForm();
      this.saved.emit(false);
      this.cleanUserForm(this.delProjectForm);
      this.errorMsg = data;
    }

    cleanUserForm(formulario: FormGroup) {
      if(formulario.valid){
          formulario.reset();
      }
  }

  createProjectForm() {
    this.delProjectForm = this.fb.group({
      name: [this.Project.nombre, Validators.required]
    });
  }

  onNoClick(): void {
    this.cleanUserForm(this.delProjectForm);
    this.dialogRef.close();
  }
}
