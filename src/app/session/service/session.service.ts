import { Injectable } from '@angular/core';
import { restPath } from "app/share/constants/restPath"
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {

  private token : string;

  constructor(private HttpClient: HttpClient, private restPath: restPath) {
    this.setToken(localStorage['token']);
  }


  logIn(user: string, pass: string):Observable<Object>{
    let param = { 'username': user, 'password': pass}
    return this.HttpClient.post(`${this.restPath.APP}/${this.restPath.logIn}`, param);
  }

  throwError(message: string){
    throw Observable.throw(message);
  }

  setToken(token: string):void{
    localStorage['token'] = token;
    this.token = localStorage['token'];
  }

  resetToken():void{
    delete localStorage['token'];
    this.token = undefined;
  }

  getToken():string{
    return this.token;
  }

  isAuthenticate():boolean{
    return this.getToken() != undefined;
  }



  // logIn(user:string, pass:string) : string{
  //   this.getToken().subscribe( (response) => {
  //     response['token'] ? this.token = response['token'] : this.throwError('We did not get a token');
      
  //   },(error) => {
  //     console.log("We messed up");
  //   });
  //   return this.token;
  // }
}
