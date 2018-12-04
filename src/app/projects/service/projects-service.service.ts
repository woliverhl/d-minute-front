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

  listarMinutaProyecto(projectId: String){
    return this.http.get(`${this.restPath.APP}${this.restPath.listarMinutaProyectoById}${projectId}`);
  }

}
