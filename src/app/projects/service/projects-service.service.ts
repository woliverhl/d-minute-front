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
export class ProjectsService {

  private httpOptions;
  private route: ActivatedRoute;

  constructor(private sessionService: SessionService, private http: HttpClient,private restPath:restPath) {}

  listProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.restPath.APP}${this.restPath.listProyects}`);
  }

  addProject(project: Project){
    return this.http.post(`${this.restPath.APP}${this.restPath.addProyect}`,project);
  }

  editProject(project: Project){
    return this.http.post(`${this.restPath.APP}${this.restPath.editProyect}`,project);
  }

  getProjectById(projectId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.projectById}${projectId}`);
  }

  delProjectById(projectId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.delProjectById}${projectId}`);
  }

  postReunion(payload: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.addActa}`, payload);
  }

  postDelReunion(payload: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.delActa}`, payload);
  }

  listReunion(projectId: Number){
    return this.http.get(`${this.restPath.APP}${this.restPath.listarReuniones}${projectId}`);
  }

  getAttendantList(actaId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.getAttendantList}${actaId}`);
  }

  getReunionById(actaId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.getMeetingById}${actaId}`);
  }

  postTheme(tema: TemaActa){
    return this.http.post(`${this.restPath.APP}${this.restPath.guardarTema}`,tema);
  }

  postDelTheme(tema: TemaActa){
    return this.http.post(`${this.restPath.APP}${this.restPath.delTema}`,tema);
  }

  listThemes(actaId:any){
    return this.http.get(`${this.restPath.APP}${this.restPath.listarTema}${actaId}`);
  }

  listarMinutaProyecto(projectId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.listarMinutaProyectoById}${projectId}`);
  }

}
