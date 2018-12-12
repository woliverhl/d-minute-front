import { Injectable } from '@angular/core';
import { SessionService } from "../../session/service/session.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { restPath } from "../../share/constants/restPath";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class ProjectsService {

  private httpOptions;
  private route: ActivatedRoute;

  constructor(private sessionService: SessionService, private http: HttpClient,private restPath:restPath) {}

  listProjects(): Observable<Object[]>{
    return this.http.get<Object[]>(`${this.restPath.APP}${this.restPath.listProyects}`);
  }

  addProject(project: Object){
    return this.http.post(`${this.restPath.APP}${this.restPath.addProyect}`,project);
  }

  editProject(project: Object){
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
