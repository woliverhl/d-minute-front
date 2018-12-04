import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectsService } from "app/projects/service/projects-service.service";
import { UsersService } from "app/user/service/users.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from "app/models/project";

@Component({
  selector: 'del-project-dialog',
  templateUrl: './del-project-dialog.html',
  styleUrls: ['./del-project-dialog.scss']
})
export class DelProjectDialog implements OnInit {

  ngOnInit(): void {
    
  }
  public listOfUsers: any;
  public delProjectForm: FormGroup;
  public selectedMember: Object;
  public saved: EventEmitter<any> = new EventEmitter();
  projectId: String;

  constructor(
    public dialogRef: MatDialogRef<DelProjectDialog>, private UsersService: UsersService, 
    private fb: FormBuilder, public Project: Project, private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: String,) { 
      this.createProjectForm();
      this.saved.emit(false);
      this.cleanUserForm(this.delProjectForm);
      if (data != "0"){
        this.projectId = data;
        this.loadProyectoExistente();
      }
    }

    cleanUserForm(formulario: FormGroup) {
      if(formulario.valid){
          formulario.reset();
      }
  }

  createProjectForm() {
    this.delProjectForm = this.fb.group({
      name: [this.Project.nombre, Validators.required],
      description: [this.Project.descripcion],
      proyectoId: [this.Project.proyectoId]
    });
  }

  delProject() {
    this.projectsService.delProjectById(this.projectId).subscribe(
      (response: Project) => {
        this.onNoClick();
        this.saved.emit(true);
      },(err)=>{
        console.log(err);
      });
  }

  loadProyectoExistente() {
    this.projectsService.getProjectById(this.projectId).subscribe(
      (response: Project) => {
        this.Project = response;
      },(err)=>{
        console.log(err);
      });
  }

  onNoClick(): void {
    this.cleanUserForm(this.delProjectForm);
    this.dialogRef.close();
  }

}
