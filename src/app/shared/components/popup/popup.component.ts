import { Component } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent {

  popUpDataSub: Subscription;
  mainMessage: string = 'Error';
  subMessage: string = 'Somthing went wrong';
  constructor(public sharedService: SharedService) { }

  ngOnInit() {
    this.getPopUpData();
  }

  getPopUpData() {
    this.popUpDataSub = this.sharedService.popUpData$.subscribe((value) => {
      if (Object.keys(value).length != 0) {
        if (value.mainMessage) {
          this.mainMessage = value.mainMessage;
        }
        if (value.subMessage) {
          this.subMessage = value.subMessage;
        }
        this.sharedService.showPopup = true;
      }
    })
  }

  closePopUp() {
    this.sharedService.showPopup = false;
  }

  ngOnDestroy() {
    if (this.popUpDataSub) {
      this.popUpDataSub.unsubscribe();
    }
  }
}
