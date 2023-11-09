import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastMessageSource = new Subject<string>();
  toastMessage$ = this.toastMessageSource.asObservable();

  showToast(message: string) {
    this.toastMessageSource.next(message);

    setTimeout(() => {
      this.hideToast();
    }, 3000); // Hide the toast after 3 seconds (adjust as needed)
  }

  hideToast() {
    this.toastMessageSource.next('');
  }
}