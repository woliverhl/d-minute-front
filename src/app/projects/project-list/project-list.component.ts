import { Component, OnInit, Inject, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProjectsService } from "app/projects/service/projects-service.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { UsersService } from "app/user/service/users.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Project } from "app/models/project";
import { AddUserComponent } from 'app/user/create-user/add-user';
import { AddProjectDialog } from 'app/projects/project-list/add-project-dialog';
import { DelProjectDialog } from 'app/projects/project-list/del-project-dialog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'inicio', 'fin', 'acciones'];
  listaProyectos:MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private projectsService: ProjectsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.listAllProjects();
  }

  public listAllProjects(){
    this.projectsService.listProjects().subscribe(
      (response) => {
        this.listaProyectos = new MatTableDataSource<Project>(response);
        this.listaProyectos.paginator = this.paginator;
        if (this.listaProyectos.paginator) {
          this.listaProyectos.paginator.firstPage();
        }
      }, (err) => {
        console.log(err);
      });
  }

  openProyectDialog(): void{
    let dialogRef = this.dialog.open(AddProjectDialog, {
      width: '744px',
      data: "0"
    });

    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  openUserDialog(): void{
    let dialogRef = this.dialog.open(AddUserComponent, {
      width: '744px',
      data: {}
    });

    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  reloadList(isPosted:boolean):void{
    isPosted ? this.listAllProjects(): undefined;
  }

  deleteProyectDialog(proyectoid: String): void{
    let dialogRef = this.dialog.open(DelProjectDialog, {
      width: '744px',
      data: proyectoid
    });

    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }

  editProyectDialog(proyectoid: String): void{
    let dialogRef = this.dialog.open(AddProjectDialog, {
      width: '744px',
      data: proyectoid
    });

    dialogRef.componentInstance.saved.subscribe(this.reloadList.bind(this));
  }
}