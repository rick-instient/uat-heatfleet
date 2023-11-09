import { Injectable, Inject } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './api';
import { Cookie } from './models/cookies.model';
import { Cart, NavigationHistoryItem } from './models/general.model';
import { WINDOW } from 'src/app/heatfleet-landing/window.service';

@Injectable({ providedIn: 'root' })
export class CookieHelper {
  public static PREFIX = '';

  private defaultStringVal = '';

  constructor(
    private cookieService: CookieService,
    @Inject(WINDOW) public window: Window
  ) {}
  protected CartInitedSubject = new BehaviorSubject<Cart>(null);
  public get CartInited$(): Observable<Cart> {
    return this.CartInitedSubject.asObservable();
  }
  public clear() {
    this.cookieService.deleteAll();
    this.cookieService.deleteAll('/', environment.client_url);
    this.cookieService.deleteAll('/');
    // this.window.localStorage.clear();
  }

  public getCookieName(name: string): string {
    return `${CookieHelper.PREFIX}${name}`;
  }

  public getCompanyId(): string {
    return this.getItem(this.getCookieName(Cookie.COMPANY_ID));
  }

  public setCompanyId(value: string) {
    this.setItem(this.getCookieName(Cookie.COMPANY_ID), value);
  }

  public getTokenExpiration(): string {
    return this.getItem(this.getCookieName(Cookie.TOKEN_EXPIRATION));
  }

  public setTokenExpiration(value: string) {
    this.setItem(this.getCookieName(Cookie.TOKEN_EXPIRATION), value);
  }

  public setRefreshToken(value: string) {
    this.setItem(this.getCookieName(Cookie.REFRESH_TOKEN), value);
  }

  public getRefreshToken(): string {
    return this.getItem(this.getCookieName(Cookie.REFRESH_TOKEN));
  }

  public getAuthToken(): string {
    return this.getItem(this.getCookieName(Cookie.AUTH_TOKEN));
  }

  public setAuthToken(value: string) {
    this.setItem(this.getCookieName(Cookie.AUTH_TOKEN), value);
  }

  public isPrivacyConfirmed(): boolean {
    return this.getItem(this.getCookieName(Cookie.PRIVACY_CONFIRMED)) == 'true';
  }

  public setPrivacyConfirmed(value: string) {
    this.setItem(this.getCookieName(Cookie.PRIVACY_CONFIRMED), value);
  }

  public setUserName(value: string) {
    this.setItem(this.getCookieName(Cookie.USER_NAME), value);
  }
  public getUserName(): string {
    return this.getItem(this.getCookieName(Cookie.USER_NAME));
  }
  public setFirstName(value: string) {
    this.setItem(this.getCookieName(Cookie.FIRST_NAME), value);
  }
  public getFirstName(): string {
    return this.getItem(this.getCookieName(Cookie.FIRST_NAME));
  }
  public setLastName(value: string) {
    this.setItem(this.getCookieName(Cookie.LAST_NAME), value);
  }
  public getLastName(): string {
    return this.getItem(this.getCookieName(Cookie.LAST_NAME));
  }

  public setServiceEnabled(value: string) {
    this.setItem(this.getCookieName(Cookie.SERVICE_ENABLED), value);
  }
  public getServiceEnabled(): string {
    return this.getItem(this.getCookieName(Cookie.SERVICE_ENABLED));
  }
  public setOilDeliveryEnabled(value: string) {
    this.setItem(this.getCookieName(Cookie.OIL_DELIVERY_ENABLED), value);
  }
  public getOilDeliveryEnabled(): string {
    return this.getItem(this.getCookieName(Cookie.OIL_DELIVERY_ENABLED));
  }

  public setUserEmail(value: string) {
    this.setItem(this.getCookieName(Cookie.USER_EMAIL), value);
  }
  public getUserEmail(): string {
    return this.getItem(this.getCookieName(Cookie.USER_EMAIL));
  }
  public setUserId(value: string) {
    this.setItem(this.getCookieName(Cookie.USER_ID), value);
  }
  public getUserId(): string {
    return this.getItem(this.getCookieName(Cookie.USER_ID));
  }
  public setUserRole(value: string) {
    this.setItem(this.getCookieName(Cookie.USER_ROLE), value);
  }
  public getUserRole(): string {
    return this.getItem(this.getCookieName(Cookie.USER_ROLE));
  }

  public setCart(cart: Cart): void {
    this.setItem(this.getCookieName(Cookie.CART), JSON.stringify(cart));
    this.CartInitedSubject.next(cart);
  }

  public getCart(): Cart {
    const cartStr = this.getItem(this.getCookieName(Cookie.CART));
    if (cartStr == '') {
      return null;
    }
    return JSON.parse(cartStr);
  }

  public setNavigationHistory(array: NavigationHistoryItem[]): void {
    this.setItem(
      this.getCookieName(Cookie.NAVIGATION_HISTORY),
      JSON.stringify(array)
    );
  }

  public getNavigationHistory(): NavigationHistoryItem[] {
    const navHistoryStr = this.getItem(
      this.getCookieName(Cookie.NAVIGATION_HISTORY)
    );
    if (navHistoryStr == '') {
      return [];
    }
    return JSON.parse(navHistoryStr);
  }

  public processLoginResponse(res: LoginResponse) {
    this.setAuthToken(res.token);
    this.setPrivacyConfirmed(`${res.privacyConfirmed}`);
    var decoded: any = jwtDecode(res.token);
    this.setCompanyId(decoded.CompanyId);
    this.setUserEmail(decoded.Email);
    this.setUserId(decoded.UserId);
    this.setUserRole(decoded.Role);
    this.setUserName(decoded.UserName);
    this.setFirstName(decoded.FirstName);
    this.setLastName(decoded.LastName);
    this.setTokenExpiration((decoded.exp * 1000).toString());
    this.setRefreshToken(res.refreshToken);
  }

  private getItem(key: string): string {
    if (environment.isMobile) {
      return this.window.localStorage.getItem(key) || this.defaultStringVal;
    } else {
      return this.cookieService.get(key);
    }
  }

  private setItem(key: string, value: string) {
    if (environment.isMobile) {
      this.window.localStorage.setItem(key, value);
    } else {
      this.cookieService.set(key, value);
    }
  }

  public check(key): boolean {
    if (environment.isMobile) {
      let item = this.getItem(key);
      if (item == null || item == this.defaultStringVal) {
        return false;
      }
      return true;
    } else {
      return this.cookieService.check(key);
    }
  }
}
