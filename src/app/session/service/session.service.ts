import { Injectable } from '@angular/core';
import { restPath } from "app/share/constants/restPath"
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {

  private token : string;
  private username : String;

  constructor(private HttpClient: HttpClient, private restPath: restPath) {
    this.setToken(localStorage['token']);
  }


  logIn(user: string, pass: string):Observable<Object>{
    this.setUsername(user);
    let param = { 'username': user, 'password': pass}
    return this.HttpClient.post(`${this.restPath.APP}${this.restPath.logIn}`, param);
  }

  throwError(message: string){
    throw Observable.throw(message);
  }

  setToken(token: string):void{
    localStorage['token'] = token;
    this.token = localStorage['token'];
  }

  setUsername(user: string): void {
    localStorage['username'] = user;
    this.username = localStorage['username'];
  }

  resetToken():void{
    delete localStorage['token'];
    this.token = undefined;
  }

  getToken():string{
    return this.token;
  }

  getUserProfile(){
    return this.HttpClient.get(`${this.restPath.APP}${this.restPath.getUser}${this.username}`);
  }

  isAuthenticate():boolean{
    return this.getToken() != undefined;
  }
}
