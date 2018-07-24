import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/session/service/session.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(private sessionService: SessionService, private router:Router) { }

  userName : String 

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    this.sessionService.getUserProfile().subscribe(
      (response: String) => {
        this.userName = `${response['nombre']} ${response['apellido']}`;
      }, (err) => {
        console.log(err);
      });
  }

  closeSession(){
    this.sessionService.logOut();
  }

  goHome(){
    this.router.navigate(['project-list']);
  }

}
