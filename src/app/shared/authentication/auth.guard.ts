import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { CookieHelper } from "../cookie-helper";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private cookieHelper: CookieHelper
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  private checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.auth.isAuthenticated()) {
      const userRole = this.cookieHelper.getUserRole();
      if (route.data.role) {
        if (Array.isArray(route.data.role)) {
          for (let r of route.data.role) {
            if (userRole.indexOf(r) !== -1) {
              return true;
            }
          }
          this.router.navigate(["/"]);
          return false;
        } else {
          if (userRole.indexOf(route.data.role) === -1) {
            this.router.navigate(["/"]);
            return false;
          }
        }
      }
      return true;
    }
    this.router.navigate(["/"]);
    return false;
  }
}
