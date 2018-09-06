import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reunion } from "app/models/reunion";

@Component({
    selector: 'add-meeting',
    templateUrl: './add-meeting.html',
    styleUrls: ['./add-meeting.scss']
  })
  export class AddTemaComponent {
    
    constructor(
        public dialogRef: MatDialogRef<AddTemaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Reunion) {}
    
    onCancelarClick(): void{
        this.dialogRef.close();
    }
  }