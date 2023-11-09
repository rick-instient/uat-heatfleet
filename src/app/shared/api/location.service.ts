import {
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpClient,
  HttpBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// import { CookieHelper } from '../cookie-helper';
import { BUSINESS_TYPES } from './constants';
import { ILocation } from '../models/location.model';
import { LocationResponse } from './response/locations.response';
import { forkJoin } from 'rxjs';
import { CommonService } from '../services/common.config';


@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(
    private http: NetworkService,
    public http2: HttpClient,
    // private cookieHelper: CookieHelper,
    private handler: HttpBackend,
    public config: CommonService
  ) {
    this.http2 = new HttpClient(this.handler);
  }

  //ZONES
  private get url(): string {
    return environment.api_url;
  }

  private get hof_url(): string {
    return environment.temp_api_url;
  }

  public getStates(url:any): Observable<any> {
    if (this.config.typeComp.includes('subType')) {
      var url_ = `${url}?` + this.config.typeComp;
      if (this.config.isRegion) {
        url_ = `${url}&` + this.config.typeComp;
      }
    } else {
      var url_ = `${url}?` + this.config.typeComp;
      if (this.config.isRegion) {
        url_ = `${url}&` + this.config.typeComp;
      }
    }

    return this.http2.get<Array<any>>(url_).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getStates', []))
    );
  }

  public getCounties(): Observable<any> {
    const url = environment.api_url + `locations/get-counties`;

    return this.http2.get<Array<any>>(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getCounties', []))
    );
  }

  public getByHash(hash: string): Observable<ILocation | any> {
    // if (this.config.typeComp.includes('subType')) {
    //   var url =
    //     this.url + `locations/hash?hash=${hash}?` + this.config.typeComp;
    // } else {
    //   var url =
    //     this.url + `locations/hash?hash=${hash}?` + this.config.typeComp;
    // }
    var url = this.url + `locations/hash?hash=${hash}`;

    return this.http2.get<ILocation>(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );
  }

  public getCitiesByState(hash:any, countyName:any) {
    let vr = '';

    if (hash != null) {
      if (countyName) {
        countyName = encodeURIComponent(countyName);
        vr = '?stateId=' + hash + `&countyName=` + countyName;
      } else {
        vr = '?stateId=' + hash;
      }
    }
    const url = this.url + `locations/getCitiesByState` + vr;

    return this.http2.get<ILocation>(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getCitiesByState', []))
    );
  }

  public requestDataFromMultipleSources_Forecast(
    url: string,
    url2: string
  ): Observable<any[]> {
    let response1 = this.http2.get(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('GetHeatingOilForecast', []))
    );

    let response2 = this.http2.get(url2).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('GetHeatingOilForecast', []))
    );
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([response1, response2]);
  }

  public requestDataFromMultipleSources_State(
    url: string,
    url3:any
  ): Observable<any[]> {
    // const url = this.url + `locations/getTownDetailsByHash?hash=${hash}`;
    const url_ = this.url + `locations/getPageDetails?${url3}`;

    var url = this.url + `locations/hash?hash=${url}`;

    let response1 = this.http2.get<ILocation>(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );

    let response2 = this.http2.get<ILocation>(url_).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );

    return forkJoin([response1, response2]);
  }

  public requestDataFromMultipleSources(
    hash: string,
    url2:any,
    url3:any
  ): Observable<any[]> {
    const url = this.url + `locations/getTownDetailsByHash?hash=${hash}`;
    const url_ = this.url + `locations/getPageDetails?${url3}`;

    let response1 = this.http2.get<ILocation>(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );

    let response2 = this.http2.get<ILocation>(url2).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );

    let response3 = this.http2.get<ILocation>(url_).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([response1, response2, response3]);
  }

  requestDataFromMultipleSources_Landing(
    url: string,
    url3:any,
    u:any,
    fig:any
  ): Observable<any[]> {
    const url_ = this.url + `locations/getPageDetails?${url3}`;

    let response1 = this.http2.get<ILocation>(url, u).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    if (fig == true) {
      let response3 = this.http2.get<ILocation>(url_).pipe(
        tap((_) => {}),
        catchError(this.handleError<any[]>('getLocationByHash', []))
      );
      return forkJoin([response1, response3]);
    } else {
      return forkJoin([response1]);
    }
  }

  public getTownDetailsByHash(hash: string): Observable<ILocation | any> {
    const url = this.url + `locations/getTownDetailsByHash?hash=${hash}`;

    return this.http2.get<ILocation>(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );
  }

  public GetTownCompaniesByHash(url: string): Observable<ILocation | any> {
    // const url = this.url + `locations/getTownDetailsByHash?hash=${hash}`;

    return this.http2.get<ILocation>(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('getLocationByHash', []))
    );
  }

  public GetHeatingOilForecast(url: string) {
    // const url = this.url + `locations/getTownDetailsByHash?hash=${hash}`;

    return this.http2.get(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('GetHeatingOilForecast', []))
    );
  }

  public GetWeatherHistory(url: string) {
    return this.http2.get(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any[]>('GetHeatingOilForecast', []))
    );
  }

  getLocations(
    stateId: string = '',
    page = 1,
    searchName = '',
    businessType = '',
    region = ''
  ): Observable<LocationResponse> {
    const url =
      this.url +
      `locations/towns?stateId=${stateId}&page=${page}&text=${searchName}`;

    // let bType =
    //   businessType.trim().toLowerCase() == BUSINESS_TYPES[0].title.toLowerCase()
    //     ? 1
    //     : businessType.trim().toLowerCase() ==
    //       BUSINESS_TYPES[1].title.toLowerCase()
    //     ? 2
    //     : 1;

    if (stateId.length > 0) {
      // url += "&stateName=" + stateName;
    }
    if (region.length > 0) {
      // url += "&region=" + region;
    }
    return this.http2.get<LocationResponse>(url).pipe(
      tap((_) => {}),
      catchError(this.handleError<any>('getStates', {}))
    );
  }

  //   public saveAccountZones(data: AccountZonesResponse): Observable<AccountZonesResponse> {
  //     const url = `company/account/zonesanddelivery?companyId=${this.cookieHelper.getCompanyId()}&api-version=${environment.api_version}`;
  //     const headers = this.getHeader();

  //     return this.http.post(url, data, { headers });
  //   }

  private handleError<T>(operation = 'operation', result:any) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      //   this.showToastAlert(error.message, 'primary', 2500, 'errortoast');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'DAVOS-IsMobile': environment.isMobile.toString(),
    });
  }
}
