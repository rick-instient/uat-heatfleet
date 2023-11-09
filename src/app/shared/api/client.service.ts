import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NetworkService, NWResult } from './network.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
// import { CookieHelper } from 'src/app/shared/helper/cookie-helper';
import {
  DeliveryWindowResponse,
  HomeDataResponse,
  ZipCodeCheckResponse,
  OilProvidersResponse,
  ServiceProvidersResponse,
  TankSizesResponse,
  OilProvider,
  OilProviderResponse,
  FlashSaleActiveResponse,
} from '../models/client.model';
import {
  BillingAddressResponse,
  Cart,
  CompanyDetailsResponse,
  CustomerSettingsResponse,
  CustomerTaxType,
  DeliveryAddressResponse,
  DeliveryDetailsResponse,
  OrderDetailsResponse,
  OrderStatusResponse,
  PlaceOrderResponse,
  ServiceDetailsResponse,
} from '../models/general.model';
import { environment } from 'src/environments/environment';

import {
  ActivateUserResponse,
  ForgetPasswordResponse,
  RegisterVendor,
  RegisterVendorResponse,
  ResetPasswordResponse,
  UserDataResponse,
} from 'src/app/shared/models/client.model';
import { Cookie } from 'src/app/shared//models/cookies.model';
import {
  ApiService,
  LoginResponse,
  RegisterResponse,
} from 'src/app/shared/api/index';
import { pairwise, tap, catchError } from 'rxjs/operators';
import { CommonService } from '../services/common.config';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';

@Injectable({ providedIn: 'root' })
export class ClientApiService {
  IsDealAvailable = false;
  defaultDate: any;

  constructor(
    private http: NetworkService,
    public http2: HttpClient,
    // private cookieHelper: CookieHelper,
    public config: CommonService,
    private handler: HttpBackend
  ) {
    this.http2 = new HttpClient(this.handler);
  }

  protected getHttpOptions(withoutToken: boolean = false) {
    const token = environment.token;
    return {
      headers: new HttpHeaders({
        'X-Api-Key': `${environment.api_key}`,
        'DAVOS-IsMobile': environment.isMobile.toString(),
        // Authorization: token,
      }),
    };
  }

  //ZONES
  public checkZipCode(
    zip: string,
    ipAddress: string
  ): NWResult<ZipCodeCheckResponse> {

    const url = `customer/offer/zipcodecheck?zipCode=${zip}&ipAddress=${ipAddress}&isAgent=${this.config.isAgent}`;
    const res = this.http.getRes<any>(url,this.getHttpOptions());
    return res;
  }

  public getProviderById(companyId: string, zip: string, amount: any) {

    const headers = this.getHeader();


  
    const url = `customer/offer/get-provider-by-id?companyId=${companyId}&zip=${zip}&amount=${amount}`;
    const res = this.http.post<any>(url, [],{ headers, observe: 'response' });
    return res;
  }

  public searchControl(zip: string) {
    const url = `company/account/companysearch?searchstr=${zip}`;
    const res = this.http.getRes<any>(url, { params: new HttpParams() });
    return res;
  }

  public checkDeliveryZipCode(zip: string): NWResult<ZipCodeCheckResponse> {
    const url = `customer/offer/deliveryzipcodecheck?zipCode=${zip}`;
    const res = this.http.getRes<any>(url, { params: new HttpParams() });
    return res;
  }

  public getTankSizes(): Observable<TankSizesResponse> {
    const url = `customer/offer/tanksize`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  public getTownProfile(url) {
    return this.http2.get<any>(url, { params: new HttpParams() });
  }

  public getCompanyProfile(url, data) {
    return this.http2.post<any>(url, data);
  }

  public subscribeForZipNotification(
    zip: string,
    email: string
  ): Observable<HttpResponse<any>> {
    const url = `customer/offer/notify-zip`;
    const headers = this.getHeader();

    const body = {
      zipCode: zip,
      email: email,
      newsletterType: 0,
    };

    return this.http.post(url, body, { headers, observe: 'response' });
  }

  public sendOtpToEmail(email: string): Observable<HttpResponse<any>> {
    const url = `Authenticate/send-otp?api-version=1.0`;
    const headers = this.getHeader();

    const body = {
      Email: email,
    };

    return this.http.post(url, body, { headers, observe: 'response' });
  }

  public CheckAutoPassword(email: string) {
    const url = `Authenticate/check-auto-password?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = { Email: email };

    return this.http.post<any>(url, data, { headers, observe: 'body' });
  }

  public getHomeData(
    zip: string,
    type: CustomerTaxType,
    amount: number,
    userId: number
  ): Observable<HomeDataResponse> {
    const url = `customer/offer/home-page`;
    const headers = this.getHeader();
    const body = {
      zipCode: zip,
      type: type,
      userId: userId,
      amount: Math.round(amount),
    };

    return this.http.post(url, body, { headers });
  }

  //DELIVERY WINDOW
  public getDeliveryWindowOil(
    zip: string,
    amount: number
  ): Observable<DeliveryWindowResponse> {
    const url = `customer/offer/get-deliverywindow-oil`;
    const headers = this.getHeader();
    const body = {
      zip: zip,
      amount: amount,
    };

    return this.http.post(url, body, { headers });
  }

  public getDeliveryWindowService(
    zip: string,
    type: number,
    amount: number
  ): Observable<DeliveryWindowResponse> {
    const url = `customer/offer/get-deliverywindow-service`;
    const headers = this.getHeader();
    const body = {
      zip: zip,
      serviceType: type,
      amount: amount,
    };

    return this.http.post(url, body, { headers });
  }

  //PROVIDERS
  public getOilProviders(
    zip: string,
    orderType: number,
    amount: number,
    ipAddress: string
    // day: string,
    // payWithCash: boolean
  ): Observable<OilProvidersResponse> {
    const url = `customer/offer/get-providers-oil`;
    const headers = this.getHeader();
    const body = {
      zip: zip,
      amount: amount,
      orderType: orderType,
      ipAddress: ipAddress,
      isAgent: this.config.isAgent,
      // payWithCash: payWithCash,
      // day: day,
    };

    return this.http.post(url, body, { headers });
  }

  public getOilProvider(
    zip: string,
    orderType: number,
    amount: number,
    day: string,
    payWithCash: boolean,
    companyId: number,
    isFlashSale: boolean
  ): Observable<OilProviderResponse> {
    const url = `customer/offer/get-provider-oil`;
    const headers = this.getHeader();
    const body = {
      zip: zip,
      amount: amount,
      orderType: orderType,
      payWithCash: payWithCash,
      day: day,
      companyId: companyId,
      isFlashSale: isFlashSale,
    };

    return this.http.post(url, body, { headers });
  }

  public isFlashSaleActive(
    zip: string,
    orderType: number,
    amount: number,
    day: string,
    payWithCash: boolean,
    companyId: number,
    isFlashSale: boolean
  ): Observable<FlashSaleActiveResponse> {
    const url = `customer/offer/flashsale-active`;
    const headers = this.getHeader();
    const body = {
      zip: zip,
      amount: amount,
      orderType: orderType,
      payWithCash: payWithCash,
      day: day,
      companyId: companyId,
      isFlashSale: isFlashSale,
    };

    return this.http.post(url, body, { headers });
  }

  public getServiceProvider(
    zip: string,
    type: number,
    day: string
  ): Observable<ServiceProvidersResponse> {
    const url = `customer/offer/get-providers-service`;
    const headers = this.getHeader();
    const body = {
      zip: zip,
      orderType: type,
      day: day,
    };

    return this.http.post(url, body, { headers });
  }

  public getCompanyDetails(
    companyId: number
  ): Observable<CompanyDetailsResponse> {
    const url = `customer/offer/get-companydetails?companyId=${companyId}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public getServiceDetails(
    serviceId: number,
    companyId: number
  ): Observable<ServiceDetailsResponse> {
    const url = `customer/offer/get-servicedetails?companyId=${companyId}&serviceId=${serviceId}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }
  //Delivery address
  public getDeliveryAddress(
    userId: string
  ): Observable<DeliveryAddressResponse> {
    const url = `customer/order/delivery-address?userId=${userId}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public updateDeliveryAddress(
    userId: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zip: string,
    county: string,
    fips: string,
    CustomerTaxType: string,
    DeliveryNickName: string,
    id: string,
    BillingAddressSameAsDeliveryAddress: string,
    oilTaxexempt: boolean,
    base64: string
  ): Observable<DeliveryAddressResponse> {
    if (
      BillingAddressSameAsDeliveryAddress ==
      'BillingAddressSameAsDeliveryAddress'
    ) {
      var val_ = true;
    } else {
      var val_ = false;
    }
    const url = `customer/order/delivery-address`;
    const headers = this.getHeader();
    const body = {
      userId: userId,
      deliveryStreet1: street1,
      deliveryStreet2: street2,
      deliveryCity: city,
      deliveryState: state,
      deliveryZIP: zip,
      deliveryCounty: county,
      deliveryFips: fips,
      CustomerTaxType: CustomerTaxType,
      DeliveryNickName: DeliveryNickName,
      id: id,
      BillingAddressSameAsDeliveryAddress: val_,
      oilTaxexempt: oilTaxexempt,
      base64: base64,
    };

    return this.http.put(url, body, { headers });
  }

  //Billig address
  public getBillingAddress(userId: string): Observable<BillingAddressResponse> {
    const url = `customer/order/billing-address?userId=${userId}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public updateBillingAddress(
    userId: string,
    addressSameAsDelivery: boolean,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zip: string,
    county: string,
    fips: string,
    id: string
  ): Observable<DeliveryAddressResponse> {
    const url = `customer/order/billing-address`;
    const headers = this.getHeader();
    let body = {};
    if (addressSameAsDelivery) {
      body = {
        userId: userId,
        billingAddressSameAsDeliveryAddress: true,
      };
    } else {
      body = {
        userId: userId,
        billingAddressSameAsDeliveryAddress: false,
        billingStreet1: street1,
        billingStreet2: street2,
        billingCity: city,
        billingState: state,
        billingZIP: zip,
        billingCounty: county,
        billingFips: fips,
        id: id,
        DeliveryId: id,
      };
    }

    return this.http.put(url, body, { headers });
  }

  //Delivery details
  public getDeliveryDetails(
    deliveryId: string
  ): Observable<DeliveryDetailsResponse> {
    const url = `customer/order/delivery-details?deliveryId=${deliveryId}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public updateDeliveryDetails(
    deliveryId: string,
    userId: string,
    fillLocationDescription: string,
    houseDescription: string,
    tankPosition: number,
    tankLocation: number,
    propertyArea: number,
    termostatTemperature: number,
    tankSize: number
  ): Observable<DeliveryDetailsResponse> {
    const url = `customer/order/delivery-details`;
    const headers = this.getHeader();
    const body = {
      Id: deliveryId,
      userId: userId,
      fillLocationDescription: fillLocationDescription,
      houseDescription: houseDescription,
      tankPosition: tankPosition,
      tankLocation: tankLocation,
      tankSize: tankSize,
      propertyArea: propertyArea,
      termostatTemperature: termostatTemperature,
    };

    return this.http.put(url, body, { headers });
  }

  public deleteDeliveryAddress(
    userId: string,
    id: string
  ): Observable<DeliveryDetailsResponse> {
    const url = `customer/order/delete-address`;
    const headers = this.getHeader();
    const body = {
      userId: userId,
      id: id,
    };

    return this.http.post(url, body, { headers });
  }
  public uploadTaxExemptDoc(
    userId: string,
    deliveryId: string,
    base64: string
  ): Observable<DeliveryDetailsResponse> {
    const url = `customer/offer/taxexemptdoc`;
    const headers = this.getHeader();
    const body = {
      userId: userId,
      deliveryId: deliveryId,
      base64: base64,
    };

    return this.http.post(url, body, { headers });
  }

  public getOrderSumary(cart: Cart): Observable<OrderDetailsResponse> {
    const url = `customer/order/summary`;
    const headers = this.getHeader();
    return this.http.post(url, cart, { headers });
  }

  public placeOrder(cart: Cart): Observable<PlaceOrderResponse> {
    const url = `customer/order/place`;
    const headers = this.getHeader();
    return this.http.post(url, cart, { headers });
  }

  public getOrderDetails(orderId: number): Observable<OrderDetailsResponse> {
    const url = `customer/order/get?orderId=${orderId}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public setOrderCanceled(
    orderId: number,
    userId: number
  ): Observable<OrderStatusResponse> {
    const url = `customer/order/cancel`;
    const headers = this.getHeader();
    const body = {
      userId: userId,
      orderId: orderId,
    };

    return this.http.put(url, body, { headers });
  }

  public setOrderConfirmed(
    orderId: number,
    userId: number
  ): Observable<OrderStatusResponse> {
    const url = `customer/order/confirm`;
    const headers = this.getHeader();
    const body = {
      userId: userId,
      orderId: orderId,
    };

    return this.http.put(url, body, { headers });
  }

  public getAllOrders(userId: number): Observable<OrderDetailsResponse[]> {
    const url = `customer/order/all?userId=${userId}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public getNearestZip(uri: string) {
    const url = `${uri}`;
    const res = this.http.getRes<any>(url, { params: new HttpParams() });
    return res;
  }

  public getCustomerSettingsData(
    userId: number
  ): Observable<CustomerSettingsResponse> {
    const url = `customer/account/settings?userId=${userId}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public saveCustomerSettings(
    data: CustomerSettingsResponse
  ): Observable<CustomerSettingsResponse> {
    const url = `customer/account/settings`;
    const headers = this.getHeader();

    return this.http.put(url, data, { headers });
  }

  // public changeZip(userId: string, zip: string): Observable<HttpResponse<any>> {
  //   const url = `customer/account/changezip`;
  //   const headers = this.getHeader();

  //   const body = {
  //     zipCode: zip,
  //     userId: userId,
  //   };

  //   return this.http.put(url, body, { headers });
  // }
  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': `${environment.api_key}`,
      'DAVOS-IsMobile': environment.isMobile.toString(),
    });
  }


  // ====================== auth

  public loginCall(email: string, password: string): Observable<LoginResponse> {
    const url = `authenticate/login?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = { username: email, password: password };

    return this.http.post<any>(url, data, { headers, observe: 'body' });
  }

  public loginCallWithOTP(
    email: string,
    password: string
  ): Observable<LoginResponse> {
    const url = `Authenticate/login-with-otp?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = { username: email, password: password };

    return this.http.post<any>(url, data, { headers, observe: 'body' });
  }

  public signInVerificationLink(email: string) {
    const url = `Authenticate/login-with-email?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    let data = { Email: email };

    return this.http.post<any>(url, data, { headers, observe: 'body' });
  }

  // public CheckAutoPassword(email: string) {
  //   const url = `Authenticate/check-auto-password?api-version=${environment.api_version}`;
  //   const headers = this.getHeader();

  //   let data = { Email: email };

  //   return this.http.post<any>(url, data, { headers, observe: "body" });
  // }

  public Login(email: string, password: string): Observable<LoginResponse> {
    return this.loginCall(email, password).pipe(
      tap((res) => {
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
        // this.cookieHelper.processLoginResponse(res);
      })
    );
  }

  public GetPage5CompaniesInfo(url: string, data) {
    const headers = this.getHeader();

    return this.http.post<any>(url, data, { headers, observe: 'body' });
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

    return this.http.post<any>(url, data, { headers, observe: 'body' });
  }

  public refreshAccessToken(refreshToken: string): Observable<LoginResponse> {
    const url = `authenticate/refresh-token?api-version=${environment.api_version}`;
    const headers = this.getHeader();
    let data = {
      RefreshToken: refreshToken,
    };
    return this.http.post<any>(url, data, { headers, observe: 'body' }).pipe(
      tap((res) => {
        // this.cookieHelper.processLoginResponse(res);
      })
    );
  }

  public Logout(): void {
    // if (this.cookieHelper) {
    // this.cookieHelper.clear();
    // }
  }

  public sendForgetPassword(email: string): Observable<ForgetPasswordResponse> {
    const url = `authenticate/forgetpassword`;
    const headers = this.getHeader();
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

  public getUserProfileData(): Observable<UserDataResponse> {
    const url = `account/userdata?userId=`;
    const headers = this.getHeader();
    return this.http.get(url, { headers });
  }

  public changeUserData(data: UserDataResponse): Observable<UserDataResponse> {
    const url = `account/userdata`;
    const headers = this.getHeader();
    return this.http.put(url, data, { headers });
  }
  public changePassword(
    password: string,
    oldPassword: string
  ): Observable<any> {
    const url = `account/changepassword`;
    const headers = this.getHeader();
    const data = {
      id: '',
      oldPassword: oldPassword,
      password: password,
    };
    return this.http.put(url, data, { headers });
  }

  public isAuthenticated() {
    // return this.cookieHelper.check(
    //   this.cookieHelper.getCookieName(Cookie.AUTH_TOKEN)
    // );
    //return this.cookieService.check(this.cookieHelper.getCookieName(Cookie.AUTH_TOKEN));
  }

  public isPrivacyConfirmed() {
    // return this.cookieHelper.isPrivacyConfirmed();
  }
}
