import { Component, OnInit, ViewChild } from '@angular/core';
// import {
//   ModalController,
//   NavController,
//   PopoverController,
// } from '@ionic/angular';
// import { ClientApiService } from 'src/shared/api/client.service';
// import { OverlayEventDetail } from '@ionic/core';
// import { NotifyZipDialogComponent } from '../../../dialogs/notify-zip-dialog/notify-zip-dialog.component';
// import { FrequentlyUsedService } from 'src/shared/api/frequently-used.service';
// import {
//   AuthenticationService,
//   BaseComponent,
//   ConstructorParams,
//   CookieHelper,
//   EventBus,
//   URLS,
// } from 'src/shared';
// import { ClientBaseComponent } from '../../../components/clientbase.component';
// import { HttpErrorResponse } from '@angular/common/http';
// import { ActivatedRoute } from '@angular/router';

// import { Inject, HostListener } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
// import { IonContent } from '@ionic/angular';
// import { CommonService } from '../../../heatfleet-landing/common.config';
// import { NetworkService } from 'src/shared/api/network.service';
// import { SuspiciousUserDialogComponent } from 'src/app/dialogs/suspicious-user-dialog/suspicious-user-dialog.component';
// import { ServiceType } from 'src/shared/models/general.model';
// import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-section-img',
  templateUrl: './section-img.component.html',
  styleUrls: ['./section-img.component.scss'],
})
export class SectionImgComponent implements OnInit {
  //   @ViewChild(IonContent, { static: true }) content: IonContent;
  ImageBg: any;
  titleTag: any;
  altTag: any;
  //   public fixed: boolean = false;
  //   public zipCodeInput = '01568';
  //   public zipIsValid = true;
  //   public isLoading = false;
  //   public userInitZip = '';
  //   public City = 'Unknown';
  //   public CityShort = 'Unknown';
  //   firstEntered: boolean = true;
  //   deviceId: any;
  //   public quantityInput = 100;
  //   public quantityInput_withGal = '100 gal';
  //   minimumQuantity: any;
  //   epochNow: any;
  //   existing_zip_searched: any;
  srcSetConfig: any;
  //   constructor(
  //     public eventBus: EventBus,
  //     public modalController: ModalController,
  //     protected authenticationServie: AuthenticationService,
  //     protected cookieHelper: CookieHelper,
  //     protected route: ActivatedRoute,
  //     private clientApiService: ClientApiService,
  //     private navCtrl: NavController,
  //     public config: CommonService,
  //     public networkService: NetworkService,
  //     @Inject(DOCUMENT) private doc: Document,
  //     public fb: FormBuilder
  //   ) {
  //     super(ConstructorParams.Create().with(eventBus, modalController), fb);
  //     this.epochNow = '16800000000';
  //   }

  ngOnInit() {
    this.ImageBg =
      'https://media-cdn.heatfleet.com/5j-Long-Island-COD-Fuel-Map.png';

    this.srcSetConfig =
      this.ImageBg +
      `?tr=w-480 480w,` +
      this.ImageBg +
      `?tr=w-640 640w,` +
      this.ImageBg +
      `?tr=w-768 768w,` +
      this.ImageBg +
      `?tr=w-960 960w,` +
      this.ImageBg +
      `?tr=w-1024 1024w,` +
      this.ImageBg +
      `?tr=w-1366 1366w,` +
      this.ImageBg +
      `?tr=w-1600 1600w,` +
      this.ImageBg +
      `?tr=w-1920 1920w,` +
      this.ImageBg +
      `?tr=w-4096 4096w`;

    this.titleTag = 'Long Island COD Fuel Map';
    this.altTag = 'Map of Long Island with heating oil truck locations.';

    //     var zip = this.getLabelForOrderNavigation('zipcode', true);
    //     if (zip != undefined) {
    //       this.zipCodeInput = zip;
    //     }

    //     this.find(this.zipCodeInput);
  }

  //   ngAfterViewInit() {}

  //   updateQuantity(f) {
  //     f = this.config.replaceAll(f, ' gal', '');
  //     this.quantityInput = f;

  //     if (this.quantityInput > 2000) {
  //       this.quantityInput = 2000;
  //       this.quantityInput_withGal = '2000';
  //       this.showNotifyZipDialog(true, true, null);
  //     }
  //   }
  //   convertDate(d) {
  //     var parts = d.split(' ');
  //     var months = {
  //       Jan: '01',
  //       Feb: '02',
  //       Mar: '03',
  //       Apr: '04',
  //       May: '05',
  //       Jun: '06',
  //       Jul: '07',
  //       Aug: '08',
  //       Sep: '09',
  //       Oct: '10',
  //       Nov: '11',
  //       Dec: '12',
  //     };
  //     return parts[3] + '-' + months[parts[1]] + '-' + parts[2];
  //   }

  //   private isInputValid(): boolean {
  //     this.zipIsValid = FrequentlyUsedService.IsValidZIP(this.zipCodeInput);
  //     return this.zipIsValid;
  //   }

  //   async showNotifyZipDialog(n, maxQuantity, city) {
  //     //debugger;
  //     const modal = await this.modalController.create({
  //       component: NotifyZipDialogComponent,
  //       componentProps: {
  //         zipCode: this.zipCodeInput,
  //         isValidUSZip: n,
  //         maxQuantity: maxQuantity,
  //         city: city,
  //       },
  //       cssClass: 'custom-dialog notify-zip-dialog',
  //     });
  //     modal.onDidDismiss().then((detail: OverlayEventDetail) => {
  //       if (!maxQuantity) {
  //         this.zipCodeInput = this.existing_zip_searched;
  //         // this.zipCodeInput = '';
  //         this.firstEntered = false;
  //       }
  //     });
  //     modal.present();
  //   }

  //   clearInput() {
  //     // if (this.firstEntered == true) {
  //     this.zipCodeInput = '';
  //     this.firstEntered = false;
  //     // }
  //   }

  //   async showSuspiciousUserDialog(n) {
  //     //debugger;
  //     const modal = await this.modalController.create({
  //       component: SuspiciousUserDialogComponent,
  //       componentProps: {
  //         zipCode1: n[0],
  //         zipCode2: n[1],
  //         zipCode3: n[2],
  //         zipCode4: n[3],
  //         zipCode5: n[4],
  //         zipCode6: n[5],
  //       },
  //       cssClass: 'custom-dialog notify-zip-dialog',
  //     });
  //     modal.onDidDismiss().then((detail: OverlayEventDetail) => {});
  //     modal.present();
  //   }

  //   public find(f): void {
  //     // if (!this.isInputValid()) {
  //     //   return;
  //     // }
  //     // if (this.isLoading) {
  //     //   return;
  //     // }

  //     var qty = f;
  //     if (qty) {
  //       var len = qty.toString().length;
  //     }

  //     if (len != 5 && len != 0) {
  //       var qty = f;
  //       var len = qty.toString().length;
  //     }
  //     if (len == 5) {
  //       this.zipCodeInput = qty;

  //       this.existing_zip_searched = this.cart.zipCode;

  //       // ip of the device
  //       const res = this.clientApiService.checkZipCode(
  //         this.zipCodeInput,
  //         this.networkService.ip_address
  //       );
  //       res.loading.subscribe((res) => {
  //         console.log('SET LOADING: ' + res);
  //         this.isLoading = res;
  //       });
  //       res.result.subscribe(
  //         (response) => {
  //           if (response.isSuspiciousUser) {
  //             this.showSuspiciousUserDialog(response.suspiciousCities);
  //             return;
  //           }

  //           this.clientApiService.IsDealAvailable = false;
  //           if (response.zipCodeExists) {
  //             this.minimumQuantity = response.minimumQuantity;

  //             this.cart.zipCode = response.zipCode;
  //             this.cart.city = response.city;
  //             this.cart.county = response.county;
  //             this.cart.state = response.state;
  //             this.cart.isMultipleFips = response.isMultipleFips;
  //             this.cart.tankSize = 275;
  //             this.cart.isDealAvailable = response.isDealAvailable;
  //             this.cart.address = this.City;
  //             if (response.allFips == null) {
  //               this.cart.fipsCode = response.fips;
  //             }

  //             var msg =
  //               'The minimum quantity for ' +
  //               this.cart.city +
  //               ' is ' +
  //               this.minimumQuantity +
  //               ' gallons. Please enter a quantity of at least that size.';
  //             // `The minimum order quantity in this service area is ${this.data.minimalAmount}gal, please revise your order quantity.`
  //             if (this.quantityInput < this.minimumQuantity) {
  //               this.ShowError(msg);
  //               this.quantityInput = this.minimumQuantity;
  //               return;
  //             }

  //             this.cookieHelper.setCart(this.cart);
  //             this.addNavigationHistoryItem('zipcode', response.zipCode);
  //             this.addNavigationHistoryItem('defaultcity', response.city);
  //             this.addNavigationHistoryItem('defaultstate', response.state);

  //             this.addNavigationHistoryItem(
  //               'isDealAvailable',
  //               JSON.stringify(response.isDealAvailable)
  //             );
  //             if (this.cart.isDealAvailable) {
  //               // this.quantityInput = this.minimumQuantity;
  //             }
  //           } else {
  //             if (response.isValidUSZip && response.city) {
  //               this.showNotifyZipDialog(true, false, response.city);
  //             } else {
  //               this.showNotifyZipDialog(false, false, null);
  //             }
  //           }
  //         },
  //         (error: HttpErrorResponse) => {
  //           return this.HandleApiErrorDialogOnly(error);
  //         }
  //       );
  //     }
  //   }

  //   findDeal() {
  //     if (isNaN(Number(this.quantityInput)) || Number(this.quantityInput) < 1) {
  //       this.ShowError('Valid quantity required');

  //       return;
  //     }

  //     var msg =
  //       'The minimum quantity for ' +
  //       this.cart.city +
  //       ' is ' +
  //       this.minimumQuantity +
  //       ' gallons. Please enter a quantity of at least that size.';
  //     // `The minimum order quantity in this service area is ${this.data.minimalAmount}gal, please revise your order quantity.`
  //     if (this.quantityInput < this.minimumQuantity) {
  //       this.ShowError(msg);
  //       // this.quantityInput = this.minimumQuantity;
  //       return;
  //     }

  //     if (this.cart.isDealAvailable) {
  //       var orderType = ServiceType.OilDelivery;

  //       var qty = JSON.stringify(this.quantityInput);

  //       // this.addNavigationHistoryItem("home", `${qty} gal`);
  //       this.addNavigationHistoryItem('quantityEntered', JSON.stringify(qty));

  //       // this.navCtrl.navigateRoot([this.URLS.CLIENT_HOME, this.zipCode]);
  //       this.addNavigationHistoryItem('home', `${this.quantityInput} gal`);
  //       this.navCtrl.navigateRoot([
  //         this.URLS.CLIENT_SELECT_OIL_PROVIDER,
  //         this.cart.zipCode,
  //         0,
  //         this.customerType,
  //         orderType,
  //         this.quantityInput,
  //       ]);
  //     } else {
  //       var orderType = ServiceType.OilDelivery;
  //       this.clientApiService.IsDealAvailable = true;

  //       var today = new Date();

  //       var tomorrow = new Date(today);
  //       tomorrow.setDate(today.getDate() + 1);

  //       var year = tomorrow.getFullYear();
  //       var month = tomorrow.getMonth() + 1;
  //       var day = tomorrow.getDate();
  //       let len = JSON.stringify(month).length;

  //       var newMonth: any;

  //       if (len == 1) {
  //         newMonth = JSON.stringify(0) + month;
  //       } else {
  //         newMonth = month;
  //       }

  //       let default_date =
  //         JSON.stringify(year) + '/' + newMonth + '/' + JSON.stringify(day);
  //       this.clientApiService.defaultDate = default_date;
  //       var formatted = JSON.stringify(year) + newMonth + JSON.stringify(day);

  //       let predefined = {
  //         amount: 100,
  //         cash: false,
  //         customerType: 0,
  //         dayId: formatted,
  //         orderType: 4,
  //         tankSize: 0,
  //         zipCode: this.zipCodeInput,
  //       };

  //       this.quantityInput = 100;
  //       this.addNavigationHistoryItem('home', `${this.quantityInput} gal`);
  //       this.navCtrl.navigateRoot([
  //         this.URLS.CLIENT_SELECT_OIL_PROVIDER,
  //         this.cart.zipCode,
  //         0,
  //         this.customerType,
  //         orderType,
  //         this.quantityInput,
  //       ]);
  //     }
  //   }
  //   ZipFocusOut(n) {
  //     if (n.length == 0) {
  //       this.zipCodeInput = this.cart.zipCode;
  //     }
  //   }

  //   focusFunction(n) {
  //     n = this.config.replaceAll(n.value, ' gal', '');
  //     this.quantityInput_withGal = n;
  //     // n.select();
  //   }

  //   focusOutFunction(n) {
  //     var qty = n.replaceAll(' gal', '');
  //     this.quantityInput_withGal = qty + ' gal';

  //     if (n.length == 0) {
  //       this.quantityInput_withGal = this.quantityInput + ' gal';
  //     }

  //     // this.findDeal();
  //   }

  //   clearInputQty() {
  //     this.quantityInput_withGal = '';
  //   }

  //   navigate() {
  //     this.navCtrl.navigateRoot([this.URLS.HOME]);
  //   }
}
