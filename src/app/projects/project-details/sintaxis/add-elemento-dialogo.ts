import { Component, Inject, EventEmitter, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
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
  export class AddElementoDialogoComponent implements AfterViewInit {

    addElementoForm: FormGroup;
    public saved: EventEmitter<any> = new EventEmitter();
    public listaEstado: Array<Estado> = new Array<Estado>();
    public codRol: string;
    textoBoton: String;
    textform: String;

    @ViewChild('desacuerdo') desacuerdo: ElementRef;
    @ViewChild('duda') duda: ElementRef;
    @ViewChild('acuerdo') acuerdo: ElementRef;
    @ViewChild('compromiso') compromiso: ElementRef;
    @ViewChild('norma') norma: ElementRef;
    
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
        
      this.saved.emit(false);
      this.Reunion = data;
      this.loadReunion();
      this.loadEstadoElemento();
      this.createElementForm();
      console.log("[constructor] reunion: "+ this.Reunion);
      if ((this.Reunion.temaActa[0].elementoDialogoDto != undefined) && (this.Reunion.temaActa[0].elementoDialogoDto.length > 0)){
        this.elementoDialogo = this.Reunion.temaActa[0].elementoDialogoDto[0];
        this.loadImg(this.elementoDialogo.codRol);
        this.textoBoton = "MODIFICAR ELEMENTO";
        this.textform = "MODIFICAR ELEMENTO DE DIALOGO";
      }
      else{
        this.textform = "CREAR ELEMENTO DE DIALOGO";
        this.textoBoton = "CREAR ELEMENTO";
        var datePipe = new DatePipe("en-US");
        this.elementoDialogo.fechaCompromiso = datePipe.transform(Date.now(), 'yyyy-MM-dd');
        this.elementoDialogo.estado = "TODO";
        this.elementoDialogo.temaId = this.Reunion.temaActa[0].id;
        console.log("[constructor] elemento: " + this.elementoDialogo.temaId);
      }
    }

    ngAfterViewInit() {
      this.loadImg(this.elementoDialogo.codRol);
    }
    
    loadEstadoElemento() {
      this.elementoService.getEstadoElemento().subscribe(
        (response:Array<Estado>) => {
          this.listaEstado = response;
        },
        (err) => {
          console.log(err)
        }
      );
    }

    loadReunion() {
      this.actaService.getReunionById(this.Reunion.actaId.toString()).subscribe(
        (response: Reunion) => {
          this.Reunion = response;
        },
        (err) => {
          console.log(err)
        }
      );
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
      this.elementoDialogo.codRol = this.codRol;
        this.elementoService.postElementoDialogo(this.elementoDialogo).subscribe((response) => {
            this.onNoClick();
            this.saved.emit(true);
            this.cleanUserForm(this.addElementoForm);
          }, (err) => {
            console.log(err);
          });
    }

    createElementForm() {
      this.addElementoForm = this.fb.group({
          selectedEstado: [ this.elementoDialogo.estado, Validators.required],
          descripcion: [ this.elementoDialogo.descripcion, ],
          fechaCompromiso: [ this.elementoDialogo.fechaCompromiso , Validators.required],
          titulo: [this.elementoDialogo.titulo, Validators.required],
          selectedMember: [this.elementoDialogo.username, Validators.required]
        });
      }

    changeImg(image: any, _codRol: string){
        console.log('[changeImg] _codRol: '+_codRol);
        this.codRol = _codRol;
        if(this.selectedImage !== undefined)
          this.selectedImage.src = this.selectedImage.src.replace('_selected', '_unselected');
        image.src = image.src.replace('_unselected', '_selected');
        this.selectedImage = image;
    }

    loadImg(_codRol: string){
      console.log('[loadImg] _codRol: '+_codRol);
      let image: ElementRef;
      switch(_codRol){
        case 'DE':
          image = this.desacuerdo;
        break;
        case 'DU':
          image = this.duda;
        break;
        case 'AC':
          image = this.acuerdo;
        break;
        case 'CO':
          image = this.compromiso;
        break;
        case 'NO':
          image = this.norma;
        break;
      }
      console.log('[loadImg] image: '+image);
      if (image != undefined)
            this.changeImg(image.nativeElement, _codRol);
    }
  }
