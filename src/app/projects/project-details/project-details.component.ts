import { Component, OnInit, EventEmitter, Inject, DoCheck, NgModule, AfterContentInit, ViewChild } from '@angular/core';
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
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TemaActa } from '../../models/tema';
import { AddMeetingComponent } from './sintaxis/add-meeting';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;
  projectId: Number;
  reuniones: Reunion [];
  public saving: Boolean;
  addMeetingForm: FormGroup;
  activeMeeting: Reunion = undefined;
  selectedMeeting: Reunion;
  
  constructor(private projectService: ProjectsService, 
      private userService: UsersService, private route: ActivatedRoute, 
    public Reunion: Reunion, private fb: FormBuilder, private dialog: MatDialog) {

      }

  ngOnInit() {
    this.saving = false;
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.projectService.getProjectById(params.get('id'))).subscribe(
        (response: Project) => {
          this.projectId = response['proyectoId'];
          this.project = response;
          this.project !== undefined ? this.listarReuniones() : undefined;
        },(err)=>{
          console.log(err);
        });
    //this.getListUsers();
    //this.createMeetingForm();
  }

  listarReuniones(){
    this.projectService.listReunion(this.project.proyectoId).subscribe(
      (response: Reunion[]) => {
        this.reuniones = response;
        this.activeMeeting = this.reuniones.length > 0 ? this.reuniones[0] : undefined;
        this.saving = this.reuniones.length === 0 || this.reuniones.length === undefined ? true : false;
        this.selectMeeting();
      },(err) =>{
        console.log(err);
      }
    );
  }

  private guardarReunion(reunion: Reunion): void{
    console.log("Nueva Reu: " + JSON.stringify(reunion));
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
    let dialogRef = this.dialog.open(AddMeetingComponent, {
        width: '744px',
        height: '533px',
        data: new Reunion()
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.guardarReunion(result)
    })
  }
  
  //**METODOS PARA CREAR UNA REUNIÓN */
  listOfUsers: Array<Object>;
  addThemeForm: FormGroup;
  themeList: any[] = [];
  nuevaReunion: Reunion;
  themeCounter: any = 0;
  public selectedMember: Object;
  private _differ: any;
  temaSelectedActa: FormArray;

  createMeetingForm() {
    this.addMeetingForm = this.fb.group({
      fecha: [this.Reunion.fecha, Validators.required],
      resumen: [this.Reunion.resumen, Validators.required],
      usuarioActa: [this.Reunion.usuarioActa, Validators.required],
      selectedMember: [this.selectedMember]
    });
  }

  crearReunion(){
    /*this.Reunion.usuarioActa = this.Reunion.usuarioActa.map((cv, index) => (
      Object.assign({secretario: 'N', asiste: 'S'},{username: cv.username})
    ));*/
    var payload = Object.assign({ proyectoId: this.projectId}, this.Reunion);
    this.projectService.postReunion(payload)
      .subscribe((response) => {
        console.log(response);
        this.saving = false;
        this.listarReuniones();
      }), (err) => {
        console.log(err);
      };
  }

  getListUsers(){
    this.userService.getListUsers().subscribe(
      (response: Array<Object>) => {
        this.listOfUsers = response.map((cv) => {
          return Object.assign({ fullName: `${cv['nombre']} ${cv['apellido']}`}, cv);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
