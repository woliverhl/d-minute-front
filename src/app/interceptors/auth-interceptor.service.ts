import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler , HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { SessionService } from "app/session/service/session.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { HttpResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { SpinnerService } from '../share/spinner/spinner.service';
import { MsgErrorDialog } from './msg-error-dialog';
import { MatDialog } from '@angular/material';
//import { erroresHandler } from './erroresHandler';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: SessionService, private route: Router, private spinner: SpinnerService, private dialog: MatDialog) {

  }

  goodByeDude():void{
    this.auth.resetToken();
    this.auth.resetOrigenToken();
    this.route.navigate(['/sign-on'])
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    if (!request.url.match('/token/generate-token') && !request.url.match('/token/userOauth') && request['responseType'] === 'json'){
      this.auth.getToken() === undefined || this.auth.getToken() === "undefined"  ? this.goodByeDude() : undefined;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`,
          Origen: `${this.auth.getOrigenToken()}`
        }
    });
    }

    if (request instanceof HttpRequest && request['responseType'] === 'json') {
      this.spinner.show();
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      //Everything is cool
      if(event instanceof HttpResponse){
        this.spinner.hide();
      }
    }, (err: any) => {
      this.spinner.hide();
      if(err['status'] === 401){
          console.log('You are banished from the app');
          this.goodByeDude();
          return;
      }
      if (err instanceof HttpErrorResponse) {
        console.log('Error de la aplicación: ' + err.message);
        let dialogRef = this.dialog.open(MsgErrorDialog, {
          width: '544px',
          data: err
        });
      }
    })
  }

}
