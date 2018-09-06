import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reunion } from "app/models/reunion";
import { Project } from '../../../models/project';
import { ProjectsService } from '../../service/projects-service.service';
import { UsersService } from '../../../user/service/users.service';

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
    
    constructor(
        public dialogRef: MatDialogRef<AddMeetingComponent>,
        private projectService: ProjectsService, private userService: UsersService,
        private fb: FormBuilder, public Reunion: Reunion,
        @Inject(MAT_DIALOG_DATA) public data: Project) {
            this.Project = data; 
            this.createMeetingForm();
            this.listaUserProyecto();
            this.Reunion.usuarioActa = [];
        }

    createMeetingForm() {
        this.addMeetingForm = this.fb.group({
          fecha: [this.Reunion.fecha, Validators.required],
          objetivo: [this.Reunion.resumen, Validators.required],
          usuarioActa: [this.Reunion.usuarioActa, Validators.required],
          horaInicio: [this.Reunion.horaInicio, Validators.required],
          horaFin: [this.Reunion.horaFin, Validators.required],
          selectedMember: [this.selectedMember]
        });
      }

    ngOnInit() {
        setTimeout(() => {
          this.userService.getListUsers().subscribe(
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

    postMeeting(){
        if(this.addMeetingForm.valid){
          let postObject = Object.assign({ proyectoId: this.Project.proyectoId}, this.Reunion);
          this.projectService.postReunion(postObject).subscribe((response) => {
            this.onNoClick();
            this.saved.emit(true);
            console.log(response);
            this.cleanUserForm(this.addMeetingForm);
          }, (err) => {
            console.log(err);
          });
        }
      }

    listaUserProyecto(){
        this.projectService.getProjectById(this.Project.proyectoId.toString()).subscribe(
            (response: Project) => {
              this.Project = response;
            },(err)=>{
              console.log(err);
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
        this.cleanUserForm(this.addMeetingForm);
        this.dialogRef.close();
      }
    
      deleteMember(miembro: Object): void{
        let index = this.Project.usuariosNuevoProyecto.indexOf(miembro);
        index > -1 ? this.Project.usuariosNuevoProyecto.splice(index, 1) : console.log('Member Not Found');
      }

      cleanUserForm(formulario: FormGroup) {
        if(formulario.valid){
            formulario.reset();
        }
    }
  }