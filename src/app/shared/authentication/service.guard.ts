import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
  UrlSegment,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieHelper } from '../cookie-helper';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { CommonService } from 'src/app/heatfleet-landing/common.config';
import { ClientApiService } from '../api/client.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class ServiceGuard implements CanActivate {
  townDetails: any;
  townUrl: any;

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private cookieHelper: CookieHelper,
    public http: HttpClient,
    public config: CommonService,
    public clientApiService: ClientApiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Route---->', route);
    console.log('state---->', state);
    return true;
  }

  checkMetaTags(townUrl) {
    let title_content = 'Town Heating Oil Prices | Heat Fleet';

    this.config.metaTownTitle = title_content;

    return true;
    var fields = townUrl.split('-');
    var field2 = fields[2];

    const url =
      environment.temp_api_url +
      'api/location/getTownDetailsByHash?hash=' +
      field2;

    return this.clientApiService.getTownProfile(url).pipe(
      map((data) => {
        this.townDetails = data;
        this.config.townProfile_Data = this.townDetails;

        if (this.townDetails.licensedActiveCoCount > 3) {
          var topDeals = " | Today's TOP 10 DEALS";
        } else {
          topDeals = '';
        }

        var content =
          "Find THE BEST home heating oil prices with HeatFleet's oil price search engine. Join homeowners like you to save on credit card and cash heating oil delivery.";

        if (this.townDetails.isLongIsland) {
          content =
            "Instantly find Long Island's BEST home heating oil prices with the Heat Fleet oil price search engine. Save on credit card and COD fuel orders.";
        }

        if (this.townDetails.isCapeCod) {
          content =
            "Instantly find Cape Cod's BEST home heating oil prices with the Heat Fleet oil price search engine. Save on credit card and cash heating oil orders.";
        }
        this.config.metaTownDesc = content;

        let title_content =
          'Heating Oil Prices in ' +
          this.townDetails.city +
          topDeals +
          ' | Heat Fleet';

        console.log('Service --' + title_content);

        this.config.metaTownTitle = title_content;
        return true;
      })
    );
  }
}
