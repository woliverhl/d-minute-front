import { Injectable } from '@angular/core';
import { SessionService } from "../../session/service/session.service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { restPath } from "../../share/constants/restPath";
import { Project } from "../../models/project";
import { Reunion } from "../../models/reunion";
import { ParamMap, ActivatedRoute } from "@angular/router";
import { TemaActa } from '../../models/tema';


@Injectable()
export class TemaService {

  private httpOptions;
  private route: ActivatedRoute;

  constructor(private sessionService: SessionService, private http: HttpClient,private restPath:restPath) {}

  postTheme(tema: TemaActa){
    return this.http.post(`${this.restPath.APP}${this.restPath.guardarTema}`,tema);
  }

  postDelTheme(tema: TemaActa){
    return this.http.post(`${this.restPath.APP}${this.restPath.delTema}`,tema);
  }

  listThemes(actaId:any){
    return this.http.get(`${this.restPath.APP}${this.restPath.listarTema}${actaId}`);
  }

}
