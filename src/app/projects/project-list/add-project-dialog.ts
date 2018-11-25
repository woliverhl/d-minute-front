import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectsService } from "app/projects/service/projects-service.service";
import { UsersService } from "app/user/service/users.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from "app/models/project";
import { EntradaLista } from '../../models/EntradaLista';

@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.html',
  styleUrls: ['./add-project-dialog.scss']
})
export class AddProjectDialog implements OnInit {

  ngOnInit(): void {
    
  }
  public listOfUsers: any;
  public addProjectForm: FormGroup;
  public selectedMember: Object;
  public saved: EventEmitter<any> = new EventEmitter();
  projectId: String;
  textoBoton: String;

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialog>, private UsersService: UsersService, 
    private fb: FormBuilder, public Project: Project, private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: String,) { 
      this.textoBoton = "CREAR NUEVO PROYECTO";
      this.createProjectForm();
      this.Project.usuariosNuevoProyecto = [];
      this.cleanUserForm(this.addProjectForm);
      this.projectId = data;
      this.saved.emit(false);
      if (data != "0"){
        this.textoBoton = "MODIFICAR PROYECTO";
        this.loadProyectoExistente();
      }
      else{
        this.loadListaUser();
      }
    }

    cleanUserForm(formulario: FormGroup) {
      if(formulario.valid){
          formulario.reset();
      }
  }

  loadListaUser() {
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

  loadListaUserExiste() {
    setTimeout(() => {
      let entradaLista: EntradaLista = new EntradaLista();
      entradaLista.numero = Number(this.projectId);
      entradaLista.tipo = "PROY";
      this.UsersService.postListUsersParam(entradaLista).subscribe(
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
      selectedLider: [this.Project.username, Validators.required],
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
  
  onNoClick(): void {
    this.cleanUserForm(this.addProjectForm);
    this.dialogRef.close();
  }

  loadProyectoExistente() {
      this.projectsService.getProjectById(this.projectId).subscribe(
        (response: Project) => {
          this.Project = response;
          this.loadListaUserExiste();
        },(err)=>{
          console.log(err);
        });
  }

}
