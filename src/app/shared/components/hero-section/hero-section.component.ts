import { Component, HostListener } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  infoHeader: string;
  ctaText: string;
  infoCheckBox: any = [];
  townZip: number = 11368;
  logoUrls: any = [];
  quantity: string = '100 gal';
  stateHashApiSub: Subscription;
  pageDetailsSub: Subscription;
  townHashApiSub: Subscription;
  townCompaniesHashApiSub: Subscription;
  isInfoLoading: boolean = true;
  isLogoLoading: boolean = true;
  isBackgroundImageLoading: boolean = true;
  backgroundImage: string;
  backgroundImageAlt: string;
  showTopBar: boolean = false;
  tempZipHolder: any;

  constructor(public sharedService: SharedService,
    public http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.sharedService.isSubPage) {
      if (this.sharedService.isStatePage) {
        this.getStateHashApiData();
      }

      if (this.sharedService.isTownPage) {
        this.getTownHashApiData();
        this.getTownCompaniesHashApiData();
      }
    } else {
      this.logoUrls = ["https://media-cdn.heatfleet.com/cod/cot-L-5t-Renewable-Fuels-Heating-Oil-Price-Logo.svg",
        "https://media-cdn.heatfleet.com/cod/2qq-L-5t-Als-Oil-Service-Heating-Oil-Price-Logo.svg",
        "https://media-cdn.heatfleet.com/cod/nqq-L-5t-Baker-Whitney-Oil-Heating-Oil-Price-Logo.svg",
        "https://media-cdn.heatfleet.com/cod/9qq-L-5t-Bigelow-Oil-Heating-Oil-Price-Logo.svg",
        "https://media-cdn.heatfleet.com/cod/hyq-L-5t-Cleveland-Fuel-Oil-Heating-Oil-Price-Logo.svg",
        "https://media-cdn.heatfleet.com/cod/vyq-L-5t-Coan-Heating-Cooling-Heating-Oil-Price-Logo.svg",
        "https://media-cdn.heatfleet.com/cod/jyq-L-5t-Concord-Oil-Heating-Oil-Price-Logo.svg",
        "https://media-cdn.heatfleet.com/cod/3yq-L-5t-Dunn-Oil-Heating-Oil-Price-Logo.svg"];
      this.isLogoLoading = false;
      this.isBackgroundImageLoading = false;

      if (this.sharedService.isMainPage) {
        this.backgroundImage = 'https://media-cdn.heatfleet.com/cash-oil/va-1-High-Rise-in-Virginia.jpg';
        this.backgroundImageAlt = 'High-Rise-in-Virginia';
      } else {
        this.backgroundImage = 'https://media-cdn.heatfleet.com/12-Search-Best-Heating-Oil-Delivery-Prices.jpg';
        this.backgroundImageAlt = 'Photo of family sitting in front of a fireplace';
      }
    }

    this.getPageDetailsApiData();
  }

  getPageDetailsApiData() {
    this.pageDetailsSub = this.sharedService.getPageDetailsApiData$.subscribe(value => {
      if (Object.keys(value).length != 0) {
        this.infoHeader = value.infoCheckBox.header;
        this.infoCheckBox = value.infoCheckBox;
        this.ctaText = value.ctaText;
        this.isInfoLoading = false;
      }
    });
  }

  getStateHashApiData() {
    this.stateHashApiSub = this.sharedService.stateHashApiData$.subscribe((value) => {
      if (Object.keys(value).length != 0) {
        let typeOfPage = (this.router.url).split('/');
        console.log("locationHashApiData", value);
        this.townZip = value.zipcode;
        this.logoUrls = value.logos;
        this.backgroundImage = value.townImage;
        if (typeOfPage[1] === 'heating_oil'){
          this.backgroundImageAlt = `TODAY'S Best Heating Oil Deals in ${value.stateName}`;
        } else if (typeOfPage[1] === 'oil_companies'){
          this.backgroundImageAlt = `TOP Oil Companies in ${value.stateName} - Heating Oil`; 
        } else if (typeOfPage[1] === 'heating_oil_prices'){
          this.backgroundImageAlt = `Today's BEST Heating Oil Prices in ${value.stateName}`; 
        } else if (typeOfPage[1] === 'oil_delivery'){
          this.backgroundImageAlt = `TODAY's Heating Oil Delivery Deals in ${value.stateName}`; 
        }
        this.isLogoLoading = false;
        this.isBackgroundImageLoading = false;
      }
      console.log(this.backgroundImageAlt)
    });
  }

  getTownHashApiData() {
    this.townHashApiSub = this.sharedService.townHashApiData$.subscribe((value) => {
      console.log("town")
      console.log(value);
      if (Object.keys(value).length != 0) {
        this.townZip = value.zip;
        this.backgroundImage = value.image_url;
        this.backgroundImageAlt = value.alt;
        this.isBackgroundImageLoading = false;
      }
    });
  }

  getTownCompaniesHashApiData() {
    this.townCompaniesHashApiSub = this.sharedService.townCompaniesHashApiData$.subscribe((value) => {
      if (Object.keys(value).length != 0) {
        this.logoUrls = value.logoUrls;
        this.isLogoLoading = false;
      }
    });
  }

  checkZipCode() {
    const headers = new HttpHeaders({
      'X-Api-Key': `${environment.api_key}`,
      'DAVOS-IsMobile': environment.isMobile.toString(),
    });

    let quantity: number = Number(this.quantity.replace(/[^0-9]/g, ''));

    const url = `${environment.api_url}customer/offer/zipcodecheck?zipCode=${this.townZip}`;

    this.http.get(url, { headers: headers }).subscribe((res) => {
      console.log(res);
      if (res) {
        if (res['zipCodeExists'] == false) {
          console.log("zipcode not found");
          this.sharedService.popUpData.next(
            {
              mainMessage: 'Invalid ZIP Code',
              subMessage: 'Please enter a valid ZIP code.'
            }
          );
        } else if (quantity < res['minimumQuantity']) {
          this.sharedService.popUpData.next(
            {
              mainMessage: 'Invalid Quantity',
              subMessage: `Please enter a valid quantity. The minimum quantity for this city is ${res['minimumQuantity']}`
            }
          );
        } else {
          window.location.href = `https://secure.heatfleet.com/oil-select-provider/${this.townZip}/0/0/4/${quantity}`;
        }
      } else {
        this.sharedService.popUpData.next(
          {
            showDefault: true
          }
        );
      }
    });
  }

  clearQuantity() {
    this.quantity = ''
  }

  appendGal() {
    this.quantity = this.quantity.replace(/[^0-9]/g, '');
    this.quantity = this.quantity ? `${this.quantity} gal` : '100 gal';
  }

  clearZip(){
    this.tempZipHolder = this.townZip;
    this.townZip = null; 
  }

  appendZip(){
    if(!this.townZip){
      this.townZip = this.tempZipHolder;
    }
  }

  preventAlphabets(event: any) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode == 32) {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    if (this.pageDetailsSub) {
      this.pageDetailsSub.unsubscribe();
    }
    if (this.stateHashApiSub) {
      this.stateHashApiSub.unsubscribe();
    }
    if (this.townHashApiSub) {
      this.townHashApiSub.unsubscribe();
    }
    if (this.townCompaniesHashApiSub) {
      this.townCompaniesHashApiSub.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (window.scrollY >= 500) {
      this.showTopBar = true;
    } else {
      this.showTopBar = false;
    }
  }
}