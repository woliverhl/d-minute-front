import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reunion } from "app/models/reunion";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { ActaService } from '../../service/acta-service.service';
import { ElementoDialogoService } from '../../service/elemento-service.service';
import { ElementoDialogo } from '../../../models/ElementoDialogo';

@Component({
    selector: 'add-elemento-dialgo',
    templateUrl: './add-elemento-dialgo.html',
    styleUrls: ['./add-elemento-dialgo.scss']
  })
  export class AddElementoDialogoComponent {

    addElementoForm: FormGroup;
    public selectedMember: Object;
    public saved: EventEmitter<any> = new EventEmitter();
    public listaEstado: Array<Estado> = new Array<Estado>();
    
    desacuerdoSrc = '../../../assets/img/elementos/desacuerdo_unselected.png';
    dudaSrc = '../../../assets/img/elementos/duda_unselected.png';
    acuerdoSrc = '../../../assets/img/elementos/acuerdo_unselected.png';
    compromisoSrc = '../../../assets/img/elementos/compromiso_unselected.png';
    normaSrc = '../../../assets/img/elementos/norma_unselected.png';


    constructor(
        public dialogRef: MatDialogRef<AddElementoDialogoComponent>,
        private actaService: ActaService, private elementoService: ElementoDialogoService,
        private fb: FormBuilder, public elementoDialogo: ElementoDialogo, public Reunion: Reunion,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            
            this.loadEstadoElemento();
            this.createMeetingForm();
        }

    loadEstadoElemento() {
        setTimeout(() => {
          this.elementoService.getEstadoElemento().subscribe(
            (response:Array<Estado>) => {
              this.listaEstado = response;
            },
            (err) => {
              console.log(err)
            }
          );
        }, 0);
      }

      onNoClick(): void {
        this.dialogRef.close();
      }

      cleanUserForm(formulario: FormGroup) {
        if(formulario.valid){
            formulario.reset();
        }
    }

    postElementoDialogo(){

    }

    createMeetingForm() {
        this.addElementoForm = this.fb.group({
          selectedEstado: [this.elementoDialogo.estado, Validators.required],
          fechaCompromiso: [this.elementoDialogo.fechaCompromiso, Validators.required],
          descripcion: [this.elementoDialogo.descripcion, Validators.required],
          selectedMember: [this.selectedMember, Validators.required]
        });
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
