import { Injectable } from '@angular/core';
import { SpinnerComponent } from "app/share/spinner/spinner.component";
import { LoaderState } from "app/share/spinner/LoaderState";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpinnerService {
  
  private loaderSubject = new Subject<LoaderState>();
  public loaderState = this.loaderSubject.asObservable();

  constructor() {

  }

  show(){
    this.loaderSubject.next(<LoaderState>{show:true});
  }

  hide(){
    this.loaderSubject.next(<LoaderState>{show:false});
  }

}
