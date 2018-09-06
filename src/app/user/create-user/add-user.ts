import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from "app/models/usuario";
import { UsersService } from '../service/users.service';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.html',
    styleUrls: ['./add-user.scss']
})
export class AddUserComponent implements OnInit {

    public addUserForm: FormGroup;
    public saved: EventEmitter<any> = new EventEmitter();

    constructor(
        public dialogRef: MatDialogRef<AddUserComponent>, private UsersService: UsersService,
        private fb: FormBuilder, public Usuario: Usuario,
        @Inject(MAT_DIALOG_DATA) public data: any, ) {
        this.createUserForm();
        this.ngOnInit();
    }

    ngOnInit(): void {
        this.cleanUserForm(this.addUserForm);
    }

    createUserForm() {
        this.addUserForm = this.fb.group({
            nombre: [this.Usuario.nombre, Validators.required],
            apellido: [this.Usuario.apellido, Validators.required],
            username: [this.Usuario.username, Validators.required],
            password: [this.Usuario.password, Validators.required]
        });
    }

    cleanUserForm(formulario: FormGroup) {
        if(formulario.valid){
            formulario.reset();
        }
    }

    onNoClick(): void {
        this.cleanUserForm(this.addUserForm);
        this.dialogRef.close();
      }

      postUser(){
        if(this.addUserForm.valid){
          let postObject = Object.assign({}, this.Usuario);
          
          this.UsersService.postUser(this.Usuario).subscribe((response) => {
            this.onNoClick();
            this.saved.emit(true);
            console.log(response);
            this.cleanUserForm(this.addUserForm);
          }, (err) => {
            console.log(err);
          });
        }
        
      }

}