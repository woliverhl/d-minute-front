import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reunion } from "app/models/reunion";

@Component({
    selector: 'add-elemento-dialgo',
    templateUrl: './add-elemento-dialgo.html',
    styleUrls: ['./add-elemento-dialgo.scss']
  })
  export class AddElementoDialogoComponent {
    
    constructor(
        public dialogRef: MatDialogRef<AddElementoDialogoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Reunion) {}
    
    onCancelarClick(): void{
        this.dialogRef.close();
    }
  }