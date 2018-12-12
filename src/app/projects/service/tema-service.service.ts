import { Injectable } from '@angular/core';
import { SessionService } from "../../session/service/session.service";
import { HttpClient } from "@angular/common/http";
import { restPath } from "../../share/constants/restPath";
import { ActivatedRoute } from "@angular/router";


@Injectable()
export class TemaService {

  private httpOptions;
  private route: ActivatedRoute;

  constructor(private sessionService: SessionService, private http: HttpClient,private restPath:restPath) {}

  postTheme(tema: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.guardarTema}`,tema);
  }

  postDelTheme(tema: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.delTema}`,tema);
  }

  listThemes(actaId:any){
    return this.http.get(`${this.restPath.APP}${this.restPath.listarTema}${actaId}`);
  }

}
