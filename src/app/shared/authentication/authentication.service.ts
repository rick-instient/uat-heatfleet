import { Inject, Injectable } from "@angular/core";
// import { Platform } from "@ionic/angular";
import { BehaviorSubject, observable, Observable } from "rxjs";
import { ApiService, LoginResponse, RegisterResponse } from "../api";
import { environment } from "src/environments/environment";
// import { CookieService } from "ngx-cookie-service";
import { Cookie } from "../models/cookies.model";
import { NetworkService } from "../api/network.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";
// import { CookieHelper } from "../cookie-helper";
import {
  ActivateUserResponse,
  ForgetPasswordResponse,
  RegisterVendor,
  RegisterVendorResponse,
  ResetPasswordResponse,
  UserDataResponse,
} from "../models/client.model";
import { CustomerTaxType } from "../models/types";
import { tap } from "rxjs/operators";
import { CommonService } from "../services/common.config";
import { DOCUMENT } from "@angular/common";

const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private api: ApiService,
    public config: CommonService,
    // private plt: Platform,
    // private cookieService: CookieService,
    private http: NetworkService,
    @Inject(DOCUMENT) private document: Document,
    // private cookieHelper: CookieHelper
  ) {
    // this.plt.ready().then(() => {
    //     this.checkToken();
    // });

    // Done to check platform error

    this.checkToken();
  }

  public checkToken() {
    // commented_v
    // environment.token = this.config.getAuthToken();
  }

  public loginCall(email: string, password: string): Observable<LoginResponse> {
    const url = `authenticate/login?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = { username: email, password: password };

    return this.http.post<any>(url, data, { headers, observe: "body" });
  }

  public loginCallWithOTP(
    email: string,
    password: string
  ): Observable<LoginResponse> {
    const url = `Authenticate/login-with-otp?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = { username: email, password: password };

    return this.http.post<any>(url, data, { headers, observe: "body" });
  }

  public signInVerificationLink(email: string) {
    const url = `Authenticate/login-with-email?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = { Email: email };

    return this.http.post<any>(url, data, { headers, observe: "body" });
  }

  public CheckAutoPassword(email: string) {
    const url = `Authenticate/check-auto-password?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = { Email: email };

    return this.http.post<any>(url, data, { headers, observe: "body" });
  }

  public Login(email: string, password: string): Observable<LoginResponse> {
    return this.loginCall(email, password).pipe(
      tap((res) => {
        // commented_v
        // this.cookieHelper.processLoginResponse(res);
      })
    );
  }

  public LoginwithOTP(
    email: string,
    password: string
  ): Observable<LoginResponse> {
    return this.loginCallWithOTP(email, password).pipe(
      tap((res) => {
        // commented_v
        // this.cookieHelper.processLoginResponse(res);
      })
    );
  }

  public GetPage5CompaniesInfo(url: string, data) {
    const headers = this.getHeader();

    return this.http.post<any>(url, data, { headers, observe: "body" });
  }

  public registerCustomer(
    email: string,
    password: string,
    phoneNumber: string,
    backupPhoneNumber: string,
    firstName: string,
    lastName: string,
    customerTaxType: CustomerTaxType,
    deliveryStreet1: string,
    deliveryStreet2: string,
    deliveryCity: string,
    deliveryState: string,
    deliveryZIP: string,
    deliveryCounty: string,
    deliveryFips: string,
    DeliveryNickName: string,
    CustomerTaxType: string,
    base64: string,
    oilTaxexempt: any,
    isAutoPassword: any
  ): Observable<RegisterResponse> {
    const url = `Authenticate/register/customer?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = {
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      backupPhoneNumber: backupPhoneNumber,
      firstName: firstName,
      lastName: lastName,
      customerTaxType: customerTaxType,
      deliveryStreet1: deliveryStreet1,
      deliveryStreet2: deliveryStreet2,
      deliveryCity: deliveryCity,
      deliveryState: deliveryState,
      deliveryZIP: deliveryZIP,
      deliveryCounty: deliveryCounty,
      deliveryFips: deliveryFips,
      DeliveryNickName: DeliveryNickName,
      CustomerTaxType: CustomerTaxType,
      base64: base64,
      oilTaxexempt: oilTaxexempt,
      AutoPassword: isAutoPassword,
    };

    return this.http.post<any>(url, data, { headers, observe: "body" });
  }
  
  private getHeader2(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "DAVOS-IsMobile": environment.isMobile.toString(),
      'X-Api-Key': `${environment.api_key}`,
      Authorization: 'Bearer ' +  this.config.getCookie('NewToken2'),
    });
  }


  public refreshAccessToken(refreshToken: string): Observable<LoginResponse> {
    const url = `authenticate/refresh-token?api-version=${environment.api_version}`;
    const headers = this.getHeader2();
    let data = {
      RefreshToken: refreshToken,
    };
    return this.http.post<any>(url, data, { headers, observe: "body" }).pipe(
      tap((res) => {
        this.config.IsLoggedIn = true;

        // this.config.replaceCookie('NEWGEN', res.refreshToken, 'expires=Sat, 31 Dec 2023 23:59:59 GMT');
        // this.config.replaceCookie('NewToken2', res.token, 'expires=Sat, 31 Dec 2023 23:59:59 GMT');

        
        this.document.cookie = "NEWGEN="+res.refreshToken+"; Domain=.heatfleet.com; Path=/";
        this.document.cookie = "NewToken2="+res.token+"; Domain=.heatfleet.com; Path=/";
  

      })
    );
  }

  public Logout(): void {
    this.config.removeAllCookies();
    // commented_v
    // if(this.cookieHelper){
    //   this.cookieHelper.clear();
    // }
  }

  public sendForgetPassword(email: string): Observable<ForgetPasswordResponse> {
    const url = `authenticate/forgetpassword`;
    const headers = this.getHeader2();
    const body = {
      Email: email,
    };

    return this.http.post(url, body, { headers });
  }

  public resetPassword(
    email: string,
    code: string,
    password: string
  ): Observable<ResetPasswordResponse> {
    const url = `authenticate/resetpassword`;
    const headers = this.getHeader();
    const body = {
      Email: email,
      Code: code,
      Password: password,
    };

    return this.http.post(url, body, { headers });
  }

  public activateUser(
    email: string,
    code: string
  ): Observable<ActivateUserResponse> {
    const url = `authenticate/register/confirmemail`;
    const headers = this.getHeader();
    const body = {
      Email: email,
      Code: code,
    };
    return this.http.post(url, body, { headers });
  }

  public confirmPrivacy(): Observable<any> {
    const url = `account/privacy/confirm`;
    const headers = this.getHeader();

    return this.http.post(url, null, { headers });
  }

  public registerVendor(
    data: RegisterVendor
  ): Observable<RegisterVendorResponse> {
    const url = `authenticate/register/vendor`;
    const headers = this.getHeader();

    return this.http.post(url, data, { headers });
  }

  public getUserProfileData() {
    // commented_v
    // const url = `account/userdata?userId=${this.cookieHelper.getUserId()}`;
    // const headers = this.getHeader();
    // return this.http.get(url, { headers });
  }

  public changeUserData(data: UserDataResponse): Observable<UserDataResponse> {
    const url = `account/userdata`;
    const headers = this.getHeader();
    return this.http.put(url, data, { headers });
  }
  public changePassword(
    password: string,
    oldPassword: string
  ){
    const url = `account/changepassword`;
    const headers = this.getHeader();
    // commented_v
    // const data = {
    //   id: this.cookieHelper.getUserId(),
    //   oldPassword: oldPassword,
    //   password: password,
    // };
    // return this.http.put(url, data, { headers });
  }

  public isAuthenticated() {
    return true
    // commented_v
    // return this.cookieHelper.check(
    //   this.cookieHelper.getCookieName(Cookie.AUTH_TOKEN)
    // );
    //return this.cookieService.check(this.cookieHelper.getCookieName(Cookie.AUTH_TOKEN));
  }

  public isPrivacyConfirmed() {
    // commented_v
    // return this.cookieHelper.isPrivacyConfirmed();
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "DAVOS-IsMobile": environment.isMobile.toString(),
    });
  }
}
