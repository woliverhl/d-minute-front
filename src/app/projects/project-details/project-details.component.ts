import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { ProjectsService } from 'app/projects/service/projects-service.service';
import { Route, ParamMap, ActivatedRoute  } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Project } from "app/models/project";
import { Reunion } from "app/models/reunion";
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
  public saving: Boolean;


  constructor(private projectService: ProjectsService, private route: ActivatedRoute) { }

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
    
  }

  switchPostMeeting(){
   this.saving = true; 
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

}
