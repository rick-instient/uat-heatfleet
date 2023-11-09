import { Component, OnInit, ViewChild, Input, ElementRef, TemplateRef, HostListener, PLATFORM_ID } from '@angular/core';
import {
  HttpBackend,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { makeStateKey } from '@angular/platform-browser';

import { Inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ServiceType } from 'src/app/shared/models/general.model';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.config';
import { URLS } from '../../urls';
import { ClientApiService } from '../../api/client.service';
import { NWResult, NetworkService } from '../../api/network.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { ZipCodeCheckResponse } from '../../models/client.model';




export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-section-main',
  templateUrl: './section-main.component.html',
  styleUrls: ['./section-main.component.scss'],
})
export class SectionMainComponent implements OnInit {
  inputValue: string = '';
  private window: CustomWindow;

  scrollPosition: number = 0;
  modalView = false;
  suspiciousModal = false;
  NotifyZipDialog = false;
  Notify_1: any;
  Notify_2: any;
  Notify_3: any;
  @ViewChild('inputText', { static: false })
  inputTextRef!: ElementRef<HTMLInputElement>;

  private isRefreshingToken: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  ImageBg: any;

  @Input() LandingPage: any;
  @Input() townData: any;
  @Input() townImageUrl: any;
  @Input() city: any;
  @Input() state: any;
  @Input() zipFetched: any;
  @Input() loaded: any;
  // commented_v
  @Input() logoUrls: any;

  @Input() logoUrls_loaded: any;
  @Input() enableTown: any;
  @Input() qtyLoaded = false;
  @Input() titleTagTown = false;
  @Input() altTagTown = '';
  @Input() enableState: any;
  @Input() infoCheckBox: any;
  InfoCheckboxLoaded = false;
  @Input() breadcrumbs: any;
  @Input() mainPage: any;
  @Input() ctaText: any;
  @Input() bsAltLine: any;
  @Input() payLater: any;
  @Input() type: any;
  public fixed: boolean = false;
  public zipCodeInput = '01568';
  public zipIsValid = true;
  public isLoading = false;
  public userInitZip = '';
  public City = 'Unknown';
  public CityShort = 'Unknown';
  companySearchInput: any;
  firstEntered: boolean = true;
  searchContain: any;
  searchContainShow = false;
  deviceId: any;
  titleTag: any;
  altTag: any;
  public quantityInput = 100;
  public quantityInput_withGal = '100 gal';
  minimumQuantity: any;
  delivery_address: any;
  EnableLoggedInUser = '';
  AddressInput: any;
  AddressInput_Id: any;
  loadingZipResponse = false;
  loadZIp = true;
  loadFirstTime = false;
  enableGeoSearch = false;
  existing_zip_searched: any;
  town = false;
  srcSetConfig: any;
  srcSetConfig_Logos: any;
  ip_address: any;
  cart: any;
  customerType = 0;
  Error: any;
  zipCode1: any;
  ip: any;
  defaultTown = '';
  logoUrls2 = [];
  errSMS: any;
  innerWidth: number;

  public defaultZip = '01568';
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    protected route: ActivatedRoute,
    private clientApiService: ClientApiService,
    public config: CommonService,
    public handler: HttpBackend,
    public http: HttpClient,
    public http2: NetworkService,
    public networkService: NetworkService,
    protected authenticationServie: AuthenticationService,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
  ) {
    // this.http = new HttpClient(this.handler);
    this.window = <any>this.document.defaultView;





  }

  imageLoaded = false;

  onImageLoad() {
    const placeholderImage = document.querySelector('.placeholder-image') as HTMLElement;
    const actualImage = document.querySelector('.bg-img') as HTMLElement;
    const loader = document.querySelector('.loader') as HTMLElement;
    this.imageLoaded = true;

    placeholderImage.style.opacity = '0';
    actualImage.style.opacity = '1';
    loader.style.opacity = '0';
    loader.style.display = 'none';
  }

  async ngOnChanges() {

    // if (isPlatformServer(this.platformId)) {
    //   console.log('Server-side rendering');
    //   await new Promise((resolve) => {
    //     let interval = setInterval(() => {
    //       console.log('Server-side rendering ++');
    //       console.log(typeof this.townImageUrl, typeof this.LandingPage);
    //       if (this.townImageUrl || this.LandingPage) {
    //         clearInterval(interval);
    //         resolve(true);
    //       }
    //     }, 300)
    //   });
    // } else if (isPlatformBrowser(this.platformId)) {
    //   console.log('Client-side rendering');
    // }

    if (this.breadcrumbs) {
      this.breadcrumbs[0].url = "home.html";
    }

    if (this.loaded) {
      this.InfoCheckboxLoaded = true;
      this.loaded = false;
      this.town = true;

      if (this.zipFetched) {
        this.zipCodeInput = this.zipFetched;
        this.loadZipcode();
      } else {
        this.zipCodeInput = this.defaultZip;
        this.loadZipcode();
      }

      if (this.townImageUrl) {
        let imgurl = this.townImageUrl;
        this.defaultTown = '';
        let townImageUrl =
          imgurl +
          `?tr=w-480 480w,` +
          imgurl +
          `?tr=w-640 640w,` +
          imgurl +
          `?tr=w-768 768w,` +
          imgurl +
          `?tr=w-960 960w,` +
          imgurl +
          `?tr=w-1024 1024w,` +
          imgurl +
          `?tr=w-1366 1366w,` +
          imgurl +
          `?tr=w-1600 1600w,` +
          imgurl +
          `?tr=w-1920 1920w,` +
          imgurl +
          `?tr=w-4096 4096w`;

        this.titleTag = this.titleTagTown;
        this.srcSetConfig = townImageUrl;
        this.altTag = this.altTagTown;

      } else {

        this.ImageBg =
          '../../assets/12-Search-Best-Heating-Oil-Delivery-Prices.webp';
        this.altTag = 'Town Profile Image';
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
      }
    }

    if (this.qtyLoaded == true) {
      var qtyEn: any = this.config.storageGet('home')['__zone_symbol__value'];


      if (qtyEn) {
        this.quantityInput_withGal = qtyEn;
        qtyEn = this.config.replaceAll(qtyEn, ' gal', '');
        this.quantityInput = qtyEn;
      }
    }
  }

  ngOnInit() {

    this.innerWidth = this.window.innerWidth;
    this.ip_address =
      this.config.storageGet('ip_address')['__zone_symbol__value'];



    if (this.townData) {   // town/state page load default image
      // this.ImageBg =
      // '../../assets/blurry.png';

      this.defaultTown = 'enable';

      // this.srcSetConfig =
      //   this.ImageBg +
      //   `?tr=w-480 480w,` +
      //   this.ImageBg +
      //   `?tr=w-640 640w,` +
      //   this.ImageBg +
      //   `?tr=w-768 768w,` +
      //   this.ImageBg +
      //   `?tr=w-960 960w,` +
      //   this.ImageBg +
      //   `?tr=w-1024 1024w,` +
      //   this.ImageBg +
      //   `?tr=w-1366 1366w,` +
      //   this.ImageBg +
      //   `?tr=w-1600 1600w,` +
      //   this.ImageBg +
      //   `?tr=w-1920 1920w,` +
      //   this.ImageBg +
      //   `?tr=w-4096 4096w`;
    } else {
      this.ImageBg =
        '../../assets/12-Search-Best-Heating-Oil-Delivery-Prices.webp';

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



    }

    this.loadZIp = true;
    this.enableGeoSearch = false;
    this.config.delivery_address = JSON.parse(
      this.config.storageGet('delivery_address')['__zone_symbol__value']
    );
    var selectedDeliveryAddress = JSON.parse(
      this.config.storageGet('selectedDeliveryAddress')['__zone_symbol__value']
    );

    if (this.config.delivery_address) {
      if (selectedDeliveryAddress) {
        this.config.selectedDeliveryAddress = selectedDeliveryAddress;
      } else {
        this.config.selectedDeliveryAddress = this.config.delivery_address[0];
      }
      this.config.EnableLoggedInUser = 'EnableLoggedInUser';

      var deliveryStreet1 = '';
      if (this.config.selectedDeliveryAddress.deliveryStreet1) {
        deliveryStreet1 =
          this.config.selectedDeliveryAddress.deliveryStreet1 + ' ';
      }

      this.AddressInput_Id = this.config.selectedDeliveryAddress.id;
      this.zipCodeInput = this.config.selectedDeliveryAddress.deliveryZIP;
      this.AddressInput = this.config.selectedDeliveryAddress.deliveryNickName
        ? this.config.selectedDeliveryAddress.deliveryNickName
        : this.config.selectedDeliveryAddress.deliveryStreet1;
    }
    // this.loadZipcode();

    this.zipSearch();
    this.find(this.zipCodeInput);
  }

  zipSearch() {
    this.loadFirstTime = true;
    this.config.delivery_address =
      this.config.storageGet('delivery_address')['__zone_symbol__value'];

    var today = new Date().toUTCString;

    var existing_date =
      this.config.storageGet('existing_date')['__zone_symbol__value'];
    // var ip_address =
    //   this.config.storageGet('ip_address')['__zone_symbol__value'];

    // if (ip_address) {
    //   this.networkService.ip_address = ip_address;
    // }

    if (this.townData && this.enableTown) {
      //this.zipCodeInput = this.zipFetched;
      this.titleTag = this.titleTagTown;

      this.config.EnableLoggedInUser = '';
      this.config.delivery_address = undefined;
    } else {
      this.titleTag = 'Heating Oil Delivery Prices';
      this.altTag = 'Photo of family sitting in front of a fireplace';

      // if (today > existing_date) {

      //   var zipCodeInput =
      //     this.config.storageGet('zipCodeInput')['__zone_symbol__value'];
      //   if (!zipCodeInput) {
      //     var zip = this.config.getLabelForOrderNavigation('zipcode', true);
      //     if (zip != undefined) {
      //     } else {
      //       this.zipCodeInput = '01568';
      //     }
      //     if (!this.ip_address) {
      //       this.fetchGeo();
      //     } else {
      //       this.find(this.zipCodeInput);
      //     }
      //   } else {
      //     var zip = this.config.getLabelForOrderNavigation('zipcode', true);

      //     if (!this.ip_address) {
      //       this.fetchGeo();
      //     } else {
      //       this.find(this.zipCodeInput);
      //     }

      //   }
      // } else {

      var zip = this.config.storageGet('zipcode');

      var ip_address =
        this.config.storageGet('ip_address')['__zone_symbol__value'];


      // if (!ip_address) {
      //   if (!this.ip_address) {
      //     this.fetchGeo();
      //   } else {
      //     this.find(this.zipCodeInput);
      //   }
      // } else {
      //   var zip = this.config.storageGet('zipcode');

      //   if (!this.ip_address) {
      //     this.fetchGeo();
      //   } else {
      //     this.find(this.zipCodeInput);
      //   }
      // }
      // }

      // this.find(this.zipCodeInput);

      if (this.config.delivery_address) {
        if (this.authenticationServie.isAuthenticated()) {
          this.config.EnableLoggedInUser = 'EnableLoggedInUser';
          this.authenticationServie
            .refreshAccessToken(this.config.getRefreshToken())
            .pipe(
              finalize(() => {
                this.isRefreshingToken.next(false);
              })
            )
            .subscribe(
              (res) => {
                this.config.EnableLoggedInUser = 'EnableLoggedInUser';
                var selectedDeliveryAddress =
                  this.config.selectedDeliveryAddress;
                if (selectedDeliveryAddress == undefined) {
                  var selectedDeliveryAddress = this.config.delivery_address[0];
                }

                if (selectedDeliveryAddress == undefined) {
                  this.config.EnableLoggedInUser = null;
                  this.config.delivery_address = false;
                  this.zipSearch();
                  return;
                }
                var deliveryStreet1 = '';

                if (selectedDeliveryAddress.deliveryStreet1) {
                  deliveryStreet1 =
                    selectedDeliveryAddress.deliveryStreet1 + ' ';
                }

                this.AddressInput_Id = selectedDeliveryAddress.id;
              },
              (err) => {
                this.config.delivery_address = undefined;
                this.config.EnableLoggedInUser = '';

                this.config.storageRemove('delivery_address');

                this.config.IsLoggedIn = false;
              }
            );
        } else {
          this.config.delivery_address = undefined;
          this.config.EnableLoggedInUser = '';
          this.config.storageRemove('delivery_address');
          this.config.IsLoggedIn = false;
          return;
        }
      } else {
        this.config.delivery_address = undefined;
        this.config.EnableLoggedInUser = '';
      }
    }
  }
  async presentModal() {
    this.config.delivery_address = this.config.storageGet('delivery_address');
    // commented_v
    // const modal = await this.modalController.create({
    //   component: SelectDeliveryAdddressDialogComponent,
    //   componentProps: {
    //     addressdetail: this.config.delivery_address,
    //     selected_Id: this.AddressInput_Id,
    //   },
    //   cssClass: 'custom-dialog select-address',
    // });
    // modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    //   if (detail.data) {
    //     if (detail.data.selectedAddress_) {
    //       this.config.EnableLoggedInUser = 'EnableLoggedInUser';

    //       var selectedDeliveryAddress = detail.data.selectedAddress_;
    //       this.config.selectedDeliveryAddress = selectedDeliveryAddress;
    //       var deliveryStreet1 = '';
    //       if (selectedDeliveryAddress.deliveryStreet1) {
    //         deliveryStreet1 = selectedDeliveryAddress.deliveryStreet1 + ' ';
    //       }

    //       this.config.storageSave(
    //         'selectedDeliveryAddress-id',
    //         selectedDeliveryAddress.id
    //       );

    //       this.zipCodeInput = selectedDeliveryAddress.deliveryZIP;
    //       this.AddressInput = deliveryStreet1;
    //       this.AddressInput_Id = selectedDeliveryAddress.id;
    //       // this.loadFirstTime = true;
    //       if (!this.ip_address) {
    //         this.fetchGeo();
    //       } else {
    //         this.find(this.zipCodeInput);
    //       }
    //       // this.find(this.zipCodeInput);
    //     }
    //   } else {
    //     return;
    //   }
    // });
    // modal.present();
  }
  public getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization',
        'access-control-allow-origin': '*',
      }),
    };
  }

  // fetchGeo() {
  //   // this.ipGeo();
  //   this.http.get('https://api.ipify.org/?format=json').subscribe(
  //     (value: any) => {
  //       // commented_v
  //       this.networkService.ip_address = value.ip;
  //       this.config.storageSave('ip_address', this.networkService.ip_address);
  //       this.find(this.zipCodeInput);
  //     },
  //     (error) => { }
  //   );
  // }

  public getNearestZip(latitude: any, longitude: any): void {
    // commented_v
    // const res = this.clientApiService.getNearestZip(
    //   '/customer/offer/get-nearest-zip?lat=' + latitude + '&lng=' + longitude
    // );
    // res.loading.subscribe((res) => {
    //   this.isLoading = res;
    // });
    // res.result.subscribe(
    //   (response) => {
    //     if (response.usZips != null && response.usZips.zip) {
    //       this.config.zipCodeGeo = response.usZips.zip;
    //       var zip = this.config.config.getLabelForOrderNavigation('zipcode', true);
    //       if (zip != undefined) {
    //         this.zipCodeInput = zip;
    //       } else {
    //         this.zipCodeInput = this.config.zipCodeGeo;
    //       }
    //     }
    //   },
    //   (error: HttpErrorResponse) => {
    //     return this.HandleApiErrorDialogOnly(error);
    //   }
    // );
  }
  public find(f: any): void {


    var inputValue: any = f;
    var qty;

    if (f.target) {

      var inputElement = f.target as HTMLInputElement;
      const inputValue = inputElement.value;

      inputElement.value = inputValue.replace(/[^0-9]/g, '');

      qty = inputElement.value;

    } else {
      qty = f;
    }

    if (qty) {
      var len = qty.toString().length;
    }

    if (len == 5) {
      this.zipCodeInput = qty;

      console.log(2);
      this.loadingZipResponse = false;
      if (this.mainPage) {
        this.loadZipcode();
      }
    }

  }

  ngAfterViewInit() {
    const scrollableElement: any = this.el.nativeElement.querySelector('#scrollableElement');
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', () => {
        this.scrollPosition = scrollableElement.scrollTop;
      });
    }
  }

  loadZipcode() {
    // const res = this.clientApiService.checkZipCode(
    const res = this.checkZipCode(
      this.zipCodeInput,
      this.networkService.ip_address
    );

    res.loading.subscribe((res) => {
      this.isLoading = res;
    });
    const headers = new HttpHeaders({
      'X-Api-Key': `${environment.api_key}`,
      'DAVOS-IsMobile': environment.isMobile.toString(),
    });

    const url = `${environment.api_url}customer/offer/zipcodecheck?zipCode=${this.zipCodeInput}&ipAddress=${this.networkService.ip_address}&isAgent=${this.config.isAgent}`;

    this.http.get(url, { headers: headers }).subscribe(
      (response: any) => {
        if (response.isSuspiciousUser) {
          this.zipCodeInput = this.cart.zipCode;

          this.showSuspiciousUserDialog(
            response.suspiciousCities,
            this.networkService.ip_address
          );
          this.loadingZipResponse = true;
          this.loadZIp = false;
          return;
        }

        if (this.loadFirstTime == true) {
          this.loadFirstTime = false;
          if (!this.townData) {
            this.logoUrls = response.logoUrls;
          }
        }

        this.clientApiService.IsDealAvailable = false;
        if (response.zipCodeExists) {
          this.minimumQuantity = response.minimumQuantity;
          this.cart = {};
          this.cart.zipCode = response.zipCode;
          this.cart.city = response.city;
          this.cart.county = response.county;
          this.cart.state = response.state;
          this.cart.isMultipleFips = response.isMultipleFips;
          this.cart.tankSize = 275;
          this.cart.isDealAvailable = response.isDealAvailable;
          this.cart.address = this.City;
          if (response.allFips == null) {
            this.cart.fipsCode = response.fips;
          }
          this.loadingZipResponse = false;

          var msg =
            'The minimum quantity for ' +
            this.cart.city +
            ' is ' +
            this.minimumQuantity +
            ' gallons. Please enter a quantity of at least that size.';

          if (this.quantityInput < this.minimumQuantity) {

            return;
          }

          this.config.storageSave('cart', this.cart);

          this.config.storageSave('zipcode', response.zipCode);
          this.config.storageSave('defaultcity', response.city);
          this.config.storageSave('defaultstate', response.state);

          this.config.storageSave(
            'isDealAvailable',
            JSON.stringify(response.isDealAvailable)
          );

          this.config.storageSave('zipCodeExists', 'true');
        } else {
          this.config.storageSave('zipCodeExists', 'false');
          this.loadingZipResponse = false;

          if (response.isValidUSZip && response.city) {
            this.showNotifyZipDialog(true, false, response.city);
          } else {
            this.showNotifyZipDialog(false, false, null);
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.loadingZipResponse = false;
        this.ShowError("Failed to connect.")

      }
    );
  }
  setStyles() {
    let styles = {

      'action-button-disabled': this.loadingZipResponse == true
    };
    return styles;
  }


  findDeal() {


    if (this.loadingZipResponse) {
      return;
    }

    this.trackMe();
    if (this.zipCodeInput.length < 5) {
      return;
    }

    if (isNaN(Number(this.quantityInput)) || Number(this.quantityInput) < 1) {

      this.ShowError('Valid quantity required');


      return;
    }

    this.cart = JSON.parse(this.config.storageGet('cart')['__zone_symbol__value']);

    var msg =
      'The minimum quantity for ' +
      this.cart.city +
      ' is ' +
      this.minimumQuantity +
      ' gallons. Please enter a quantity of at least that size.';

    if (this.quantityInput < this.minimumQuantity) {
      this.ShowError(msg);
      return;
    }

    this.cart.zipCode = this.zipCodeInput;

    this.cart.city = this.cart.city;
    this.cart.state = this.cart.state;
    this.cart.amount = this.quantityInput;


    this.config.storageSave('cart', this.cart);

    this.config.storageSave('defaultcity', this.cart.city);
    this.config.storageSave('defaultstate', this.cart.state);

    if (this.town) {
      this.config.companyNavigate = true;
      this.config.delivery_address = false;
      this.config.EnableLoggedInUser = null;
    } else {
      this.config.companyNavigate = false;
    }

    if (this.cart.isDealAvailable) {
      var orderType = ServiceType.OilDelivery;

      var qty = JSON.stringify(this.quantityInput);
      this.config.storageSave('quantityEntered', JSON.stringify(qty));
      this.config.storageSave('home', `${this.quantityInput} gal`);

      this.config.storageSave('AddressInput', this.AddressInput);
      this.config.storageSave('AddressInput_Id', this.AddressInput_Id);

      let path_ = environment.secure_url;

      let url = path_ + "oil-select-provider/" + this.cart.zipCode + "/" + 0 + "/" + this.customerType + "/" + orderType + "/" + this.quantityInput
      this.window.open(url, "_self");


    } else {
      var orderType = ServiceType.OilDelivery;
      this.clientApiService.IsDealAvailable = true;

      var today = new Date();

      var tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      var year = tomorrow.getFullYear();
      var month = tomorrow.getMonth() + 1;
      var day = tomorrow.getDate();
      let len = JSON.stringify(month).length;

      var newMonth: any;

      if (len == 1) {
        newMonth = JSON.stringify(0) + month;
      } else {
        newMonth = month;
      }

      let default_date =
        JSON.stringify(year) + '/' + newMonth + '/' + JSON.stringify(day);
      this.clientApiService.defaultDate = default_date;
      var formatted = JSON.stringify(year) + newMonth + JSON.stringify(day);

      let predefined = {
        amount: 100,
        cash: false,
        customerType: 0,
        dayId: formatted,
        orderType: 4,
        tankSize: 0,
        zipCode: this.zipCodeInput,
      };

      this.quantityInput = 100;
      this.config.storageSave('home', `${this.quantityInput} gal`);
      this.config.storageSave('AddressInput', this.AddressInput);
      this.config.storageSave('AddressInput_Id', this.AddressInput_Id);
      this.config.navigateCompanyId = null;

      let path_ = environment.secure_url;

      let url = path_ + "oil-select-provider/" + this.cart.zipCode + "/" + 0 + "/" + this.customerType + "/" + orderType + "/" + this.quantityInput
      this.window.open(url, "_self");

    }
  }

  convertDate(d: any) {
    var parts = d.split(' ');
    var months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

  }


  closeNotify() {
    this.NotifyZipDialog = false;
  }
  async showNotifyZipDialog(n: any, maxQuantity: any, city: any) {


    this.zipCode1 = n[0] + ', ' + n[1] + ', ' + n[2] + ', ' + n[3] + ', ' + n[4] + ', ' + n[5];

    this.Notify_1 = n;
    this.Notify_2 = n;
    this.Notify_3 = n;

    this.NotifyZipDialog = true;


  }

  async showSuspiciousUserDialog(n: any, ip: any) {


    this.zipCode1 = n[0] + ', ' + n[1] + ', ' + n[2] + ', ' + n[3] + ', ' + n[4] + ', ' + n[5];
    this.ip = ip;

    this.suspiciousModal = true;


  }

  close_suspiciousModal() {
    this.suspiciousModal = false;
  }

  async storageRemove(name: any) {
    if (name) {
      this.window.localStorage.removeItem(name);
    }
  }

  clearInput() {

    this.zipCodeInput = '';
    this.firstEntered = false;

  }

  clearInputQty() {
    this.quantityInput_withGal = '';

  }

  updateQuantity(f: any) {


    var qty;

    if (f.target) {

      var inputElement = f.target as HTMLInputElement;
      const inputValue = inputElement.value;


      inputElement.value = inputValue.replace(/[^0-9]/g, '');

      qty = inputElement.value;



      qty = this.config.replaceAll(qty, ' gal', '');
      this.quantityInput = qty;

      if (this.quantityInput > 2000) {
        this.quantityInput = 2000;
        this.quantityInput_withGal = '2000';
        this.showNotifyZipDialog(true, true, null);
      }


    } else {

      f = this.config.replaceAll(f, ' gal', '');
      this.quantityInput = f;

      if (this.quantityInput > 2000) {
        this.quantityInput = 2000;
        this.quantityInput_withGal = '2000';
        this.showNotifyZipDialog(true, true, null);
      }
    }


  }

  focusOutFunction(n: any) {
    var qty = n.replaceAll(' gal', '');
    this.quantityInput_withGal = qty + ' gal';

    if (n.length == 0) {
      this.quantityInput_withGal = this.quantityInput + ' gal';
    }

  }

  focusFunction(n: any) {
    n = this.config.replaceAll(n.value, ' gal', '');
    this.quantityInput_withGal = n;

  }

  navigateModal() {
    if (this.config.delivery_address) {
      this.presentModal();
    }
  }

  checkLength2(e: any, yu: any, num: any) {
    const input: any = this.inputTextRef.nativeElement.value;

    if (num == 'qty') {
      var length = 4;
    } else {
      var length = 5;
    }
    const functionalKeys = ['Backspace', 'ArrowRight', 'ArrowLeft'];

    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }

    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection =
      input.selectionStart !== input.selectionEnd &&
      input.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key);
    } else {
      newValue = input.value + keyValue.toString();
    }

    if (newValue.length > length) {
      e.preventDefault();
    }
  }

  private replaceSelection(input: any, key: any) {
    const inputValue = input.value;
    const start = input.selectionStart;
    const end = input.selectionEnd || input.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }

  navigateHome() {
    this.config.navigate(URLS.HOME);
  }
  ZipFocusOut(n: any) {
    if (n.length === 0) {
      if (!this.zipFetched) {
        // If no ZIP code is fetched, use the default ZIP code
        this.zipCodeInput = this.defaultZip;
      } else {
        // If a ZIP code is fetched from the database, use it
        this.zipCodeInput = this.zipFetched;
      }
    } else {
      // If the user typed a ZIP code, use it
      this.zipCodeInput = n;
    }
  }

  trackMe() {
    // let username = this.config.storageGet('username')['__zone_symbol__value'];
    // if (!username) {
    //   username = 'unknown';
    // }
    // let zipcode = this.getNavigationHistoryItem('zipcode');
    // let defaultcity = this.getNavigationHistoryItem('defaultcity');
    // let val =
    //   'A deal has been searched by ' +
    //   username +
    //   ' for ' +
    //   defaultcity +
    //   ', ' +
    //   zipcode +
    //   ' with a quantity of ' +
    //   this.quantityInput +
    //   ' gal';
    // gtag('event', 'SEARCH_DEAL_BUTTON_CLICKED', {
    //   event_category: 'BUTTON_CLICK',
    //   event_label: 'Deal Searched for ' + defaultcity,
    //   value: val,
    // });
  }

  navigateUrl(event: any, url: any) {
    event.preventDefault();
    this.config.navigate(url);
  }

  ShowError(n) {
    this.Error = n;
    this.modalView = true;

  }



  closeModel() {
    this.modalView = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = this.window.innerWidth;
  }

  @ViewChild('bgImg') background!:ElementRef;
  @HostListener('window:load', ['$event'])
  onLoad(event) {
    if (event.target.innerWidth <= 500){
      this.background.nativeElement.remove();
    }
  }

  protected getHttpOptionsWithKey(withoutToken: boolean = false) {
    const token = environment.token;
    return {
      headers: new HttpHeaders({
        'X-Api-Key': `${environment.api_key}`,
        'DAVOS-IsMobile': environment.isMobile.toString(),
        // Authorization: token,
      }),
    };
  }

  checkZipCode(
    zip: string,
    ipAddress: string
  ): NWResult<ZipCodeCheckResponse> {

    const url = `customer/offer/zipcodecheck?zipCode=${zip}&ipAddress=${ipAddress}&isAgent=${this.config.isAgent}`;
    const res = this.http2.getRes<any>(url, this.getHttpOptionsWithKey());
    return res;
  }

}