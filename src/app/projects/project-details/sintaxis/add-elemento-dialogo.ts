import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reunion } from "app/models/reunion";

@Component({
    selector: 'add-elemento-dialgo',
    templateUrl: './add-elemento-dialgo.html',
    styleUrls: ['./add-elemento-dialgo.scss']
  })
  export class AddElementoDialogoComponent {
    
    desacuerdoSrc = '../../../assets/img/elementos/desacuerdo_unselected.png';
    dudaSrc = '../../../assets/img/elementos/duda_unselected.png';
    acuerdoSrc = '../../../assets/img/elementos/acuerdo_unselected.png';
    compromisoSrc = '../../../assets/img/elementos/compromiso_unselected.png';
    normaSrc = '../../../assets/img/elementos/norma_unselected.png';


    constructor(
        public dialogRef: MatDialogRef<AddElementoDialogoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Reunion) {}
    
    onCancelarClick(): void{
        this.dialogRef.close();
    }

    changeImg(image: any){
        this.resetLogos()
        image.src = image.src.replace('_unselected', '_selected')
    }

    resetLogos(){
        this.desacuerdoSrc = this.desacuerdoSrc.replace('_selected', '_unselected')
        this.dudaSrc = this.dudaSrc.replace('_selected', '_unselected')
        this.acuerdoSrc = this.acuerdoSrc.replace('_selected', '_unselected')
        this.compromisoSrc = this.compromisoSrc.replace('_selected', '_unselected')
        this.normaSrc = this.normaSrc.replace('_selected', '_unselected')
    }
  }
