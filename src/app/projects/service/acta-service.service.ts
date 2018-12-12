import { Injectable } from '@angular/core';
import { SessionService } from "../../session/service/session.service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { restPath } from "../../share/constants/restPath";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class ActaService {

  private httpOptions;
  private route: ActivatedRoute;

  constructor(private sessionService: SessionService, private http: HttpClient,private restPath:restPath) {}

  postReunion(payload: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.addActa}`, payload);
  }

  postDelReunion(payload: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.delActa}`, payload);
  }

  listReunion(projectId: Number){
    return this.http.get(`${this.restPath.APP}${this.restPath.listarReuniones}${projectId}`);
  }

  getReunionById(actaId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.getMeetingById}${actaId}`);
  }

  listarMinutaProyecto(projectId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.listarMinutaProyectoById}${projectId}`);
  }

}
