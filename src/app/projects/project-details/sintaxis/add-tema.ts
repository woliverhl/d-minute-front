import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TemaActa } from '../../../models/tema';
import { TemaService } from '../../service/tema-service.service';
import { EILSEQ } from 'constants';

@Component({
    selector: 'add-tema',
    templateUrl: './add-tema.html',
    styleUrls: ['./add-tema.scss']
  })
  export class AddTemaComponent  {
    
    addTemaForm: FormGroup;
    public saved: EventEmitter<any> = new EventEmitter();
    textoBoton: String;
    
    constructor(
        public dialogRef: MatDialogRef<AddTemaComponent>, 
        private fb: FormBuilder, public temaActa: TemaActa,
        private temaService: TemaService, 
        @Inject(MAT_DIALOG_DATA) public data: TemaActa) {
            this.saved.emit(false);
            this.temaActa = data;
            this.createTemaForm();
            if (this.temaActa.id == 0){
                this.textoBoton = "CREAR NUEVO TEMA";
            }
            else{
                this.textoBoton = "MODIFICAR TEMA";
            }
        }

    postTema(){
        this.temaService.postTheme(this.temaActa).subscribe((response) => {
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