import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
  UrlSegment,
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CookieHelper } from "../cookie-helper";
import { AuthenticationService } from "./authentication.service";
import { HttpClient, HttpBackend } from "@angular/common/http";
import { CommonService } from "src/app/heatfleet-landing/common.config";
import { ClientApiService } from "../api/client.service";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class ServiceGuardCompanyProfile implements CanActivate {
  townDetails: any;
  townUrl: any;
  companyDescriptions: any;
  companyData: any;
  Random_offers = [
    {
      label: "competitive heating oil prices",
    },
    {
      label: "emergency 24/7 dispatch",
    },
    {
      label: "price protection",
    },
    {
      label: "fixed price plans",
    },
    {
      label: "annual service contracts",
    },
  ];

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
    return this.checkMetaTags(state.url);
  }

  checkMetaTags(townUrl) {
    var fields = townUrl.split("-");

    // const url = environment.temp_api_url + 'api/GetCompanyProfileBySlug';
    const url = environment.api_url + 'locations/GetCompanyProfileBySlug';

    var slug = fields[3];

    var send = {
      Slug: slug,
      isHF: true,
      amount: 100,
    };

    return this.clientApiService.getCompanyProfile(url, send).pipe(
      map((data) => {
        this.companyData = data[0];
        this.config.companyProfile_Data = this.companyData;

        if (
          this.VisibleCompanyType(
            this.companyData.isOilDel,
            this.companyData.isService
          )
        ) {
          var _company_type = "Furnace Repair";
        }

        if (this.companyData.isLongIslandCompany) {
          var _company_type = "COD Fuel Oil";
        }

        if (
          this.VisibleCompanyType(
            this.companyData.isOilDel,
            this.companyData.isService && this.companyData.isLongIslandCompany
          )
        ) {
          var offers_1 = "boiler & furnace repair, ";
        }

        if (
          !this.VisibleCompanyType(
            this.companyData.isOilDel,
            this.companyData.isService && this.companyData.isLongIslandCompany
          )
        ) {
          var offers_1 = "COD fuel discounts, ";
        }

        if (
          !this.VisibleCompanyType(
            this.companyData.isOilDel,
            this.companyData.isService && !this.companyData.isLongIslandCompany
          )
        ) {
          var offers_1 = "cash heating oil discounts, ";
        }

        this.config.metaCompanTitle =
          this.companyData.companyName +
          " | Home Heating Oil Delivery & " +
          _company_type +
          " | Heat Fleet";

        var city_name = this.companyData.city;
        if (this.companyData.isLongIslandCompany) {
          city_name = "Long Island";
        }

        if (this.companyData.isCapeCodCompany) {
          city_name = "Cape Cod";
        }

        var content =
          "Provides " +
          city_name +
          " area residents with home heating oil delivery. Offers: " +
          offers_1 +
          this.getRandom_Offer() +
          ".";

        if (content.length < 150) {
          var content =
            "Provides " +
            city_name +
            " area residents with home heating oil delivery. Offers: " +
            offers_1 +
            this.getRandom_Offer() +
            ", " +
            this.getRandom_Offer() +
            ".";
        }

        if (content.length < 150) {
          var content =
            "Provides " +
            city_name +
            " area residents with home heating oil delivery. Offers: " +
            offers_1 +
            this.getRandom_Offer() +
            ", " +
            this.getRandom_Offer() +
            ", " +
            this.getRandom_Offer() +
            ".";
        }

        this.config.metaCompanyDesc = content;

        return true;
      })
    );
  }

  VisibleCompanyType(a, b) {
    if (a && b) {
      return true;
    } else {
      return false;
    }
  }

  getRandom_Offer() {
    let rd = Math.floor(Math.random() * this.Random_offers.length);
    var random = [this.Random_offers[rd]];

    return random[0].label;
  }
}
