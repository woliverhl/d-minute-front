import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reunion } from "app/models/reunion";
import { Project } from '../../../models/project';
import { ProjectsService } from '../../service/projects-service.service';
import { UsersService } from '../../../user/service/users.service';
import { ActaService } from '../../service/acta-service.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'add-meeting',
    templateUrl: './add-meeting.html',
    styleUrls: ['./add-meeting.scss']
  })
  export class AddMeetingComponent implements OnInit {

    addMeetingForm: FormGroup;
    public selectedMember: Object;
    public listOfUsers: any;
    Project: Project;
    public saved: EventEmitter<any> = new EventEmitter();
    textoBoton: String;
    
    constructor(
        public dialogRef: MatDialogRef<AddMeetingComponent>,
        private projectService: ProjectsService, private userService: UsersService,
        private actaService: ActaService, 
        private fb: FormBuilder, public Reunion: Reunion,
        @Inject(MAT_DIALOG_DATA) public data: Project) {
          this.Project = data; 
          this.saved.emit(false);
          this.createMeetingForm();
          this.Reunion.usuarioActa = [];          
            if (this.data.meet != undefined){
              this.textoBoton = "MODIFICAR ACTA";
              this.Reunion = this.data.meet;
            }else{
              this.textoBoton = "CREAR NUEVA ACTA";
              var datePipe = new DatePipe("en-US");
              this.Reunion.fecha = datePipe.transform(Date.now(), 'yyyy-MM-dd');
            }
        }

    createMeetingForm() {
        this.addMeetingForm = this.fb.group({
          fecha: [this.Reunion.fecha, Validators.required],
          objetivo: [this.Reunion.resumen, Validators.required],
          horaInicio: [this.Reunion.horaInicio, Validators.required],
          usuarioActa: [this.Reunion.usuarioActa, ],
          horaFin: [this.Reunion.horaFin, ],
          selectedSecretario: [this.Reunion.username, Validators.required],
          selectedMember: [this.selectedMember]
        });
      }

    ngOnInit() {
        setTimeout(() => {
          this.projectService.getProjectById(this.Project.proyectoId.toString()).subscribe(
            (response: Project) => {
              this.Project = response;
              if ((this.Reunion.usuarioActa != undefined) && (this.Reunion.usuarioActa != [])){
                if (this.Project.usuariosNuevoProyecto.length == this.Reunion.usuarioActa.length){
                  this.Project.usuariosNuevoProyecto = [];
                }
                if ((this.Project.usuariosNuevoProyecto.length > this.Reunion.usuarioActa.length) && (this.Reunion.usuarioActa.length > 0)){
                   let usuariosNuevoProyecto: Array<Object> = new Array<Object>();
                   for (let indexi = 0; indexi < this.Project.usuariosNuevoProyecto.length; indexi++) {
                     let val = 1;
                      for (let indexj = 0; indexj < this.Reunion.usuarioActa.length; indexj++) {
                        if (this.Project.usuariosNuevoProyecto[indexi]["username"] == this.Reunion.usuarioActa[indexj]["username"]){
                          val = 0;
                          break;
                        }
                      }
                      if (val == 1){
                        usuariosNuevoProyecto.push(this.Project.usuariosNuevoProyecto[indexi]);
                      }
                   }
                   this.Project.usuariosNuevoProyecto = usuariosNuevoProyecto;
                }
              }
            },(err)=>{
              console.log(err);
            });
        }, 0);
    }

    postMeeting(){
        if(this.addMeetingForm.valid){
          this.Reunion.usuarioActa = this.Reunion.usuarioActa.map((cv, i) => {
            return {username: cv['username'], asiste: "S", secretario: "N"};
          });
          if (this.Project.meet != undefined){
            this.Reunion.actaId = this.Project.meet.actaId;
            this.Reunion.correlativo = this.Project.meet.correlativo;
          }
          let postObject = Object.assign({ proyectoId: this.Project.proyectoId}, this.Reunion);
          this.actaService.postReunion(postObject).subscribe((response) => {
            this.onNoClick();
            this.saved.emit(true);
            console.log(response);
            this.cleanUserForm(this.addMeetingForm);
          }, (err) => {
            console.log(err);
          });
        }
      }

      addMember():void{
        if (this.selectedMember != undefined && !this.Reunion.usuarioActa.includes(this.selectedMember)){
          this.Reunion.usuarioActa.push(this.selectedMember);
          let index = this.Project.usuariosNuevoProyecto.indexOf(this.selectedMember);
          this.Project.usuariosNuevoProyecto.splice(index, 1) 
          this.selectedMember = undefined;
        }
      }

      deleteMember(miembro: Object): void{
        let index = this.Reunion.usuarioActa.indexOf(miembro);
        index > -1 ? this.Reunion.usuarioActa.splice(index, 1) : console.log('Member Not Found');
        this.Project.usuariosNuevoProyecto.push(miembro);
      }

      onNoClick(): void {
        this.dialogRef.close();
      }

      cleanUserForm(formulario: FormGroup) {
        if(formulario.valid){
            formulario.reset();
        }
    }
  }