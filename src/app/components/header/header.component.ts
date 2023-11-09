import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Inject,
} from '@angular/core';
import { Router } from '@angular/router';
// import { NavController, PopoverController } from '@ionic/angular';
import { filter, finalize } from 'rxjs/operators';
// import { AuthenticationService, CookieHelper, EventBus } from 'src/shared';
// import { ClientApiService } from 'src/shared/api/client.service';
// import { URLS } from 'src/shared/urls';
// import { MenuComponent } from '../menu/menu.component';
// import { MenuLoggedoutComponent } from '../menuloggedout/menuloggedout.component';
// import { environment } from 'src/environments/environment';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';
// import { WINDOW } from './services/window.service';
import { CommonService } from '../../shared/services/common.config';
import { URLS } from '../../shared/urls';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  private window: CustomWindow;
  public URLS = URLS;
  @Input() CompanyLogoUrl: any;
  @Input() companyColor: string = '0e8bde';
  @Input() contactUrl: string;
  @Input() aboutUsUrl: string;
  @Input() companyName: any;
  @Input() logoAlt: any;
  @Output() headerInit = new EventEmitter<any>();
  typeComp = 'oil';
  @Output() openMenuEmitter: EventEmitter<void> = new EventEmitter();
  @Input() showHamburger: boolean = true;
  menuSelection = [
    {
      link: 'loginvendor',
      label: 'Dealer Login',
    },
    {
      link: 'list',
      label: 'Request Information',
    },
  ];
  IsLoggedIn = false;
  @Input() public selectedId: string = '';
  // public URLS = URLS;
  public City = '';
  public CityShort = '';
  epochNow: any;
  public menus: { id: string; displayName: string }[] = [
    // { id: URLS.CLIENT_SAVINGS, displayName: 'Savings' },
    /*    {id:URLS.CLIENT_ENTER_ZIP, displayName: 'Enter ZIP'},
        {id:'service-details', displayName: 'Service details'},
        {id:'confirm-address', displayName: 'Confirm address'},
        {id:'delivery-details', displayName: 'Delivery details'},
        {id:'order-success', displayName: 'Order success'},
        {id:URLS.FORGET_PWD, displayName: 'Forgot pwd'},
        {id:'payment', displayName: 'Payment'},*/
  ];
  public Username = '';
  public Useremail = '';
  siteUrl: any;
  constructor(
    private router: Router,
    private authenticationServie: AuthenticationService,
    // private eventBus: EventBus,
    // private authenticationServie: AuthenticationService,
    // private cookieHelper: CookieHelper,
    // protected popoverController: PopoverController,
    // private clientApiService: ClientApiService,
    // private navCtrl: NavController,
    public config: CommonService,
    @Inject(DOCUMENT) private document: Document,
    private cookieService: CookieService
  ) {
    this.window = <any>this.document.defaultView;
    this.epochNow = '16800000000';
  }

  public ngOnInit(): void {
    this.checkCookie();
    // this.config.checkCookie();
    this.siteUrl = '/';
    // commented_v
    // this.siteUrl = environment.client_url;
    // this.cookieHelper.CartInited$.pipe(
    //   filter((cart) => cart !== null)
    // ).subscribe((cart) => {
    //   this.City = cart.address;
    //   this.CityShort = cart.city;
    // });
    setTimeout(() => {
      // commented_v
      // this.config.IsLoggedIn = this.authenticationServie.isAuthenticated();
      // this.Useremail = this.cookieHelper.getUserEmail();
      // this.Username = this.cookieHelper.getFirstName();
      // if (this.authenticationServie.isAuthenticated()) {
      //   this.getCity();
      //   if (this.menus.length == 1) {
      //     this.menus.push({ id: URLS.CLIENT_ACCOUNT, displayName: 'Account' });
      //     this.menus.push({ id: URLS.CLIENT_ORDERS, displayName: 'Orders' });
      //   }
      //   this.eventBus.onAccountDataChangedReceived().subscribe(() => {
      //     //debugger
      //     this.getCity();
      //   });
      // } else {
      //   if (this.menus.length == 3) {
      //     this.menus.pop();
      //     this.menus.pop();
      //   }
      // }
    }, 150);
  }

  checkCookie() {

    console.log("Check cookie");

    if (this.cookieService.get('NEWGEN') && this.cookieService.get('NewToken2')) {
      let refresh = this.cookieService.get('NEWGEN');
      // this.cookieService.get('Test');

      console.log(refresh);
      console.log(this.cookieService.get('NewToken2'));

      var newToken_ = refresh;
      let tokenWithEqual = refresh.substr(refresh.length - 1);
      if (tokenWithEqual != '=') {
        newToken_ = newToken_ + '='
      }


      this.authenticationServie
        .refreshAccessToken(newToken_)
        .pipe(
          finalize(() => {

            // this.isRefreshingToken.next(false);
          })
        )
        .subscribe(
          (res) => {

            console.log(res);

          },
          (err) => {
            this.cookieService.deleteAll('/', '.heatfleet.com');
            this.cookieService.deleteAll('/', 'heatfleet.com');
            console.log("Error:", err);

          }
        );

      // this.authenticationServie
      // .refreshAccessToken(newToken_);

    }

  }

  private getCity(): void {
    // commented_v
    // const cart = this.cookieHelper.getCart();
    // if (cart == null) {
    //   return;
    // }
    // this.City = cart.address;
    // this.CityShort = cart.city;
  }

  public logoClicked(event: any): void {
    event.preventDefault();
    this.config.typeURL = 'heating_oil/';
    this.config.onlyLanding = true;
    this.config.typeComp = 'type=1';
    this.config.typeParam = 'type=1';


    this.router.navigate(['']);
  }

  public menuClicked(goTo: string): void {
    //debugger;
    // commented_v
    // this.navCtrl.navigateRoot([goTo]);
  }

  public onLogout(): void {
    // commented_v

    this.cookieService.deleteAll('/', '.heatfleet.com');
    this.cookieService.deleteAll('/', 'heatfleet.com');
    this.authenticationServie.Logout();
    this.config.islogin = true;
    this.config.login = false;
    this.config.IsLoggedIn = false;
    this.config.storageRemove('delivery_address');
    this.config.storageRemove('username');

    this.config.delivery_address = undefined;
    this.config.EnableLoggedInUser = false;
    this.config.storageRemove('delivery_address');

    this.onLogin();

  }

  public onLogin(): void {

    this.config.navigate(URLS.LOGIN)
  }

  public onAccount(): void {
    this.window.open(environment.secure_url + URLS.CLIENT_ACCOUNT, '_self');
    // commented_v
    // this.menuClicked(URLS.CLIENT_ACCOUNT);
  }

  public onOrders(): void {
    this.window.open(environment.secure_url + URLS.CLIENT_ORDERS, '_self');
    // commented_v
    // this.menuClicked(URLS.CLIENT_ORDERS);
  }
  public onSignIn(): void {
    // commented_v
    // this.menuClicked(URLS.LOGIN);
  }

  // public async onShowMenu(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: MenuComponent,
  //     event: ev,
  //     componentProps: { page: this },
  //     cssClass: 'popover_menu',
  //   });
  //   return await popover.present();
  // }
  // public async onShowSignedOutMenu(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: MenuLoggedoutComponent,
  //     event: ev,
  //     componentProps: { page: this },
  //     cssClass: 'popover_menu',
  //   });
  //   return await popover.present();
  // }

  public onHome(): void {
    // commented_v
    // this.navCtrl.navigateRoot([URLS.CLIENT_HOME]);
  }

  private getUrl() {
    // commented_v
    // return `${environment.vendor_url}` + '#/sign-up';
  }

  private getUrl_login() {
    // commented_v
    // return `${environment.vendor_url}`;
  }

  navigateToItem(n: any) {
    if (n == 'loginvendor') {
      let url: any = this.getUrl_login();
      this.window.open(url, '_blank');
    }

    if (n == 'list') {
      let url: any = this.getUrl();
      this.window.open(url, '_blank');
    }
  }

  navigateTo(event: any, n: any) {
    event.preventDefault();
    if (n == 'about') {
      // commented_v
      // if (this.aboutUsUrl) {
      // this.window.open(this.aboutUsUrl, '_blank');
      //   return;
      // }
      this.router.navigate([URLS.PAGE_ABOUT_US]);
    }
    if (n == 'list') {
      let url: any = this.getUrl();
      // commented_v
      this.window.open(url, '_blank');
    }
    if (n == 'contact') {
      // commented_v
      // if (this.contactUrl) {
      // this.window.open(this.contactUrl, '_blank');
      //   return;
      // }
      this.router.navigate([URLS.PAGE_CONTACT]);
    }
    if (n == 'loginvendor') {
      let url: any = this.getUrl_login();
      this.window.open(url, '_blank');
    }

    if (n == 'login') {
      this.onLogin();
    }

    if (n == 'vendorequestinfo') {
      let url: any = this.getUrl();
      this.window.open(url, '_blank');
    }

    if (n == 'loginvendor') {
      let url: any = this.getUrl_login();
      this.window.open(url, '_blank');
    }

    if (n == 'faqs') {
      this.router.navigate([URLS.PAGE_FAQS]);
    }
    if (n == 'heatfleet') {
      this.window.open('https://heatfleet.com/', '_blank');
    }
  }

  loginMenuPopup() {
    if (this.config.login == false) {
      this.config.noClick = true;
    } else {
      this.config.noClick = false;
    }

    setTimeout(() => {
      this.config.login = !this.config.login;
    }, 300);
  }

  dealerMenuPopup() {
    if (this.config.dealer == false) {
      this.config.noClick = true;
    } else {
      this.config.noClick = false;
    }

    setTimeout(() => {
      this.config.dealer = !this.config.dealer;
    }, 300);
  }

  isloginMenuPopup() {

    console.log("Q");

    if (this.config.islogin == false) {
      this.config.noClick = true;
    } else {
      this.config.noClick = false;
    }

    setTimeout(() => {
      this.config.islogin = !this.config.islogin;
      this.config.login = !this.config.login;
    }, 300);
  }

  TypeChange(event: any, n: any, fig: any) {
    if (n == '1') {
      if (!fig) {
        return 'heating_oil.html';
      }
      this.config.typeURL = 'heating_oil/';

      this.config.typeComp = 'type=1';
      this.config.typeParam = 'type=1';
      console.log(event);
      // if (event && event.preventDefault){
      event.preventDefault();
      // }

      this.router.navigate(['heating_oil.html']);
    }
    if (n == 'subType1') {
      if (!fig) {
        return 'oil_companies.html';
      }
      this.config.typeURL = 'oil_companies/';
      this.config.typeCategory = 'type=1';
      this.config.typeParam = 'subType=1';
      this.headerInit.emit('subType1');
      event.preventDefault();
      this.router.navigate(['oil_companies.html']);
    }
    if (n == 'subType2') {
      if (!fig) {
        return 'heating_oil_prices.html';
      }

      this.config.typeURL = 'heating_oil_prices/';
      this.config.typeCategory = 'type=1';
      this.config.typeParam = 'subType=2';
      this.headerInit.emit('subType2');
      event.preventDefault();
      this.router.navigate(['heating_oil_prices.html']);
    }
    if (n == 'subType3') {
      if (!fig) {
        return 'oil_delivery.html';
      }
      this.config.typeURL = 'oil_delivery/';
      this.config.typeCategory = 'type=1';
      this.config.typeParam = 'subType=3';
      this.headerInit.emit('subType3');
      event.preventDefault();
      this.router.navigate(['oil_delivery.html']);
    }
    return 'heating_oil.html';
  }
  // TypeChange(event:any, n:any, fig:any) {
  //   if (n == '1') {
  //     if (!fig) {
  //       return 'heating_oil.html';
  //     }
  //     this.config.typeURL = 'heating_oil/';

  //     this.config.typeComp = 'type=1';
  //     this.config.typeParam = 'type=1';
  //     event.preventDefault();
  //     this.router.navigate(['heating_oil.html']);
  //   }
  //   if (n == '2') {
  //     this.config.typeURL = 'repair';
  //     this.config.typeComp = 'type=2';
  //     this.config.typeParam = 'type=2';
  //     this.headerInit.emit('oil');
  //   }
  //   if (n == 'subType1') {
  //     if (!fig) {
  //       return 'oil_companies.html';
  //     }
  //     this.config.typeURL = 'oil_companies/';
  //     this.config.typeCategory = 'type=1';
  //     this.config.typeParam = 'subType=1';
  //     this.headerInit.emit('subType1');
  //     event.preventDefault();
  //     this.router.navigate(['oil_companies.html']);
  //   }
  //   if (n == 'subType2') {
  //     if (!fig) {
  //       return 'heating_oil_prices.html';
  //     }

  //     this.config.typeURL = 'heating_oil_prices/';
  //     this.config.typeCategory = 'type=1';
  //     this.config.typeParam = 'subType=2';
  //     this.headerInit.emit('subType2');
  //     event.preventDefault();
  //     this.router.navigate(['heating_oil_prices.html']);
  //   }
  //   if (n == 'subType3') {
  //     if (!fig) {
  //       return 'oil_delivery.html';
  //     }
  //     this.config.typeURL = 'oil_delivery/';
  //     this.config.typeCategory = 'type=1';
  //     this.config.typeParam = 'subType=3';
  //     this.headerInit.emit('subType3');
  //     event.preventDefault();
  //     this.router.navigate(['oil_delivery.html']);
  //   }
  // }
}
