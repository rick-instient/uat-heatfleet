import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { LoginResponse } from "./response/index";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public Test(param: string): string {
    return `param2: ${param}`;
  }

  public CallTest(): Observable<any> {
    const url = this.getUrl("api/test");
    return this.http.get(url);
  }

  public CallPostTestEmpty(): Observable<any> {
    const url = this.getUrl("api/test/postempty");
    return this.http.post<any>(url, JSON.stringify({}), this.getHttpOptions());
  }

  public CallApiNoAuth(): Observable<any> {
    const url = this.getUrl("api/test/notauth");
    return this.http.get(url, this.getHttpOptions());
  }

  public CallGetTestEmpty(): Observable<any> {
    const url = this.getUrl("api/test/postempty");
    return this.http.get(url);
  }

  public CallLogin(email: string, password: string): Observable<LoginResponse> {
    const data = { Username: email, Password: password };
    const url = this.getUrl("api/authenticate/login");
    return this.http.post<any>(url, data).pipe(shareReplay());
  }

  private getUrl(uri: string): string {
    return `${environment.api_url}${uri}`;
  }

  protected getHttpOptions(withoutToken: boolean = false) {
    if (withoutToken) {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      };
    } else {
      const token = environment.token;
      // debugger;
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: token,
          "DAVOS-IsMobile": environment.isMobile.toString(),
        }),
      };
    }
  }
}
