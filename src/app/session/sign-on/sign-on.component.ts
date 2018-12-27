import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/session/service/session.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from "app/models/user";
import { Router } from "@angular/router";
import { GoogleLoginProvider, AuthService } from 'angular5-social-login';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss']
})
export class SignOnComponent implements OnInit {


  public loginForm : FormGroup;
  private token:  string;


  constructor(private SessionService: SessionService, private socialAuthService: AuthService, public User: User, private fb: FormBuilder, private route: Router) { 
    if (this.SessionService.getOrigenToken() == "GOOGLE"){
      this.socialAuthService.signOut();
    }
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      userName: [this.User.userName, Validators.required ],
      userPass: [this.User.userPass, Validators.required]
    });
  }

  ngOnInit() {
  }

  logIn(){
    this.SessionService.logIn(this.User.userName, this.User.userPass).subscribe( 
      (response) => {
      response['token'] ? this.token = response['token'] : this.SessionService.throwError('We did not get a token');
      if (this.token != undefined) {
        this.SessionService.setOrigenToken("DMINUTE");
        this.SessionService.setToken(this.token);
        this.route.navigate(['project-list'])
        this.cleanUserForm(this.loginForm);
      }
    },(err) => {
      console.log(err);
    });
  }

  onSubmit(){
    this.logIn();
  }

  cleanUserForm(formulario: FormGroup) {
    if(formulario.valid){
        formulario.reset();
    }
}

public socialSignIn(socialPlatform : string) {
  let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      this.SessionService.logInOauth(userData.email,userData.token).subscribe( 
        (response) => {
        response['token'] ? this.token = response['token'] : this.SessionService.throwError('We did not get a token');
        if (this.token != undefined) {
          this.SessionService.setOrigenToken("GOOGLE");
          this.SessionService.setToken(this.token);
          this.route.navigate(['project-list'])
          this.cleanUserForm(this.loginForm);
        }
      },(err) => {
        console.log(err);
      });
    }
  );
}

}
