import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common.config';

@Component({
  selector: 'app-best-price',
  templateUrl: './best-price.component.html',
  styleUrls: ['./best-price.component.scss']
})
export class BestPriceComponent {

  locationListSub: Subscription;
  listOfLocation: any;
  buttonTitle: string = '';
  buttonLink: string = '/404';
  isMainPage: boolean = false;
  showPrice: boolean = false;
  listOfLocationSet1: any = [];
  listOfLocationSet2: any = [];
  mainTitle: string = 'Best Oil Prices by State'

  constructor(
    public activeRoute: ActivatedRoute,
    public sharedService: SharedService,
    public config : CommonService,
  ) {
  }

  ngOnInit() {
    this.getLocationList();
    if (this.sharedService.isSubPage) {
      this.isMainPage = false;
      this.setSubPageTitle();
    } else {
      this.isMainPage = true;
      this.setMainPageTitle();
    }
  }

  getLocationList() {
    if (this.sharedService.isSubPage) {
      this.locationListSub = this.sharedService.townsApiData$.subscribe((value) => {
        if (Object.keys(value).length != 0) {
          this.listOfLocation = value['data'];
          this.splitData();
        } else {
          this.listOfLocation = [];
        }
      });
    } else {
      this.locationListSub = this.sharedService.nearestLocationApiData$.subscribe((value) => {
        if (Object.keys(value).length != 0) {
          this.listOfLocation = value['nearestTown'];
          this.splitData();
        } else {
          this.listOfLocation = [];
        }
      });
    }
  }

  splitData() {
    let dividedRoundLength = Math.floor(this.listOfLocation.length / 2);
    this.listOfLocationSet1 = this.listOfLocation.slice(0, dividedRoundLength);
    this.listOfLocationSet2 = this.listOfLocation.slice(dividedRoundLength, dividedRoundLength * 2);
  }

  setMainPageTitle() {
    if (this.sharedService.isHomePage) {
      this.showPrice = true;
      this.mainTitle = 'Best Oil Prices by State';
    } else if (this.sharedService.originalPageSlug == 'heating_oil.html') {
      this.mainTitle = 'Best Oil Prices by State';
    } else if (this.sharedService.originalPageSlug == 'oil_companies.html') {
      this.mainTitle = 'Search Oil Companies by State';
    } else if (this.sharedService.originalPageSlug == 'heating_oil_prices.html') {
      this.showPrice = true;
      this.mainTitle = "Today's Best Heating Oil Prices by State";
    } else if (this.sharedService.originalPageSlug == 'oil_delivery.html') {
      this.mainTitle = 'Browse Oil Delivery by State';
    }
  }

  setSubPageTitle() {
    this.buttonLink = `/${this.sharedService.originalPageSlug}/${this.sharedService.locationSlug}-Cities.html`
    if (this.sharedService.originalPageSlug == 'heating_oil') {
      this.mainTitle = `Find Heating Oil by ${this.sharedService.location} Town`;
      this.buttonTitle = `VIEW HEATING OIL FOR ALL ${this.sharedService.locationInUpperCase} CITIES`;
    } else if (this.sharedService.originalPageSlug == 'oil_companies') {
      this.mainTitle = `Search ${this.sharedService.location} Oil Companies By City`;
      this.buttonTitle = `VIEW OIL COMPANIES FOR ALL ${this.sharedService.locationInUpperCase} CITIES`;
    } else if (this.sharedService.originalPageSlug == 'heating_oil_prices') {
      this.mainTitle = `Today's ${this.sharedService.location} Oil Prices by City`;
      this.buttonTitle = `VIEW HEATING OIL PRICES FOR ALL ${this.sharedService.locationInUpperCase} CITIES`;
      this.showPrice = true;
    } else if (this.sharedService.originalPageSlug == 'oil_delivery') {
      this.mainTitle = `Browse ${this.sharedService.location} Oil Delivery by City`;
      this.buttonTitle = `VIEW OIL DELIVERY FOR ALL ${this.sharedService.locationInUpperCase} CITIES`;
    }
  }

  itemLinkMaker(item: any): string {
    let link: string = '/404';
    if (!this.isMainPage) {
      link = `/${this.config.typeURL}${item.hash}-${item.townName.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join('_')}-${item.stateId}.html`
    } else if (this.isMainPage) {
      link = `/${this.config.typeURL}${item.state_id}-${item.state_name.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join('_')}.html`
    }
    return link;
  }

  ngOnDestroy() {
    if (this.locationListSub) {
      this.locationListSub.unsubscribe();
    }
  }
}
