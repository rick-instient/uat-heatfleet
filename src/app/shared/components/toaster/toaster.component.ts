import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
})
export class ToasterComponent {
  @Input() message: any;
  @Input() showToaster: any;

  // message: string = '';
  showToast: boolean = false;

  constructor(private toastService: ToastService) {
    this.toastService.toastMessage$.subscribe((message) => {
      this.message = message;
      this.showToast = !!message;

      if (message) {
        setTimeout(() => {
          this.hideToast();
        }, 3000); // Hide the toast after 3 seconds
      }
    });
  }

  hideToast() {
    this.toastService.hideToast();
  }

}
