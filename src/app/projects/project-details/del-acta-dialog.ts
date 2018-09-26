import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Reunion } from "app/models/reunion";
import { ActaService } from '../service/acta-service.service';

@Component({
    selector: 'del-acta-dialog',
    templateUrl: './del-acta-dialog.html',
    styleUrls: ['./del-acta-dialog.scss']
  })
  export class delMeetingComponent {

    delActaForm: FormGroup;
    public saved: EventEmitter<any> = new EventEmitter();
    
    constructor(
        public dialogRef: MatDialogRef<delMeetingComponent>,
        private actaService: ActaService, 
        private fb: FormBuilder, public Reunion: Reunion,
        @Inject(MAT_DIALOG_DATA) public data: Reunion) {
          this.Reunion = data; 
          this.createMeetingForm();
        }

    createMeetingForm() {
        this.delActaForm = this.fb.group({
          fecha: [this.Reunion.fecha, ],
          name: [this.Reunion.resumen, ]
        });
      }

    delReunion() {
      this.actaService.postDelReunion(this.Reunion).subscribe(
        (response) => {
          this.onNoClick();
          this.saved.emit(true);
          this.cleanUserForm(this.delActaForm);
      }, (err) => {
        console.log(err);
      });
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