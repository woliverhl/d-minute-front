import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectsService } from "app/projects/service/projects-service.service";
import { UsersService } from "app/user/service/users.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from "app/models/project";

@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.html',
  styleUrls: ['./add-project-dialog.scss']
})
export class AddProjectDialog implements OnInit {

  public listOfUsers: any;
  public addProjectForm: FormGroup;
  public selectedMember: Object;
  public saved: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialog>, private UsersService: UsersService, 
    private fb: FormBuilder, public Project: Project, private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.createProjectForm();
      this.Project.usuariosNuevoProyecto = [];
      this.cleanUserForm(this.addProjectForm);
    }

    cleanUserForm(formulario: FormGroup) {
      if(formulario.valid){
          formulario.reset();
      }
  }

  ngOnInit() {
    setTimeout(() => {
      this.UsersService.getListUsers().subscribe(
        (response:Array<Object>) => {
          this.listOfUsers = response.map((cv) => {
            return Object.assign({ fullName: `${cv['nombre']} ${cv['apellido']}` }, cv);
          });
        },
        (err) => {
          console.log(err)
        }
      );
    }, 0);
  }

  createProjectForm() {
    this.addProjectForm = this.fb.group({
      name: [this.Project.nombre, Validators.required],
      description: [this.Project.descripcion],
      startDate: [this.Project.fechaInicio, Validators.required],
      deathLine: [this.Project.fechaFin, Validators.required],
      usuariosNuevoProyecto: [this.Project.usuariosNuevoProyecto],
      selectedMember: [this.selectedMember]
    });
  }

  addMember():void{
    if (this.selectedMember != undefined && !this.Project.usuariosNuevoProyecto.includes(this.selectedMember)){
      this.Project.usuariosNuevoProyecto.push(this.selectedMember);
      let index = this.listOfUsers.indexOf(this.selectedMember);
      this.listOfUsers.splice(index, 1) 
      this.selectedMember = undefined;
    }
  }

  onNoClick(): void {
    this.cleanUserForm(this.addProjectForm);
    this.dialogRef.close();
  }

  deleteMember(miembro: Object): void{
    let index = this.Project.usuariosNuevoProyecto.indexOf(miembro);
    index > -1 ? this.Project.usuariosNuevoProyecto.splice(index, 1) : console.log('Member Not Found');
  }

  postProject(){
    if(this.addProjectForm.valid){
      let postObject = Object.assign({}, this.Project);
      this.Project.usuariosNuevoProyecto = this.Project.usuariosNuevoProyecto.map((cv, i) => {
        return {username: cv['username']};
      });
      this.projectsService.addProject(this.Project).subscribe((response) => {
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
