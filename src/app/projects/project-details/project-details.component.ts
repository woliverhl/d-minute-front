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
import { UsersListComponent } from "app/user/users-list/users-list.component";
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
  listOfUsers: Array<Object>;
  public saving: Boolean;
  public selectedMember: Object;
  addMeetingForm: FormGroup;
  addThemeForm: FormGroup;
  activeMeeting: Reunion = undefined;
  private _differ: any;
  selectedMeeting: Reunion;
  temaSelectedActa: FormArray;
  themeCounter: any = 0;
  themeList: any[] = [];
  nuevaReunion: Reunion;
  
  constructor(private projectService: ProjectsService, 
      private userService: UsersService, private route: ActivatedRoute, 
    public Reunion: Reunion, private fb: FormBuilder, private dialog: MatDialog) {
        this.Reunion.usuarioActa = [];
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
    this.getListUsers();
    //this.createMeetingForm();
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

  switchPostMeeting(){
    this.saving = true; 
  }

  private guardarReunion(reunion: Reunion): void{
    console.log("Nueva Reu: " + JSON.stringify(reunion));
  }

  createMeetingForm() {
    this.addMeetingForm = this.fb.group({
      fecha: [this.Reunion.fecha, Validators.required],
      resumen: [this.Reunion.resumen, Validators.required],
      usuarioActa: [this.Reunion.usuarioActa, Validators.required],
      selectedMember: [this.selectedMember]
    });
  }

  addMember(): void {
    /*if (this.selectedMember != undefined && !this.Reunion.usuarioActa.includes(this.selectedMember)) {
      //this.Reunion.usuarioActa.push(this.selectedMember);
      let index = this.listOfUsers.indexOf(this.selectedMember);
      this.listOfUsers.splice(index, 1)
      this.selectedMember = undefined;
    }*/
  }

  deleteMember(miembro: Object): void {
    let index = 0;//this.Reunion.usuarioActa.indexOf(miembro);
    index > -1 ? this.Reunion.usuarioActa.splice(index, 1) : console.log('Member Not Found');
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

  displayAttendants(){
    let dialogRef = this.dialog.open(Atendants, {
      width: '80%',
      height: '80%',
      data: { id: this.selectedMeeting['actaId']}
    });
  }

  displayAddThemeDialog(){
    let dialogRef = this.dialog.open(AddTheme, {
      width: '80%',
      height: '80%',
      data: { id: this.selectedMeeting['actaId']}
    });
  }

}

@Component({
  selector: 'atttendants-details-dialog',
  templateUrl: './atttendants-details-dialog.html',
  styleUrls: ['./atttendants-details-dialog.scss']
})
export class Atendants implements AfterContentInit  {

  projectId: string;
  actaId: string;
  listOfAttendants: Object[];
  edit: Boolean;
  acta: Array<Reunion>;
  @ViewChild(UsersListComponent)
  private userListComponent: UsersListComponent;

  constructor(public dialogRef: MatDialogRef<Atendants>, 
    private projectService: ProjectsService, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data){
      this.edit = false;
      this.actaId = data.id;
  }

  ngAfterContentInit() {
    this.getAttendantList();
  }

  getAttendantList() {
    //Ugly solution
    setTimeout(() => {
      this.projectService.getReunionById(this.actaId).subscribe(
        (data: Array<Reunion>) => {
          this.acta = data;
          this.listOfAttendants = data['usuarioActa'];
        }, (err) => {
          console.log(err);
        }
      );
    }, 0);
  }

  submitList(event:boolean){
    if(event){
      let fixedacta = this.userListComponent.listOfSelectedUsers.map((usuario, index) => {
          delete usuario['fullName'];
          return usuario;
      });
    this.acta['usuarioActa'] = fixedacta;
    this.projectService.postReunion(this.acta).subscribe(
      (data) => {
        this.userListComponent.listOfSelectedUsers = [];
        console.log(data);
      },(err) => {
        console.log(err)
      });
    }

  }
  
  editAttendants(){
    this.edit = true;
  }
}

@Component({
  selector: 'add-theme-dialog',
  templateUrl: './add-theme-dialog.html',
  styleUrls: ['./add-theme-dialog.scss']
})
export class AddTheme implements OnInit  {
  public addThemeForm: FormGroup;
  private actaId: any;

  constructor(public dialogRef: MatDialogRef<AddTheme>, 
    private projectService: ProjectsService, private route: ActivatedRoute,
    private fb: FormBuilder,  private Tema:TemaActa,
    @Inject(MAT_DIALOG_DATA) data){
      this.actaId = data.id;
    }

  ngOnInit(){
    this.createThemeForm();
  }

  createThemeForm() {
    this.addThemeForm = this.fb.group({
      nombre: [this.Tema.nombre, Validators.required],
      discusion: [this.Tema.discusion, Validators.required]
    });
  }

  postTheme(){
    console.log(this.Tema);
    this.Tema.actaId = this.actaId;
    this.Tema.id = 0;
    this.projectService.postTheme(this.Tema).subscribe(
      (data) => {
        this.dialogRef.close();
      },(err) => {
        console.log(err)
      });
  }
}