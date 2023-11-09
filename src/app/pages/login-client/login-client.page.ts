import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import { Storage } from '@ionic/storage-angular';
import { CommonService } from 'src/app/shared/services/common.config'; 
// import { WINDOW } from 'src/app/shared/services/window.service';
import { environment } from 'src/environments/environment';
// import { CookieService } from 'ngx-cookie-service';

// import { CookieHelper, EventBus } from 'src/app/shared/helper';
import { URLS } from 'src/app/shared/urls';
import { LoginResponse } from 'src/app/shared/api'; 
import { ClientApiService } from 'src/app/shared/api/client.service'; 
// import { FrequentlyUsedService } from 'src/app/shared/api/frequently-used.service'; 
// import { AuthenticationService } from 'src/app/shared/authentication/authentication.service'; 
// import { LoginComponent } from 'src/shared/components/login/login.component';
// import { ConstructorParams } from 'src/app/shared/helper'; 
// import { Cart } from 'src/app/shared/models/general.model'; 
import { Title, Meta } from '@angular/platform-browser';
import { ToastService } from 'src/app/shared/services/toast.service';
// import { isPlatformServer } from '@angular/common';
export interface CustomWindow extends Window {

  customProperty: boolean;
}


@Component({
  selector: 'login-client-page',
  templateUrl: './login-client.page.html',
  styleUrls: ['./login-client.page.sass'],
})
// export class LoginClientPage extends LoginComponent implements OnInit {
export class LoginClientPage implements OnInit {
  modalView = false;
  Error:any;
  public userRole = '';
  private window: CustomWindow;
  @ViewChild('hideShow') hideShow: ElementRef;
  loginStepEmail = true;
  loginStepPassword = false;
  invalidEmail = false;
  emailSent = false;
  onlyVerificaionLink = false;
  email_not_exists = false;
  email_entered: any;
  enteredOTP: any;
  OTP_entered = false;
  errorDialog = false;
  email:any
  showPassChecked_signin = false;
  ViewToast = false;
  
  login = {
    username:'',
    password:''
  }
  wrongPassword : boolean = false;
  constructor(
    public clientApiService: ClientApiService,
    // public modalController: ModalController,
    // toastController: ToastController,
    router: Router,
    // public navController: NavController,
    public activatedRoute: ActivatedRoute,
    public authService: ClientApiService,
    // public eventBus: EventBus,
    // public cookieHelper: CookieHelper,
    public config: CommonService,
    // private storage: Storage,
    public fb: FormBuilder,
    // @Inject(WINDOW) public window: Window,
    @Inject(DOCUMENT) private document: Document,

    private title: Title,
    private meta: Meta,
    private toastService: ToastService
    // @Inject(PLATFORM_ID) private platformId: Object,
    // private cookieService: CookieService
  ) {
    this.window = <any>this.document.defaultView;
    // super(
    //   ConstructorParams.Create().with(
    //     eventBus,
    //     // modalController,
    //     router,
    //     authService,
    //     activatedRoute,
    //     // navController,
    //     // toastController
    //   ),
    //   cookieHelper,
    //   fb,
    //   router,
    //   config
    // );
    let title_ =
      'Login | BEST Heating Oil Prices | Search 500+ Companies | Heat Fleet';
    this.title.setTitle(title_);

    this.meta.updateTag({
      name: 'description',
      content: 'Heat Fleet Login Page',
    });

    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:title', content: title_ });
    // this.meta.addTag({ property: 'og:url', content: this.router.url });
    this.meta.addTag({
      property: 'og:image',
      content:
        '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
    });

    if (!environment.production) {
      this.meta.updateTag({
        name: 'robots',
        content: 'noindex, nofollow',
      });
    } else {
      this.meta.updateTag({
        name: 'robots',
        content: 'all',
      });
    }

    // this.IsAuthenticatedRoute = URLS.CLIENT_ORDERS;
  }

  ionViewWillEnter() {
    this.email_not_exists = false;
    this.loginStepEmail = true;
    this.loginStepPassword = false;
    this.invalidEmail = false;
    this.emailSent = false;
  }

  public ngOnInit(): void {
    // this.config.updateCanonicalUrl('https://heatfleet.com' + this.router.url);
    // this.OnInit();

    let schema = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: 'Login | BEST Heating Oil Prices | Search 500+ Companies | Heat Fleet',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: 'Heat Fleet Login Page',
      },
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'WebSite',
        name: 'Login | BEST Heating Oil Prices | Search 500+ Companies | Heat Fleet',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
      },
    ];

    this.config.insertSchema(schema, 'structured-data-org');
  }
  ionViewDidEnter() {}

  public onAfterLoggedIn(response: LoginResponse): void {


    if (response.role == 'Client') {
      this.config.isVendor = false;
      let quantityInput = 100;



      let path_ = environment.secure_url;

      this.document.cookie = "NEWGEN="+response.refreshToken+"; Domain=.heatfleet.com; Path=/";
      this.document.cookie = "NewToken2="+response.token+"; Domain=.heatfleet.com; Path=/";


      // this.config.storageSave('NewToken', response.refreshToken);
      this.config.IsLoggedIn = true;
      let url =path_ +"oil-select-provider/01568/"+0+"/0"+"/4"+"/"+quantityInput
      this.window.open(url, "_self");

      // this.deliveryAddress();
    } else {                                        
      this.config.isVendor = true;
    }
  }
  getScreenSize() {
    var screenWidth = this.window.innerWidth;

    if (screenWidth < 600) {
      const showPassword = this.document.getElementById('hideShow');

      this.showPassChecked_signin = true;

      this.showPassword(showPassword);
    } else {
      this.showPassChecked_signin = false;
    }
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';

    if (input.type === 'text') {
      this.showPassChecked_signin = true;
    } else {
      this.showPassChecked_signin = false;
    }
  }

  deliveryAddress() {
    // commented_v
    const userid:any = 2;
    // const userid = this.cookieHelper.getUserId();
    this.clientApiService.getDeliveryAddress(userid).subscribe(
      (res: any) => {
        var newArray = res.map((o) => {
          return {
            deliveryNickName: o.deliveryNickName,
            deliveryStreet1: o.deliveryStreet1,
            deliveryStreet2: o.deliveryStreet2,
            deliveryCity: o.deliveryCity,
            deliveryState: o.deliveryState,
            deliveryCounty: o.deliveryCounty,
            deliveryFIPS: o.deliveryFIPS,
            deliveryZIP: o.deliveryZIP,
            id: o.id,
          };
        });

        this.config.storageSave('delivery_address', newArray);

        // const cart: Cart = FrequentlyUsedService.getCart();
        // cart.state = res[0].deliveryState;
        // cart.zipCode = res[0].deliveryZIP;
        // cart.city = res[0].deliveryCity;
        // // this.cart.orderType = 4;
        // cart.address = `${res[0].deliveryStreet1}`;
        // commented_v
        // this.cookieHelper.setCart(cart);

        var qty = '100';
        // this.addNavigationHistoryItem('quantityEntered', JSON.stringify(qty));
        // this.addNavigationHistoryItem('home', `${qty} gal`);

        // this.addNavigationHistoryItem('AddressInput', res[0].deliveryStreet1);
        // this.addNavigationHistoryItem('AddressInput_Id', res[0].id);

        // this.navController.navigateRoot([
        //   this.URLS.CLIENT_SELECT_OIL_PROVIDER,
        //   res[0].deliveryZIP,
        //   0,
        //   this.customerType,
        //   this.cart.orderType,
        //   qty,
        // ]);
      },
      (error: HttpErrorResponse) => {
        // return this.HandleApiError(error);
      }
    );
  }

  public signInVerificationLink(): void {
    const res = this.clientApiService.sendOtpToEmail(this.login.username);
    res.subscribe(
      (response) => {
        if (response.body.userName) {
          this.presentToast('OTP Sent.', 'successtoast');
          this.loginStepEmail = false;
          this.loginStepPassword = false;
          this.emailSent = true;
          this.onlyVerificaionLink = false;
        }
      },
      (error: HttpErrorResponse) => {
        // this.loginError = true;
        this.presentToast('Email doesnot exists.', 'error');
        this.loginStepEmail = true;
        this.loginStepPassword = false;
        return;
      }
    );
  }

  OtpEntered(n) {
    this.enteredOTP = n;

    if (this.enteredOTP.length == 5) {
      this.OTP_entered = true;
    } else {
      this.OTP_entered = false;
    }
  }


  public CheckAutoPassword(): void {
    if (this.login.username.length <= 3) {
      this.invalidEmail = true;
      return;
    }

    const PURE_EMAIL_REGEXP =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!PURE_EMAIL_REGEXP.test(this.login.username)) {
      this.invalidEmail = true;
      return;
    } else {
      this.invalidEmail = false;
    }

    this.clientApiService.CheckAutoPassword(this.login.username).subscribe(
      (response) => {
        this.email_not_exists = false;
        if (response == false) {
          this.loginStepEmail = false;
          this.loginStepPassword = true;
          this.onlyVerificaionLink = false;

          setTimeout(() => {
            this.getScreenSize();
          }, 300);
        }
        if (response == true) {
          this.signInVerificationLink();
        }
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.wrongPassword = true;
          this.email_entered = this.login.username;
          this.email_not_exists = true;
      
          // this.ShowMiddleErrorToast('Email doesnot exists', 1000);
          this.presentToast('Email doesnot exists', 'error');
          this.loginStepEmail = true;
          this.loginStepPassword = false;
          return;
        }
        // this.ShowErrorToast(`Error:${err.message}`);
      }
    );
  }

  backSignIn() {
    // this.login.username = '';
    this.loginStepEmail = true;
    this.loginStepPassword = false;
    this.emailSent = false;
    this.onlyVerificaionLink = false;
  }

  backNav() {
    this.loginStepEmail = true;
    this.loginStepPassword = false;
    this.emailSent = false;
    this.onlyVerificaionLink = false;
  }

  confirmOTP() {
// console.log("isPlatformServer(this.platformId)", isPlatformServer(this.platformId));

    // if (isPlatformServer(this.platformId)) {
    //   console.log("IF");
      
      
    // } else {
      this.authService
      .LoginwithOTP(this.login.username, this.enteredOTP)
      .subscribe(
        (res) => {
          setTimeout(() => {
            this.config.IsLoggedIn = true;

            this.onAfterLoggedIn(res);

            // if (res.token) {
            //   this.deliveryAddress();
            // }
          }, 100);
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401) {
            this.errorDialog = true;
            // this.ShowError('Incorrect OTP entered.');
            return;
          }
          // this.ShowErrorToast(`Error:${err.message}`);
        }
      );
    // }
 
  }



  async presentToast(m, style) {

    this.ViewToast = true;

    console.log("Toaster");
    
      this.toastService.showToast(m);
 

    // const toast = await this.toastController.create({
    //   message: m,
    //   duration: 2000,
    //   cssClass: style,
    // });
    // toast.present();
  }

  dismiss() {
    this.errorDialog = false;
  }
  submitted =false;
  public onLogin(): void {
    this.submitted = true;
    // if (!form.valid) {
    //   return;
    // }

    this.clientApiService
      .Login(this.login.username, this.login.password)
      .subscribe(
        (response) => {
          // this.loginError = false;
          setTimeout(() => {
            // || this.userRole == ROLES.OWNER
            if (response.privacyConfirmed) {
              this.config.storageSave(this.login.username, 'username');
              this.onAfterLoggedIn(response);
              // this.router.navigate([this.IsAuthenticatedRoute]);
            } else {
              // if (this.cookieHelper) {
              //   this.cookieHelper.clear();
              // }
              // this.ShowError(
              //   'The owner must accept the Terms & Privacy first!'
              // );
            }
          }, 100);
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401) {
            // this.loginError = true;
            this.ShowError('Incorrect username or password');
            // this.presentToast('Incorrect username or password', 'error');
            // this.ShowMiddleErrorToast('Incorrect username or password', 1000);
            return;
          }
          // this.ShowErrorToast(`Error:${err.message}`);
        }
      );
  }

  
  ShowError(n){
    this.Error = n;
  
     this.modalView = true;
      // this..className = 'modal fade show';
      
    }
  

    public onForgotPw(): void {
      this.config.email_entered = this.login.username;
      this.config.navigate(URLS.FORGET_PWD);
    }

   

  closeModel() {
    this.modalView = false;
  }

}
