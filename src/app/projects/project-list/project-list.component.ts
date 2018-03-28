import { Component, OnInit, Inject } from '@angular/core';
import { ProjectsService } from "app/projects/service/projects-service.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from "app/user/service/users.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  public listArray:Object; 

  constructor(private projectsService: ProjectsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.projectsService.listProyects().subscribe(
      (response) => {
        this.listArray =  response;
      },(err)=>{
        console.log(err);
      });
  }

  openProyectDialog(): void{
    let dialogRef = this.dialog.open(AddProjectDialog, {
      width: '80%',
      height: '60%',
      data: {}
    });
  }

}


@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.html',
  styleUrls: ['./project-list.component.scss']
})
export class AddProjectDialog {

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialog>, private UsersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  postProject(){
    this.UsersService
  }

}
