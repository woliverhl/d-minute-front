import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpinnerService } from "app/share/spinner/spinner.service";
import { LoaderState } from './LoaderState';
import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements AfterContentChecked {

  public show:boolean;
  private subscription: Subscription;

  constructor(private loaderService: SpinnerService, private overlay: Overlay) {
    this.show = false;
  }

  openSpinner():void{
    const overlayRef = this.overlay.create({
      height: '100%',
      width: '100%',
    });
    const userProfilePortal = new ComponentPortal(SpinnerComponent);
    overlayRef.attach(userProfilePortal);
  }

  ngAfterContentChecked() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) =>{
      if (state['show'] != undefined &&  this.show !== state['show']){
        this.show = state.show;
        setTimeout(() => {
          this.openSpinner();
        },0);
        
      } 
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
