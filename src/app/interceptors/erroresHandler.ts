import {ErrorHandler, Injectable} from "@angular/core";
import {UNAUTHORIZED, BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR} from "http-status-codes";
import {Router} from "@angular/router";
import {ToastsManager, Toast} from "ng2-toastr";

@Injectable()
export class erroresHandler implements ErrorHandler {

  static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = "An error occurred: Please click this message to refresh";
  static readonly DEFAULT_ERROR_TITLE: string = "Something went wrong";
  
  constructor(private router: Router,private toastManager: ToastsManager){};
               
  public handleError(error: any) {
    console.error(error);
    let httpErrorCode = error.httpErrorCode;
    switch (httpErrorCode) {
      case UNAUTHORIZED:
          this.router.navigateByUrl("/sign-on");
          break;
      case FORBIDDEN:
          this.router.navigateByUrl("/unauthorized");
          break;
      case BAD_REQUEST:
         this.showError(error.message);
          break;
      case INTERNAL_SERVER_ERROR:
        this.showError(error.message);
        break;
      default:
         this.showError(erroresHandler.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
    }
  }
  
  private showError(message:string){
    this.toastManager.error(message, erroresHandler.DEFAULT_ERROR_TITLE, { dismiss: 'controlled'}).then((toast:Toast)=>{
            let currentToastId:number = toast.id;
            this.toastManager.onClickToast().subscribe(clickedToast => {
                if (clickedToast.id === currentToastId) {
                    this.toastManager.dismissToast(toast);
                    window.location.reload();
                }
            });
        });
  }
}