import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

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
}
