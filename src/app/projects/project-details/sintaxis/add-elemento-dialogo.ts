import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reunion } from "app/models/reunion";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { ActaService } from '../../service/acta-service.service';
import { ElementoDialogoService } from '../../service/elemento-service.service';
import { ElementoDialogo } from '../../../models/ElementoDialogo';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'add-elemento-dialgo',
    templateUrl: './add-elemento-dialgo.html',
    styleUrls: ['./add-elemento-dialgo.scss']
  })
  export class AddElementoDialogoComponent {

    addElementoForm: FormGroup;
    public saved: EventEmitter<any> = new EventEmitter();
    public listaEstado: Array<Estado> = new Array<Estado>();
    public codRol: string;
    
    desacuerdoSrc = '../../../assets/img/elementos/desacuerdo_unselected.png';
    dudaSrc = '../../../assets/img/elementos/duda_unselected.png';
    acuerdoSrc = '../../../assets/img/elementos/acuerdo_unselected.png';
    compromisoSrc = '../../../assets/img/elementos/compromiso_unselected.png';
    normaSrc = '../../../assets/img/elementos/norma_unselected.png';

    selectedImage: any;

    constructor(
        public dialogRef: MatDialogRef<AddElementoDialogoComponent>,
        private actaService: ActaService, private elementoService: ElementoDialogoService,
        private fb: FormBuilder, public elementoDialogo: ElementoDialogo, public Reunion: Reunion,
        @Inject(MAT_DIALOG_DATA) public data: Reunion) {
            this.Reunion = data;
            this.loadEstadoElemento();
            this.createElementForm();
            console.log(this.Reunion);
            if ((this.Reunion.temaActa[0].elementoDialogoDto != undefined) && (this.Reunion.temaActa[0].elementoDialogoDto.length > 0)){
              this.elementoDialogo = this.Reunion.temaActa[0].elementoDialogoDto[0];
            }
            else{
              var datePipe = new DatePipe("en-US");
              this.elementoDialogo.fechaCompromiso = datePipe.transform(Date.now(), 'yyyy-MM-dd');
              this.elementoDialogo.estado = "TODO";
            }
            console.log(this.elementoDialogo);
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
      console.log(this.codRol);
      this.elementoDialogo.codRol = this.codRol;
      this.elementoDialogo.temaId = this.Reunion.temaActa[0].id;
        this.elementoService.postElementoDialogo(this.elementoDialogo).subscribe((response) => {
            this.onNoClick();
            this.saved.emit(true);
            this.cleanUserForm(this.addElementoForm);
            console.log(response);
          }, (err) => {
            console.log(err);
          });
    }

    createElementForm() {
      this.addElementoForm = this.fb.group({
          selectedEstado: [ this.elementoDialogo.estado, Validators.required],
          fechaCompromiso: [ this.elementoDialogo.fechaCompromiso , Validators.required],
          descripcion: [this.elementoDialogo.descripcion, Validators.required],
          selectedMember: [this.elementoDialogo.username, Validators.required]
        });
      }

    changeImg(image: any, _codRol: string){
        this.codRol = _codRol;
        if(this.selectedImage !== undefined)
          this.selectedImage.src = this.selectedImage.src.replace('_selected', '_unselected');
        image.src = image.src.replace('_unselected', '_selected');
        this.selectedImage = image;
    }
  }
