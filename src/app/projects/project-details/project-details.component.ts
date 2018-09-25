import { Component, EventEmitter, Inject, DoCheck, NgModule, AfterContentInit, ViewChild } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { ProjectsService } from 'app/projects/service/projects-service.service';
import { UsersService } from "app/user/service/users.service";
import { Route, ParamMap, ActivatedRoute  } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Project } from "app/models/project";
import { Reunion } from "app/models/reunion";
import { User } from "app/models/user";
import { ActaDialogica } from '../../models/ActaDialogica';
import { FormGroup } from '@angular/forms';
import { AddMeetingComponent } from './sintaxis/add-meeting';
import { AddTemaComponent } from './sintaxis/add-tema';
import { TemaActa } from '../../models/tema';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {

  actaDialogica: ActaDialogica;
  project: Project;
  projectId: Number;
  reuniones: Reunion [];
  public saving: Boolean;
  addMeetingForm: FormGroup;
  selectedMeeting: Reunion = undefined;
  ActivateMeeting: Reunion = undefined;
  
  constructor(private projectService: ProjectsService, 
      private userService: UsersService, private route: ActivatedRoute, 
    public Reunion: Reunion, private dialog: MatDialog) {
      this.ngOnInit();
    }

  ngOnInit() {
    this.saving = false;
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.projectService.listarMinutaProyecto(params.get('id'))).subscribe(
        (response: ActaDialogica) => {
          this.actaDialogica = response;
          this.projectId = this.actaDialogica.proyectoDto.proyectoId;
          this.project = this.actaDialogica.proyectoDto;
          this.project !== undefined ? this.listarReuniones() : undefined;
        },(err)=>{
          console.log(err);
        });
  }

  listarReuniones(){
    this.reuniones = this.actaDialogica.listaActa;
    this.saving = this.reuniones.length === 0 || this.reuniones.length === undefined ? true : false;
    this.selectedMeeting  = this.reuniones.length > 0 ? this.reuniones[0] : undefined;
    this.reloadList.bind(this);
  }

  selectMeeting(acta: Reunion = undefined){
    if(acta === undefined && this.reuniones.length > 0){
      this.selectedMeeting  = this.reuniones[0];
    }else if(acta !== undefined){
      this.selectedMeeting = acta;
    }
    if(this.selectedMeeting !== undefined && this.selectedMeeting['actaId'] !== undefined){
      this.getActaById(this.selectedMeeting['actaId']);
    }
  }

  getActaById(actaId:any):void{
    this.projectService.getReunionById(actaId).subscribe(
      (data: Reunion) => {
        this.selectedMeeting = data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  openAddMeeting(): void{
    this.project.meet = undefined;
    let dialogRef = this.dialog.open(AddMeetingComponent, {
        width: '744px',
        data: this.project
    });

    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  reloadList(isPosted:boolean):void{
    isPosted ? this.ngOnInit(): undefined;
  }

  openEditMeeting(){
    this.project.meet=this.selectedMeeting;
    let dialogRef = this.dialog.open(AddMeetingComponent, {
      width: '744px',
      data: this.project
  });
    this.selectedMeeting = undefined;
    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openDelMeeting() {
      this.projectService.postDelReunion(this.selectedMeeting).subscribe(
        (response) => {
          this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  openAddTema(): void{
    let temaReunion = this.selectedMeeting
    temaReunion.temaActa = undefined;
    let dialogRef = this.dialog.open(AddTemaComponent, {
        width: '744px',
        data: temaReunion
    });

  dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openEditTema(temaId:any): void{
    let temaReunion = this.selectedMeeting
    let listaTemaActa: Array<TemaActa> = new Array<TemaActa>();
    for (let indexi = 0; indexi < this.selectedMeeting.temaActa.length; indexi++) {
      if (this.selectedMeeting.temaActa[indexi].id == Number(temaId)){
        listaTemaActa.push(this.selectedMeeting.temaActa[indexi]);
        break;
      }
    }
    temaReunion.temaActa = listaTemaActa;
    let dialogRef = this.dialog.open(AddTemaComponent, {
        width: '744px',
        data: temaReunion
    });
  dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openDelTema(temaId:any): void{
    let temaReunion = this.selectedMeeting
    let temaActaDel: TemaActa = undefined;
    for (let indexi = 0; indexi < this.selectedMeeting.temaActa.length; indexi++) {
      if (this.selectedMeeting.temaActa[indexi].id == Number(temaId)){
        temaActaDel = this.selectedMeeting.temaActa[indexi];
        break;
      }
    }
    if (temaActaDel != undefined){
      this.projectService.postDelTheme(temaActaDel).subscribe(
        (response) => {
          this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
    }
  }

}
