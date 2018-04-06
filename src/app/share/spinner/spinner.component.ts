import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpinnerService } from "app/share/spinner/spinner.service";
import { LoaderState } from './LoaderState';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  public show:boolean;
  private subscription: Subscription;

  constructor(private loaderService: SpinnerService) {
    this.show = false;
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) =>{
      this.show = state.show;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
