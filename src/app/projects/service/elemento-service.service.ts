import { Injectable } from '@angular/core';
import { SessionService } from "../../session/service/session.service";
import { HttpClient } from "@angular/common/http";
import { restPath } from "../../share/constants/restPath";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class ElementoDialogoService {

  private httpOptions;
  private route: ActivatedRoute;

  constructor(private sessionService: SessionService, private http: HttpClient,private restPath:restPath) {}

  getEstadoElemento(){
    return this.http.get(`${this.restPath.APP}${this.restPath.listEstadoElemento}`);
  }

  getFiltroElementoIdActa(elementoId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.listActaIdelemento}${elementoId}`);
  }

  postElementoDialogo(payload: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.addElementoDialogo}`, payload);
  }

  postActualizaEstadoKanban(payload: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.addEstadoElementoKanban}`, payload);
  }

}
