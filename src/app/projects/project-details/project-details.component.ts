import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { ProjectsService } from 'app/projects/service/projects-service.service';
import { UsersService } from "app/user/service/users.service";
import { Route, ParamMap, ActivatedRoute  } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Project } from "app/models/project";
import { Reunion } from "app/models/reunion";
import { User } from "app/models/user";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;
  projectId: String;
  reuniones: Reunion [];
  listOfUsers: Array<Object>;
  public saving: Boolean;
  public selectedMember: Object;
  addMeetingForm: FormGroup;


  constructor(private projectService: ProjectsService, 
      private userService: UsersService, private route: ActivatedRoute, 
      public Reunion: Reunion, private fb: FormBuilder) { }

  ngOnInit() {
    this.saving = false;
    this.route.paramMap.switchMap((params: ParamMap) => 
        this.projectService.getProjectById(params.get('id'))).subscribe(
        (response: Project) => {
          this.project = response;
          this.project !== undefined ? this.listarReuniones() : undefined;
        },(err)=>{
          console.log(err);
        });
    this.getListUsers();

    
  }

  switchPostMeeting(){
   this.saving = true; 
  }

  createMeetingForm() {
    this.addMeetingForm = this.fb.group({
      fecha: [this.Reunion.fecha, Validators.required],
      resumen: [this.Reunion.resumen, Validators.required],
      usuarioActa: [this.Reunion.usuarioActa, Validators.required]
    });
  }

  addMember(): void {
    if (this.selectedMember != undefined && !this.Reunion.usuarioActa.includes(this.selectedMember)) {
      this.Reunion.usuarioActa.push(this.selectedMember);
      let index = this.listOfUsers.indexOf(this.selectedMember);
      this.listOfUsers.splice(index, 1)
      this.selectedMember = undefined;
    }
  }

  crearReunion(reunion: Reunion){
    this.projectService.postReunion(this.project.proyectoId, reunion)
  }

  listarReuniones(){
    this.projectService.listReunion(this.project.proyectoId).subscribe(
      (response: Reunion[]) => {
        console.log(response);
        this.reuniones = response;
      },(err) =>{
        console.log(err);
      }
    );
  }

  getListUsers(){
    this.userService.getListUsers().subscribe(
      (response: Array<Object>) => {
        this.listOfUsers = response.map((cv) => {
          return Object.assign({ fullName: `${cv['nombre']} ${cv['apellido']}` }, cv);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
