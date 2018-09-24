import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reunion } from "app/models/reunion";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TemaActa } from '../../../models/tema';
import { ProjectsService } from '../../service/projects-service.service';

@Component({
    selector: 'add-tema',
    templateUrl: './add-tema.html',
    styleUrls: ['./add-tema.scss']
  })
  export class AddTemaComponent  {
    
    addTemaForm: FormGroup;
    public saved: EventEmitter<any> = new EventEmitter();
    public reunion: Reunion
    
    constructor(
        public dialogRef: MatDialogRef<AddTemaComponent>, 
        private fb: FormBuilder, public temaActa: TemaActa,
        private projectService: ProjectsService,
        @Inject(MAT_DIALOG_DATA) public data: Reunion) {
            this.reunion = data;
            this.createTemaForm();
            if ((this.reunion.temaActa != undefined) && (this.reunion.temaActa.length>0)){
                this.temaActa = this.reunion.temaActa[0];
            }
        }

    postTema(){
        let postObject = Object.assign({ actaId: this.reunion.actaId}, this.temaActa);
          this.projectService.postTheme(postObject).subscribe((response) => {
            this.cleanUserForm(this.addTemaForm);
            this.onNoClick();
            this.saved.emit(true);
            console.log(response);
          }, (err) => {
            console.log(err);
          });
    }

    cleanUserForm(formulario: FormGroup) {
        if(formulario.valid){
            formulario.reset();
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createTemaForm() {
        this.addTemaForm = this.fb.group({
          nombre: [this.temaActa.nombre, Validators.required],
          discusion: [this.temaActa.discusion, Validators.required]
        });
      }
  }