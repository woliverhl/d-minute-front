import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TemaActa } from '../../models/tema';
import { TemaService } from '../service/tema-service.service';

@Component({
    selector: 'del-tema-dialog',
    templateUrl: './del-tema-dialog.html',
    styleUrls: ['./del-tema-dialog.scss']
  })
  export class delTemaComponent {

    delTemaForm: FormGroup;
    public saved: EventEmitter<any> = new EventEmitter();
    
    constructor(
        public dialogRef: MatDialogRef<delTemaComponent>,
        private fb: FormBuilder, public temaActa: TemaActa,
        private temaService: TemaService, 
        @Inject(MAT_DIALOG_DATA) public data: TemaActa) {
            this.temaActa = data;
            this.saved.emit(false);
            this.createTemaForm();
        }

        createTemaForm() {
          this.delTemaForm = this.fb.group({
            name: [this.temaActa.nombre]
          });
        }

    delTema() {
      this.temaService.postDelTheme(this.temaActa).subscribe(
        (response) => {
          this.onNoClick();
          this.saved.emit(true);
          this.cleanUserForm(this.delTemaForm);
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