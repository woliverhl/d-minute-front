import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'app/projects/service/projects-service.service';
import { Route, ParamMap, ActivatedRoute  } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Project } from "app/models/project";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;

  constructor(private projectService: ProjectsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>
        this.projectService.getProjectById(params.get('id'))).subscribe(
        (response: Project) => {
          console.log(response);
          this.project = response;
        },(err)=>{

        })
    
  }

}
