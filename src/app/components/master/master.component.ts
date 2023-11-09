import { Component } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-master-component',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {


  isRender: boolean = false;

  constructor(
    private router: Router,
    public sharedService: SharedService,
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isRender = false; // this line position is important to block main threads
      if (event instanceof Scroll) {
        let currentURL: string = event.routerEvent.url;
        console.log("Current URL:", currentURL);
        this.setPageType(currentURL);
      }
    });
  }

  async setPageType(url: string) {
    await this.sharedService.resetPageType();
    let segmentOfUrl = url.split('/');
    console.log("segmentOfUrl", segmentOfUrl);
    if (segmentOfUrl.length == 2) {
      this.sharedService.originalPageSlug = segmentOfUrl[1];
      if (segmentOfUrl[1] == '') {
        this.sharedService.isHomePage = true;
      } else if (segmentOfUrl[1] == 'heating_oil.html') {
        this.sharedService.isMainPage = true;
        this.sharedService.pageSlug = segmentOfUrl[1].replace(/_/g, ' ').replace('.html', ''); //'heating oil'
        this.sharedService.pageSlugInUpperCase = this.sharedService.pageSlug.toUpperCase();
        this.sharedService.pageSlugInCapitalFirst = this.sharedService.capitalFirstLetter(this.sharedService.pageSlug);
        this.sharedService.pageSlugInCapitalAllFirst = this.sharedService.capitalizeWords(this.sharedService.pageSlug);
      } else if (segmentOfUrl[1] == 'oil_companies.html') {
        this.sharedService.isMainPage = true;
        this.sharedService.pageSlug = segmentOfUrl[1].replace(/_/g, ' ').replace('.html', ''); //'oil companies'
        this.sharedService.pageSlugInUpperCase = this.sharedService.pageSlug.toUpperCase();
        this.sharedService.pageSlugInCapitalFirst = this.sharedService.capitalFirstLetter(this.sharedService.pageSlug);
        this.sharedService.pageSlugInCapitalAllFirst = this.sharedService.capitalizeWords(this.sharedService.pageSlug);
      } else if (segmentOfUrl[1] == 'heating_oil_prices.html') {
        this.sharedService.isMainPage = true;
        this.sharedService.pageSlug = segmentOfUrl[1].replace(/_/g, ' ').replace('.html', ''); //'heating oil prices'
        this.sharedService.pageSlugInUpperCase = this.sharedService.pageSlug.toUpperCase();
        this.sharedService.pageSlugInCapitalFirst = this.sharedService.capitalFirstLetter(this.sharedService.pageSlug);
        this.sharedService.pageSlugInCapitalAllFirst = this.sharedService.capitalizeWords(this.sharedService.pageSlug);
      } else if (segmentOfUrl[1] == 'oil_delivery.html') {
        this.sharedService.isMainPage = true;
        this.sharedService.pageSlug = segmentOfUrl[1].replace(/_/g, ' ').replace('.html', ''); //'oil delivery'
        this.sharedService.pageSlugInUpperCase = this.sharedService.pageSlug.toUpperCase();
        this.sharedService.pageSlugInCapitalFirst = this.sharedService.capitalFirstLetter(this.sharedService.pageSlug);
        this.sharedService.pageSlugInCapitalAllFirst = this.sharedService.capitalizeWords(this.sharedService.pageSlug);
      }
    } else {
      this.sharedService.isSubPage = true;
      this.sharedService.originalPageSlug = segmentOfUrl[1];
      if (segmentOfUrl[1] == 'heating_oil') {
        this.sharedService.pageSlug = segmentOfUrl[1].replace(/_/g, ' ');
      } else if (segmentOfUrl[1] == 'oil_companies') {
        this.sharedService.pageSlug = segmentOfUrl[1].replace(/_/g, ' ');
      } else if (segmentOfUrl[1] == 'heating_oil_prices') {
        this.sharedService.pageSlug = segmentOfUrl[1].replace(/_/g, ' ');
      } else if (segmentOfUrl[1] == 'oil_delivery') {
        this.sharedService.pageSlug = segmentOfUrl[1].replace(/_/g, ' ');
      }
      this.sharedService.locationSlug = segmentOfUrl[2].replace('.html', '');
      this.sharedService.locationSlugArray = this.sharedService.locationSlug.split('-');
      if (this.sharedService.locationSlugArray.length == 2) {
        this.sharedService.isStatePage = true;
        this.sharedService.location = this.sharedService.locationSlugArray[1].replace(/_/g, ' ');
        this.sharedService.locationInUpperCase = this.sharedService.location.toUpperCase();
        this.sharedService.locationInCapitalFirst = this.sharedService.capitalFirstLetter(this.sharedService.location);
        this.sharedService.locationInCapitalAllFirst = this.sharedService.capitalizeWords(this.sharedService.location);
      } else if (this.sharedService.locationSlugArray.length == 3) {
        this.sharedService.isTownPage = true;
        this.sharedService.location = this.sharedService.locationSlugArray[1].replace(/_/g, ' ');
        this.sharedService.locationInUpperCase = this.sharedService.location.toUpperCase();
        this.sharedService.locationInCapitalFirst = this.sharedService.capitalFirstLetter(this.sharedService.location);
        this.sharedService.locationInCapitalAllFirst = this.sharedService.capitalizeWords(this.sharedService.location);
      } else if (this.sharedService.locationSlugArray.length == 5) {
        this.sharedService.isCompanyPage = true;
        this.sharedService.companyName = this.sharedService.locationSlugArray[2].replace(/_/g, ' ');
        this.sharedService.companyNameInUpperCase = this.sharedService.companyName.toUpperCase();
        this.sharedService.locationInCapitalFirst = this.sharedService.capitalFirstLetter(this.sharedService.location);
        this.sharedService.locationInCapitalAllFirst = this.sharedService.capitalizeWords(this.sharedService.location);
      }
    }
    this.sharedService.isUrlChange.next(true);
    this.isRender = true;
  }
}
