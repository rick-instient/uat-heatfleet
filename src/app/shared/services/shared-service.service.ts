import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isHomePage: boolean = false;  // is page is home
  isMainPage: boolean = false;  // is page is heating oil, oil prices etc.
  isSubPage: boolean = false; // not home or heating oil, oil prices etc.
  isStatePage: boolean = false;
  isTownPage: boolean = false;
  isCompanyPage: boolean = false;
  originalPageSlug: string = 'heating_oil'; // Ex. heating_oil, heating_oil.html
  pageSlug: string = 'heating oil'; // Ex. heating oil
  pageSlugInUpperCase: string = 'HEATING OIL'; //Ex. HEATING OIL
  pageSlugInCapitalFirst: string = 'Heating oil'; //Ex. Heating oil
  pageSlugInCapitalAllFirst: string = 'Heating Oil'; //Ex. Heating Oil
  locationSlug: string = ''; // Ex. NY-New_York
  locationSlugArray: Array<string> = []; // Ex. ['NY', 'New_York']
  location: string = '';  // Ex. New York
  locationInUpperCase: string = ''; // Ex. NEW YORK
  locationInCapitalFirst: string = ''; //Ex. New york
  locationInCapitalAllFirst: string = ''; //Ex. New York
  companyName: string = '';
  companyNameInUpperCase: string = '';

  // other usefull variable
  showPopup: boolean = false;


  public isUrlChange = new BehaviorSubject<boolean>(false);
  isUrlChange$: Observable<boolean> = this.isUrlChange.asObservable();

  public popUpData = new BehaviorSubject<any>({});
  popUpData$: Observable<any> = this.popUpData.asObservable();

  public townsApiData = new BehaviorSubject<any>({});
  townsApiData$: Observable<any> = this.townsApiData.asObservable();

  public getPageDetailsApiData = new BehaviorSubject<any>({});
  getPageDetailsApiData$: Observable<any> = this.getPageDetailsApiData.asObservable();

  public stateHashApiData = new BehaviorSubject<any>({});
  stateHashApiData$: Observable<any> = this.stateHashApiData.asObservable();

  public nearestLocationApiData = new BehaviorSubject<any>({});
  nearestLocationApiData$: Observable<any> = this.nearestLocationApiData.asObservable();

  public townHashApiData = new BehaviorSubject<any>({});
  townHashApiData$: Observable<any> = this.townHashApiData.asObservable();

  public townCompaniesHashApiData = new BehaviorSubject<any>({});
  townCompaniesHashApiData$: Observable<any> = this.townCompaniesHashApiData.asObservable();

  constructor(
  ) {
  }

  async resetPageType(): Promise<boolean> {
    this.isHomePage = false;
    this.isMainPage = false;
    this.isSubPage = false;
    this.isStatePage = false;
    this.isTownPage = false;
    this.isCompanyPage = false;
    this.originalPageSlug = 'heating_oil';
    this.pageSlug = 'heating oil';
    this.pageSlugInCapitalAllFirst = 'Heating Oil';
    this.pageSlugInCapitalFirst = 'Heating oil';
    this.pageSlugInUpperCase = 'HEATING OIL';
    this.location = '';
    this.locationInUpperCase = '';
    this.companyName = '';
    this.locationSlug = '';
    this.locationInCapitalFirst = '';
    this.locationInCapitalAllFirst = '';
    this.companyNameInUpperCase = '';
    this.locationSlugArray = [];
    this.isUrlChange.next(false);
    return true;
  }

  capitalizeWords(string: string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  capitalFirstLetter(string: string) {
    //Input: 'heating oil' --> Output: 'Heating oil'
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
}
