import { Component } from '@angular/core';
import { ProjectsService } from 'app/projects/service/projects-service.service';
import { ParamMap, ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import { Project } from "app/models/project";
import { Reunion } from "app/models/reunion";
import { ActaDialogica } from '../../models/ActaDialogica';
import { FormGroup } from '@angular/forms';
import { AddMeetingComponent } from './sintaxis/add-meeting';
import { AddTemaComponent } from './sintaxis/add-tema';
import { TemaActa } from '../../models/tema';
import { ActaService } from '../service/acta-service.service';
import { TemaService } from '../service/tema-service.service';
import { AddElementoDialogoComponent } from './sintaxis/add-elemento-dialogo';
import { delMeetingComponent } from './del-acta-dialog';
import { delTemaComponent } from './del-tema-dialog';
import { ElementoDialogoService } from '../service/elemento-service.service';
import { ElementoDialogo } from '../../models/ElementoDialogo';


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
  
  constructor(private projectService: ProjectsService, private actaService: ActaService, 
      private temaService: TemaService, private elementoService: ElementoDialogoService,
      private route: ActivatedRoute, 
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
          this.reuniones = this.actaDialogica.listaActa;
          this.selectedMeeting = this.actaDialogica.actaDto;
        },(err)=>{
          console.log(err);
        });
  }

  selectMeeting(acta: Reunion = undefined){
    console.log("ingreso selectMeeting: " + this.selectedMeeting['actaId']);
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
    this.actaService.getReunionById(actaId).subscribe(
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
        width: '644px',
        data: this.project
    });
    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  reloadList(isPosted:boolean):void{
    isPosted ? this.ngOnInit(): undefined;
  }

  openEditMeeting(){
    this.ActivateMeeting = this.selectedMeeting;
    this.project.meet=this.selectedMeeting;
    let dialogRef = this.dialog.open(AddMeetingComponent, {
      width: '644px',
      data: this.project
  });
    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openDelMeeting(){
    let dialogRef = this.dialog.open(delMeetingComponent, {
      width: '644px',
      data: this.selectedMeeting
  });
    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openAddTema(): void{
    let temaId:TemaActa = new TemaActa();
    temaId.actaId = this.selectedMeeting.actaId
    temaId.id = 0;
    let dialogRef = this.dialog.open(AddTemaComponent, {
        width: '644px',
        data: temaId
    });
    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openEditTema(temaId:TemaActa): void{
    let dialogRef = this.dialog.open(AddTemaComponent, {
        width: '644px',
        data: temaId
    });
    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openDelTema(temaId:TemaActa): void{
    let dialogRef = this.dialog.open(delTemaComponent, {
      width: '644px',
      data: temaId
    });
    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openElementoDialogo(temaId:TemaActa){
    var nuevoTema: TemaActa = this.retornaTemaSeleccionada(temaId);
    nuevoTema.elementoDialogoDto = new Array<ElementoDialogo>();
    var temasLista: Array<TemaActa> = new Array<TemaActa>(); 
    temasLista.push(nuevoTema);
    var nuevoElemento: Reunion = this.retornaReunionSeleccionada();
    nuevoElemento.temaActa = temasLista;

    let dialogRef = this.dialog.open(AddElementoDialogoComponent, {
      width: '644px',
     data: nuevoElemento
  });
    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openEditElementoDialogo(elementoId:String): void{
    let dialogRef;
    this.elementoService.getFiltroElementoIdActa(elementoId).subscribe(
      (response) => {
          dialogRef = this.dialog.open(AddElementoDialogoComponent, {
          width: '644px',
          data: response
      });
      dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
      }, (err) => {
        console.log(err);
      }
    );
  }

  getElementoDialogoActaId(elementoId:String):Reunion{
    let retorno: Reunion = new Reunion();
    this.elementoService.getFiltroElementoIdActa(elementoId).subscribe(
      (response) => {
        return  response;
      }, (err) => {
        console.log(err);
      }
    );
    return retorno;
  }

  retornaReunionSeleccionada(){
    let retorno: Reunion = new Reunion();
    let reunion: Reunion = this.selectedMeeting;
    retorno.actaId = reunion.actaId;
    retorno.correlativo = reunion.correlativo;
    retorno.estado = reunion.estado;
    retorno.fecha = reunion.fecha;
    retorno.horaFin = reunion.horaFin;
    retorno.horaInicio = reunion.horaInicio;
    retorno.proyectoId = reunion.proyectoId;
    retorno.resumen = reunion.resumen;
    retorno.username = reunion.username;
    retorno.usuarioActa = reunion.usuarioActa;
    return retorno;
  }

  retornaTemaSeleccionada(tema: TemaActa){
    let retorno: TemaActa = new TemaActa();
    retorno.actaId = tema.actaId;
    retorno.discusion = tema.discusion;
    retorno.id = tema.id;
    retorno.nombre = tema.nombre;
    return retorno;
  }

}
