import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountCompanySettingsResponse, AccountPriceTiersResponse, AccountServiceResponse, AccountServicesResponse, AccountTeamDriversResponse, AccountZonesResponse, CalendarOilOrder, CalendarServiceOrder, DeliveryCalendarResponse, PricesResponse, TransactionsResponse, Truck, TruckDriversResponse, TruckEdit, TrucksResponse, TruckType, User } from '../models/general.model';
import { CookieHelper } from '../cookie-helper';
import { SendCompanyLogoResponse } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  constructor(
    private http: NetworkService,
    private cookieHelper: CookieHelper,
  ) { }

  //ZONES
  public getAccountZones(): Observable<AccountZonesResponse> {
    const url = `company/account/zonesanddelivery?companyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  public saveAccountZones(data: AccountZonesResponse): Observable<AccountZonesResponse> {
    const url = `company/account/zonesanddelivery?companyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.post(url, data, { headers });
  }


  //PRICE TIERS
  public getAccountPriceTiers(): Observable<AccountPriceTiersResponse> {
    const url = `company/account/pricetiers?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  public saveAccountPriceTiers(data: AccountPriceTiersResponse): Observable<AccountPriceTiersResponse> {
    const url = `company/account/pricetiers?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.post(url, data, { headers});
  }

  //Prices
  public getPrices(): Observable<PricesResponse> {
    const url = `company/prices?companyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }
  public savePrices(data: PricesResponse): Observable<PricesResponse> {
    const url = `company/prices?api-version=${environment.api_version}`;
    const headers = this.getHeader();
    data.companyId = Number(this.cookieHelper.getCompanyId());
    return this.http.put(url, data, { headers });
  }

  //SERVICES
  public getAccountServices(): Observable<AccountServicesResponse> {
    const url = `company/account/service/all?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  public getAccountService(id): Observable<AccountServiceResponse> {
    const url = `company/account/service?CompanyId=${this.cookieHelper.getCompanyId()}&ServiceId=${id}&api-version=${environment.api_version}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  public addAccountService(data: AccountServiceResponse): Observable<HttpResponse<any>> {
    const url = `company/account/service?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.post(url, data, { headers, observe: 'response' });
  }

  public saveAccountService(data: AccountServiceResponse): Observable<HttpResponse<any>> {
    const url = `company/account/service?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.put(url, data, { headers, observe: 'response' });
  }

  public removeAccountService(id): Observable<HttpResponse<any>> {
    const url = `company/account/service?CompanyId=${this.cookieHelper.getCompanyId()}&ServiceId=${id}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.delete(url, { headers, observe: 'response' });
  }
  //TRUCKS
  public getTrucks(): Observable<TrucksResponse> {
    const url = `company/account/trucks/all?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public getTruck(id:number): Observable<TruckEdit> {
    const url = `company/account/trucks/?api-version=${environment.api_version}&TruckId=${id}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public getDrivers(): Observable<TruckDriversResponse> {
    const url = `company/account/trucks/drivers?api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.get(url, { headers });
  }

  public addTruck(data: Truck) {
    const url = `company/account/trucks?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.post(url, data, { headers, observe: 'response' });
  }

  public updateTruck(data: Truck) {
    const url = `company/account/trucks?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.put(url, data, { headers, observe: 'response' });
  }

  public removeTruck(id: number): Observable<HttpResponse<any>> {
    const url = `company/account/trucks?CompanyId=${this.cookieHelper.getCompanyId()}&TruckId=${id}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.delete(url, { headers, observe: 'response' });
  }

  //TEAM DRIVERS
  public getAccountTeamDrivers(): Observable<AccountTeamDriversResponse> {
    const url = `company/account/teamuser/all?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  public getAccountTeamDriver(id): Observable<User> {
    const url = `company/account/teamuser?CompanyId=${this.cookieHelper.getCompanyId()}&UserId=${id}&api-version=${environment.api_version}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  public addAccountUser(data: User): Observable<HttpResponse<any>> {
    const url = `company/account/teamuser?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.post(url, data, { headers, observe: 'response' });
  }

  public saveAccountUser(data: User): Observable<HttpResponse<any>> {
    const url = `company/account/teamuser?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.put(url, data, { headers, observe: 'response' });
  }

  public removeAccountUser(id): Observable<HttpResponse<any>> {
    const url = `company/account/teamuser?CompanyId=${this.cookieHelper.getCompanyId()}&UserId=${id}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.delete(url, { headers, observe: 'response' });
  }

  public getTransactions(transactionType:number,monthFrom:string): Observable<TransactionsResponse> {
    const url = `company/transactions?companyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}&transactionType=${transactionType}&startMonth=${monthFrom}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  //COMPANY SETTINGS
  public getAccountCompanySettings(): Observable<AccountCompanySettingsResponse> {
    const url = `company/account/settings?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    return this.http.get<any>(url, { params: new HttpParams() });
  }

  public saveAccountCompanySettings(data: AccountCompanySettingsResponse): Observable<AccountCompanySettingsResponse> {
    const url = `company/account/settings?CompanyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
    const headers = this.getHeader();

    return this.http.post(url, data, { headers });
  }

  public sendCompanyLogo(file: File, companyId: string): Observable<SendCompanyLogoResponse> {
    const url = `FileUpload/upload`;
    var formData: any = new FormData();
    formData.append("UploadedFile", file);
    formData.append("Type", 0);
    formData.append("CompanyId", companyId)

    return this.http.post(url, formData);
  }


  private getHeader():HttpHeaders{
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'DAVOS-IsMobile': environment.isMobile.toString()
    });
}


}
