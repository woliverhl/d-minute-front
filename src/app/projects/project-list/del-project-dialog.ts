import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectsService } from "app/projects/service/projects-service.service";
import { UsersService } from "app/user/service/users.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from "app/models/project";
import { EntradaLista } from '../../models/EntradaLista';

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

  /*addMember():void{
    if (this.selectedMember != undefined && !this.Project.usuariosNuevoProyecto.includes(this.selectedMember)){
      this.Project.usuariosNuevoProyecto.push(this.selectedMember);
      let index = this.listOfUsers.indexOf(this.selectedMember);
      this.listOfUsers.splice(index, 1) 
      this.selectedMember = undefined;
    }
  }

  deleteMember(miembro: Object): void{
    this.listOfUsers.push(miembro);
    let index = this.Project.usuariosNuevoProyecto.indexOf(miembro);
    index > -1 ? this.Project.usuariosNuevoProyecto.splice(index, 1) : console.log('Member Not Found');
  }

  postProject(){
    if(this.addProjectForm.valid){
      this.Project.usuariosNuevoProyecto = this.Project.usuariosNuevoProyecto.map((cv, i) => {
        return {username: cv['username']};
      });
      if (Number(this.projectId) == 0){
        this.projectsService.addProject(this.Project).subscribe((response) => {
          this.onNoClick();
          this.saved.emit(true);
          console.log(response);
          this.cleanUserForm(this.addProjectForm);
        }, (err) => {
          console.log(err);
        });
      }
      else{
        this.Project.proyectoId = Number(this.projectId);
        this.projectsService.editProject(this.Project).subscribe((response) => {
          this.onNoClick();
          this.saved.emit(true);
          console.log(response);
          this.cleanUserForm(this.addProjectForm);
        }, (err) => {
          console.log(err);
        });
      }
    }
  }
  
  loadProyectoExistente() {
      this.projectsService.getProjectById(this.projectId).subscribe(
        (response: Project) => {
          this.Project = response;
          this.loadListaUserExiste();
        },(err)=>{
          console.log(err);
        });
  }*/

}
