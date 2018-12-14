import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/session/service/session.service';
import { Router } from "@angular/router";
import { AuthService } from 'angular5-social-login';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(private sessionService: SessionService, private socialAuthService: AuthService, private router:Router) { }

  userName : String 

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    this.sessionService.getUserProfile().subscribe(
      (response: String) => {
        let nombre = `${response['nombre']}`.charAt(0).toUpperCase()
          +  `${response['nombre']}`.substring(1).toLowerCase();
        let apellido = `${response['apellido']}`.charAt(0).toUpperCase()
          +  `${response['apellido']}`.substring(1).toLowerCase();
        this.userName = nombre + " " + apellido;//`${response['nombre']} ${response['apellido']}`;
      }, (err) => {
        console.log(err);
      });
  }

  closeSession(){
    
    if (this.sessionService.getOrigenToken() == "GOOGLE"){
      this.socialAuthService.signOut();
      console.log(this.socialAuthService);
    }
    this.sessionService.logOut();
  }

  goHome(){
    this.router.navigate(['project-list']);
  }
}
