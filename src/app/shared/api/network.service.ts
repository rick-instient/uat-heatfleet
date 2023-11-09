import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LoadingService } from "./loading.service";
import { finalize } from "rxjs/operators";

export interface RequestOptions {
  headers?: HttpHeaders;
  observe?: any;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: "json";
  withCredentials?: boolean;
  body?: any;
}
export interface NWResult<RES> {
  result: Observable<RES>;
  loading: Observable<boolean>;
}

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  deviceId: any;
  zipCodeInput: any;
  ip_address: any;

  private get url(): string {
    return environment.api_url;
  }
  private get mockUrl(): string {
    return environment.api_mock_url;
  }

  public constructor(
    public http: HttpClient,
    public loadingService: LoadingService
  ) {}

  public get<T>(endPoint: string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(this.url + endPoint, options);
  }

  public getRes<T>(endPoint: string, options?: RequestOptions): NWResult<T> {
    return {
      result: this.http
        .get<T>(this.url + endPoint, options)
        .pipe(finalize(() => this.loadingService.stopLoading(endPoint))),
      loading: this.loadingService.startLoading(endPoint),
    };
  }

  public getMock<T>(endPoint: string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(this.mockUrl + endPoint, options);
  }

  public patch(endPoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.patch(this.url + endPoint, body, reqOpts);
  }

  public post<T>(
    endPoint: string,
    params?: Object,
    options?: RequestOptions
  ): Observable<T> {
    return this.http.post<T>(this.url + endPoint, params, options);
  }

  public put<T>(
    endPoint: string,
    params?: Object,
    options?: RequestOptions
  ): Observable<T> {
    return this.http.put<T>(this.url + endPoint, params, options);
  }

  public delete<T>(endPoint: string, options?: RequestOptions): Observable<T> {
    return this.http.delete<T>(this.url + endPoint, options);
  }
}
