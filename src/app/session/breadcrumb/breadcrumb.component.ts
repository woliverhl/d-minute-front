import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private router:Router) { }

  private static readonly SEPARATOR : string = '/';
  @Input() steps: Array<string>;
  @Input() here: string;
  public trail: string;
  
  ngOnInit() { }

  public getTrail(){
    let trail: string = '';
    this.steps.forEach(element => {
      trail += element + ' ' + BreadcrumbComponent.SEPARATOR;
    });
    return trail;
  }

  goHome(){
    this.router.navigate(['project-list']);
  }
  
}
