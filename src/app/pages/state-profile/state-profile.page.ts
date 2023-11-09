import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/shared/api/location.service';
import { ILocation } from 'src/app/shared/models/location.model';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.config';
import { DOCUMENT } from '@angular/common';
// import { isPlatformServer } from '@angular/common';

export interface CustomWindow extends Window {

  customProperty: boolean;
}


@Component({
  selector: 'app-state-profile',
  templateUrl: './state-profile.page.html',
  styleUrls: ['./state-profile.page.scss'],
})
export class StateProfilePage implements OnInit {
  private window: CustomWindow;
  townSelector: boolean = true;
  services: Array<any> = [];
  states: Array<any> = [];
  currentBusinessType: string;
  counter = 1;
  currentStateHash: string;
  currentSearchText: string = '';
  currentSearch: string = '';
  currentLocation: ILocation;
  currentPage = 1;
  totalItemsPerPage = 10;
  townList: Array<ILocation> = [];
  length: number = 100;
  @ViewChild('searchInput') searchInput: ElementRef;
  stateName: any;
  townsObservable: Observable<ILocation>;
  paginationView = false;
  loaded = true;
  enableImg: boolean = true;
  data_res: any = null;

  townZip: any;
  loadChart = false;
  loading = false;

  tagName: any;

  logoUrls_loaded = true;
  logoUrls:any;

  townImage_url: any;
  enableTown: boolean = true;
  enableState: boolean = true;

  allTowns = [];
  duplicateTownList: any;
  showMore = false;
  showLess = false;
  faqsContentTown = [];

  homeSize = 1500;
  oilHotWater = true;
  householdSize = 4;
  annual_oil: any;
  national_avg_price: any;
  lastUpdate: string;
  loadedFirstTime = false;

  totalCompanies: number;
  fullserviceComapnies: number;
  discountComapnies: number;
  schema: any;
  LowValue: any;
  MaxValue: any;

  breadcrumbs: any;
  ctaText: any;
  infoCheckBox: any;
  bsAltLine: any;
  showComponent = false;
  enableComponent = false;
  stateWeatherHistory: any;
  faQsSchema: any;
  heatingOilPricesData: any;
  oilCompaniesData: any;
  oilDeliverydata: any;
  comparePricesText: any;
  content_: any;
  fields: any;
  topTowns: any;
  topCounties: any;

  Connecticut = {
    '@type': 'GeoShape',
    polygon:
      '[[-73.7278, 41.1007],[-73.584, 41.0009],[-72.9054, 41.2706],[-71.8294, 41.3424],[-71.8007, 42.0236],[-73.4873, 42.0496],[-73.551, 41.2954],[-73.7278, 41.1007]]',
  };
  Massachusetts = {
    '@type': 'GeoShape',
    polygon:
      '[[-73.5081, 42.0863],[-73.4969, 42.0497],[-72.9996, 42.0387],[-71.8007, 42.0236],[-71.766, 42.0098],[-71.3814, 42.0188],[-71.3817, 41.8932],[-71.3279, 41.7805],[-71.1329, 41.6601],[-71.1206, 41.4975],[-70.9346, 41.5488],[-70.9305, 41.6133],[-70.8102, 41.6248],[-70.7142, 41.7017],[-70.6307, 41.6502],[-70.668, 41.5329],[-70.4932, 41.552],[-70.4372, 41.6053],[-69.9337, 41.6786],[-70.0247, 41.7873],[-70.216, 41.7429],[-70.3753, 41.7387],[-70.541, 41.8157],[-70.5439, 41.9262],[-70.6989, 41.9871],[-70.6401, 42.0886],[-70.7627, 42.2503],[-71.0413, 42.3029],[-70.9905, 42.4071],[-70.8473, 42.4938],[-70.868, 42.5483],[-70.6356, 42.6002],[-70.776, 42.6912],[-70.8177, 42.8506],[-70.9307, 42.8845],[-71.1325, 42.8213],[-71.2942, 42.6969],[-72.2859, 42.7216],[-73.2649, 42.7459],[-73.5081, 42.0862]]',
  };
  New_York = {
    '@type': 'GeoShape',
    polygon:
      '[[-79.7621, 42.243],[-79.7613, 41.999],[-75.3595, 41.9994],[-74.8886, 41.4382],[-73.6599, 40.9684],[-73.2649, 42.7459],[-73.4377, 44.045],[-73.3431, 45.0108],[-74.9724, 44.9834],[-76.3126, 44.199],[-76.2034, 43.5749],[-76.9524, 43.2703],[-78.4888, 43.3747],[-79.056, 43.2541],[-78.8657, 42.7717],[-79.7621, 42.243]]',
  };
  New_Hampshire = {
    '@type': 'GeoShape',
    polygon:
      '[[-72.5572, 42.853],[-72.4585, 42.7268],[-71.2942, 42.6969],[-70.8486, 42.8609],[-70.7037, 43.0595],[-70.9672, 43.3437],[-71.0769, 45.2469],[-71.3831, 45.2349],[-71.6251, 44.7439],[-71.5346, 44.5874],[-71.8124, 44.3584],[-72.3731, 43.5794],[-72.5572, 42.853]]',
  };
  Vermont = {
    '@type': 'GeoShape',
    polygon:
      '[[-73.4377, 44.045],[-73.2468, 43.5257],[-73.2764, 42.746],[-72.4585, 42.7268],[-72.5572, 42.853],[-72.3731, 43.5794],[-71.8124, 44.3584],[-71.5346, 44.5874],[-71.496, 44.9089],[-71.7674, 45.0114],[-73.3431, 45.0108],[-73.3898, 44.6172],[-73.311, 44.2742],[-73.4377, 44.045]]',
  };
  Rhode_Island = {
    '@type': 'GeoShape',
    polygon:
      '[[-71.8626, 41.3108],[-71.4842, 41.3718],[-71.4086, 41.6631],[-71.3071, 41.7216],[-71.3814, 42.0188],[-71.7992, 42.008],[-71.7976, 41.4167],[-71.8626, 41.3108]]',
  };
  Maine = {
    '@type': 'GeoShape',
    polygon:
      '[[-71.0800, 45.3069],[-70.9672, 43.3437],[-70.5176, 43.3440],[-66.9762, 44.8083],[-67.8033, 45.6778],[-67.7905, 47.0679],[-69.2244, 47.4596],[-70.2401, 45.9437],[-71.0800, 45.3069]]',
  };
  New_Jersey = {
    '@type': 'GeoShape',
    polygon:
      '[[-75.5591, 39.6290],[-75.5364, 39.4605],[-75.1704, 39.2346],[-74.8871, 39.1588],[-74.7927, 38.9919],[-74.6135, 39.2446],[-74.3285, 39.4396],[-74.0963, 39.7681],[-73.9774, 40.2993],[-74.0063, 40.4111],[-74.2618, 40.4647],[-74.0932, 40.6489],[-73.9026, 40.9973],[-74.6949, 41.3574],[-75.1305, 40.9911],[-75.1940, 40.5762],[-75.0588, 40.4180],[-74.7717, 40.2152],[-74.8161, 40.1277],[-75.1279, 39.9118],[-75.4594, 39.7658],[-75.5591, 39.6290],]',
  };
  Pennsylvania = {
    '@type': 'GeoShape',
    polygon:
      '[[-80.5198, 40.9066],[-80.5193, 39.7214],[-77.4691, 39.7200],[-75.7737, 39.7222],[-74.7717, 40.2152],[-75.1940, 40.5762],[-74.7532, 41.3461],[-75.3595, 41.9994],[-77.8320, 41.9985],[-80.5194, 41.9775],[-80.5198, 40.9066],]',
  };
  Maryland = {
    '@type': 'GeoShape',
    polygon:
      '[[-79.4876, 39.2799],[-79.2142, 39.3634],[-79.0832, 39.4713],[-78.9567, 39.4402],[-78.8260, 39.5888],[-78.4686, 39.5167],[-78.4205, 39.6240],[-78.2668, 39.6188],[-78.1713, 39.6956],[-77.8784, 39.5635],[-77.7530, 39.4232],[-77.7557, 39.3339],[-77.4576, 39.2250],[-77.5272, 39.1462],[-77.1466, 38.9642],[-77.0410, 38.9951],[-76.9093, 38.8928],[-77.0401, 38.7899],[-77.1156, 38.6234],[-77.2742, 38.4817],[-77.2073, 38.3598],[-77.0163, 38.4455],[-76.8470, 38.2561],[-76.5906, 38.2142],[-76.4810, 38.1158],[-76.3852, 38.2177],[-76.3818, 38.3863],[-76.4927, 38.4828],[-76.5575, 38.7446],[-76.4502, 38.9411],[-76.4365, 39.2021],[-76.1855, 39.3193],[-76.2760, 39.1462],[-76.1839, 39.0963],[-76.2002, 38.8030],[-76.3425, 38.7490],[-76.2788, 38.6115],[-76.3335, 38.4820],[-76.0441, 38.2416],[-75.8382, 38.1262],[-75.8854, 37.9960],[-75.6243, 37.9942],[-75.2422, 38.0272],[-75.0489, 38.4512],[-75.6936, 38.4600],[-75.7885, 39.7222],[-77.4691, 39.7200],[-78.0991, 39.7223],[-79.4766, 39.7210],[-79.4876, 39.2799]]',
  };
  Long_Island = {
    '@type': 'GeoShape',
    polygon:
      '[[-71.9, 41.31],[-73.75, 40.89],[-73.75, 40.48],[-71.71, 40.9],[-71.9, 41.31]]',
  };

  constructor(
    private locationService: LocationService,
    private router: Router,
    public config: CommonService,
    private title: Title,
    private meta: Meta,
    public http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    // @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.window = <any>this.document.defaultView;
    let routeUrl = this.router.url;
    this.fields = routeUrl.split('/')[2].split('-');
    this.config.getTypeURL();
    // console.log(isPlatformServer(this.platformId));


    // if (isPlatformServer(this.platformId)) {
    //   console.log("IF");


    // } else {



      this.stateName = this.fields[1]
        .replace(/\.html/g, '')
        .replace(/_/g, ' ')
        .trim();
      var slug = this.fields[0];

      // this.tagName =
      //   'Heating Oil Prices Near Me In ' + this.stateName + ' | Heat Fleet';

      // let description =
      //   'Find the best current oil prices in ' +
      //   this.stateName +
      //   ' at once to find the best home heating oil prices.';

      if (this.config.typeParam == 'type=1') {
        this.tagName = "TODAY'S Best Heating Oil Deals in " + this.stateName;
        this.content_ =
          this.stateName.toUpperCase() +
          ' HEATING OIL DEALS. Save up to $100 PER OIL DELIVERY. Enter your ZIP to instantly compare oil prices from trusted local heating oil companies.';
      } else if (this.config.typeParam == 'subType=1') {
        this.tagName =
          'TOP Oil Companies in ' + this.stateName + ' - Heating Oil';
        this.content_ =
          'Find reliable, affordable oil companies in ' +
          this.stateName +
          ' with our free heating oil directory. Save up to $100 PER OIL DELIVERY.';
      } else if (this.config.typeParam == 'subType=2') {
        this.tagName = "Today's BEST Heating Oil Prices in " + this.stateName;
        this.content_ =
          'Find the best current oil prices in ' +
          this.stateName +
          ' with our free, instant fuel oil price search. Trusted local oil companies. Save up to $1.00 per gallon.';
      } else if (this.config.typeParam == 'subType=3') {
        this.tagName = "TODAY's Heating Oil Delivery Deals in " + this.stateName;
        this.content_ =
          'Find reliable, affordable oil delivery in ' +
          this.stateName +
          ' with our free heating oil search engine. Save up to $1.00 PER GALLON.';
      } else {
        this.tagName =
          'Heating Oil Prices Near Me In ' + this.stateName + ' | Heat Fleet';
        this.content_ =
          'Search hundreds of oil companies in ' +
          this.stateName +
          ' at once to find the best home heating oil prices.';
      }

      this.title.setTitle(this.tagName);

      this.meta.updateTag({
        name: 'description',
        content: this.content_,
      });

      if (!environment.production) {
        this.meta.updateTag({
          name: 'robots',
          content: 'noindex, nofollow',
        });
      } else {

        this.meta.updateTag({
          name: 'robots',
          content: 'all',
        });
      }



      this.meta.addTags([
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: this.tagName },
        { property: 'og:url', content: this.router.url },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:description', content: this.content_ },
        { property: 'twitter:title', content: this.tagName },
        { property: 'twitter:site', content: this.router.url },
      ]);

      this.currentStateHash = this.router.url.split('/')[2].split('-')[0].trim();
      this.currentStateHash = this.currentStateHash.toUpperCase();

      var type_ = '';
      if (this.config.typeParam != 'type=1') {
        var type_ = this.config.typeCategory + '&';
      }

      let stateName = this.stateName.replace(/\b\w/g, (match) =>
        match.toUpperCase()
      );

      let url3 =
        type_ +
        this.config.typeParam +
        '&level=3&stateId=' +
        this.currentStateHash +
        '&stateName=' +
        stateName;

      this.makeApiCalls(slug, url3);


      // Running in the browser, perform API requests
    // }

    // this.stateName = this.config.replaceAll(fileds[2], '_', ' ');


    // setTimeout(() => {
    // this.fetchWeatherHistory(this.townZip);

    // }, 1000);


  }

  async makeApiCalls(slug, url3) {
    await this.locationService
      .requestDataFromMultipleSources_State(slug, url3)
      .subscribe((responseList) => {
        this.currentLocation = responseList[0];
        this.townZip = responseList[0].zipcode;
        this.national_avg_price = responseList[0].nationalAvgPrice;
        this.totalCompanies = responseList[0].totalCompanies;
        this.fullserviceComapnies = responseList[0].fullserviceComapnies;
        this.discountComapnies = responseList[0].discountComapnies;
        this.logoUrls = responseList[0].logos;
        this.townImage_url = responseList[0].townImage;

        this.showComponent = true;
        this.meta.addTags([
          { property: 'og:image', content: this.townImage_url },
          { property: 'twitter:image', content: this.townImage_url },
        ]);

        this.loading = true;
        this.loadChart = true;

        this.locationService
          .getLocations(this.currentLocation.stateId, this.currentPage)
          .pipe(first())
          .subscribe((res) => {
            this.townList = res.data;

            this.LowValue = responseList[0].minPrice.toFixed(2);
            this.MaxValue = responseList[0].maxPrice.toFixed(2);

            if (res.data.length < 9) {
              this.paginationView = false;
            } else {
              this.paginationView = true;
            }
            this.currentPage = res.page;
            this.length = res.total;

            // breadcrumbsService.breadcrumbs[2].url =
            //   breadcrumbsService.breadcrumbs[2].url
            //     .split('-')[0]
            //     .toUpperCase() +
            //   '-' +
            //   breadcrumbsService.breadcrumbs[2].url.split('-')[1];
          });

        this.loaded = false;

        this.breadcrumbs = responseList[1].breadcrumbs;
        this.ctaText = responseList[1].ctaText;
        this.infoCheckBox = responseList[1].infoCheckBox;
        this.bsAltLine = responseList[1].bsAltLine;
        this.faqsContentTown = responseList[1].faqs;
        this.faQsSchema = responseList[1].faQsSchema;
        this.topTowns = responseList[1].topTowns;
        this.topCounties = responseList[1].topCounties;
        this.heatingOilPricesData = responseList[1].heatingOilPricesData;
        this.oilCompaniesData = responseList[1].oilCompaniesData;
        this.oilDeliverydata = responseList[1].oilDeliverydata;
        this.comparePricesText = responseList[1].underLine;

        if (this.loadedFirstTime == false) {
          this.loadedFirstTime = true;
          this.fetchForecast(this.townZip);
          this.fetchWeatherHistory(this.townZip);
        }

        this.addFaqsSchema();
      });
  }

  ngAfterViewInit() {
    // commented_v
    // this.content.ionScroll.subscribe(($event) => {
    //   let sc_position = $event.detail.scrollTop;
    //   if (sc_position > 196.66) {
    //     this.config.onScrollFix = true;
    //     this.config.islogin = true;
    //     this.config.login = true;
    //   } else {
    //     this.config.onScrollFix = false;
    //   }
    // });
  }

  fetchWeatherHistory(zip) {
    let url = `${environment.api_url}locations/weather-history?zip=${zip}`;

    this.locationService
      .GetWeatherHistory(url)
      .pipe(first())
      .subscribe((data) => {
        if (data) {
          this.stateWeatherHistory = data;
          this.enableComponent = true;
        }
      });
  }

  ngOnInit() {
    let sp = this.router.url.split('/')[2];
    this.config.updateCanonicalUrl(
      'https://heatfleet.com/' + this.config.typeURL + sp
    );
  }

  ionViewDidEnter() {
    this.config.onScrollFix = false;

    let innerWidth = this.window.innerWidth;

    this.config.innerWidth = innerWidth;

    if (this.config.innerWidth <= 500) {
      this.config.mobile_view = true;
    } else {
      this.config.mobile_view = false;
    }
  }


  ionViewWillEnter() {

  }

  pagesNumber(): Array<number> {
    let maxPages = Math.floor(this.length / this.totalItemsPerPage);
    let pages = new Array<number>();
    for (let i = this.currentPage - 1; i > this.currentPage - 5; i--) {
      if (i > 0) {
        pages.push(i);
      }
    }
    pages = pages.reverse();
    pages.push(this.currentPage);

    for (
      let i = this.currentPage + 1;
      i <= maxPages - 5 && i < this.currentPage + 5;
      i++
    ) {
      if (i <= maxPages && i < this.currentPage + 5) {
        pages.push(i);
      }
    }
    return pages;
  }
  public getRandomId() {
    return Math.floor(Math.random() * 6 + 1);
  }

  searchByText(text) {
    this.currentPage = 1;
    let search: string = text.target.value;
    this.currentSearchText = search.trim().toLowerCase();
    this.setPage(this.currentPage);
  }
  setPage(page: number) {
    this.currentPage = page;
    this.locationService
      .getLocations(
        this.currentLocation.stateId,
        this.currentPage,
        this.currentSearchText
      )
      .pipe(first())
      .subscribe((res) => {
        if (res.data) {
          if (res.data.length < 9) {
            this.paginationView = false;
          } else {
            this.paginationView = true;
          }

          res.data.forEach((element: any) => {
            element.imageUrl =
              element.imageUrl +
              `?tr=w-480 480w,` +
              element.imageUrl +
              `?tr=w-640 640w,` +
              element.imageUrl +
              `?tr=w-768 768w,` +
              element.imageUrl +
              `?tr=w-960 960w,` +
              element.imageUrl +
              `?tr=w-1024 1024w,` +
              element.imageUrl +
              `?tr=w-1366 1366w,` +
              element.imageUrl +
              `?tr=w-1600 1600w,` +
              element.imageUrl +
              `?tr=w-1920 1920w,` +
              element.imageUrl +
              `?tr=w-4096 4096w`;
          });
        }

        this.townList = [...res.data];

        this.currentPage = res.page;
        this.length = res.total;
      });
  }



  getClasses(n) {
    if (n == 0) {
      return 'home_service';
    }
    else if (n == 1) {
      return 'home_oil';
    }
    else if (n == 2) {
      return 'city';
    } else {
      return null;
    }
  }
  setDefaultImage(n) {
    return (n.default = true);
  }

  onImgError(event) {
    event.target.src = '/assets/icon/placeholder-rectangle.png';
  }


  townAv(n) {
    this.lastUpdate = n.lastUpdate;

    let national_avg_price =
      this.config.storageGet('national_avg_price')['__zone_symbol__value'];

    if (national_avg_price) {
      this.national_avg_price = national_avg_price;
    }

    let Avprice_town = n[n.length - 1].heatfleet;
    let total_annual: any = Avprice_town * this.annual_oil;

    total_annual = Number(total_annual).toFixed(2);
    total_annual = Number(total_annual).toLocaleString();

    let check_diff = Avprice_town - this.national_avg_price;

    let diff: any = Number(check_diff).toFixed(2);

    if (diff > 0) {
      var tpe = 'more expensive';
    } else {
      var tpe = 'cheaper';
    }
    diff = this.config.replaceAll(diff, '-', '');

    var data = {
      name:
        'How does the price per gallon of heating oil in ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' compare to the national average?',
      description:
        'Today, The ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' average heating oil price is $' +
        diff +
        '/gal ' +
        tpe +
        ' than the U.S. Average.',
      type: false,
      checked: false,
    };

    // this.faqsContentTown.push(data);

    let oneDayBefore = n.at(-2).heatfleet;
    let weekBefore = n.at(-6).heatfleet;

    let last: any = n[n.length - 1];

    let check_diff2 = last.heatfleet - oneDayBefore;
    let check_weekBefore = last.heatfleet - weekBefore;

    let diff2: any = Number(check_diff2).toFixed(2);

    if (diff2 == 0) {
      var type2 = 'unchanged compared to yesterday.';
    } else if (diff2 > 0) {
      diff2 = this.config.replaceAll(diff2, '-', '');
      var type2 = '$' + diff2 + ' higher than yesterday.';
    } else {
      diff2 = this.config.replaceAll(diff2, '-', '');
      var type2 = '$' + diff2 + ' lower than yesterday.';
    }

    let diff3: any = Number(check_weekBefore).toFixed(2);

    if (diff3 > 0) {
      var tpe3 = 'rose';
    } else {
      var tpe3 = 'fell';
    }

    diff3 = this.config.replaceAll(diff3, '-', '');

    if (diff3 == 0) {
      type2 =
        type2 +
        ' The price of heating oil in ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' is unchanged compared to last week.';
      //
    } else {
      type2 =
        type2 +
        ' The price of heating oil in ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' ' +
        tpe3 +
        ' by $' +
        diff3 +
        ' in the last week.';
    }

    // var data2 = {
    //   name:
    //     'Is the price of heating oil in ' +
    //     this.config.capitalize(this.currentLocation.stateName) +
    //     ' rising or falling?',
    //   description:
    //     'The average ' +
    //     this.config.capitalize(this.currentLocation.stateName) +
    //     ' heating oil price ' +
    //     ' is ' +
    //     type2,
    //   type: false,
    //   checked: false,
    // };

    // this.faqsContentTown.push(data2);

    var b = [].concat(n);
    b.sort(function (a, b) {
      return a.heatfleet - b.heatfleet;
    });
    var min = b[0];
    var max = b[b.length - 1];

    let averageValue = this.findAverage(n);
    averageValue = Number(averageValue).toFixed(2);
    let LowValue = Number(min.heatfleet).toFixed(2);
    let MaxValue = Number(max.heatfleet).toFixed(2);

    // var data3 = {
    //   name:
    //     'What is the best price per gallon of home heating oil in ' +
    //     this.config.capitalize(this.currentLocation.stateName) +
    //     ' ?',
    //   description:
    //     "Today's best price of heating oil in " +
    //     this.config.capitalize(this.currentLocation.stateName) +
    //     ' is $' +
    //     Number(min.heatfleet).toFixed(2) +
    //     '/gal. The price of heating oil in ' +
    //     this.config.capitalize(this.currentLocation.stateName) +
    //     ' ranges from a low of $' +
    //     LowValue +
    //     ' to a high of $' +
    //     MaxValue +
    //     '. The average heating oil price in ' +
    //     this.config.capitalize(this.currentLocation.stateName) +
    //     ' is $' +
    //     averageValue +
    //     '.',
    //   type: false,
    //   checked: false,
    // };

    // this.faqsContentTown.push(data3);

    var ser = '';
    var ser2 = '';
    if (this.fullserviceComapnies > 0) {
      ser =
        ' ' +
        this.fullserviceComapnies +
        ' full service heating oil companies offer both fuel oil delivery and boiler and furnace repair.';
    }

    if (this.discountComapnies > 0) {
      ser2 =
        ' ' +
        this.discountComapnies +
        ' discount companies offer heating oil, but do not offer furnace repair.';
    }

    // let data_ = {
    //   name:
    //     'How many residential heating oil companies deliver to ' +
    //     this.config.capitalize(this.currentLocation.stateName) +
    //     '?',
    //   description:
    //     this.totalCompanies +
    //     ' residential home heating oil companies deliver to ' +
    //     this.config.capitalize(this.currentLocation.stateName) +
    //     '.' +
    //     ser +
    //     ser2,
    //   type: false,
    //   checked: false,
    // };

    // this.faqsContentTown.push(data_);
  }

  findAverage(arr) {
    const { length } = arr;
    return arr.reduce((acc, val) => {
      return acc + val.heatfleet / length;
    }, 0);
  }

  loadMore() {
    this.showMore = false;
    this.showLess = true;
    this.townList = this.duplicateTownList;
  }

  loadLess() {
    this.showMore = true;
    this.showLess = false;
    this.townList = this.townList.slice(0, 30);
  }

  private getAPIUrl(uri: string): string {
    return `${environment.api_url}${uri}`;
  }

  protected getHttpOptions(withoutToken: boolean = false) {
    const token = environment.token;
    return {
      headers: new HttpHeaders({
        'X-Api-Key': `${environment.api_key}`,
        'DAVOS-IsMobile': environment.isMobile.toString(),
      }),
    };
  }

  fetchForecast(zip) {
    var url = this.getAPIUrl(
      'locations/heatingoil-forecast?zip=' +
      zip +
      '&homeSize=' +
      this.homeSize +
      '&oilHotWater=' +
      this.oilHotWater +
      '&householdSize=' +
      this.householdSize
    );

    this.locationService
      .GetHeatingOilForecast(url)
      .pipe(first())
      .subscribe((data) => {
        if (data) {
          this.annual_oil = +data[0].oilUse * 52;

          let annua_usage: any = data[0].oilUse * 52;
          annua_usage = Number(annua_usage).toLocaleString();

          // let faqsContentTown_ = [
          //   {
          //     name:
          //       'How many gallons of heating oil does a home in ' +
          //       this.config.capitalize(this.currentLocation.stateName) +
          //       ' burn annually?',
          //     description:
          //       'A 1,500 square foot home in ' +
          //       this.config.capitalize(this.currentLocation.stateName) +
          //       ' uses an average of ' +
          //       annua_usage +
          //       ' gallons each year.',
          //     type: false,
          //     checked: false,
          //   },

          //   {
          //     name:
          //       'How much heating oil will a home in ' +
          //       this.config.capitalize(this.currentLocation.stateName) +
          //       ' use in the upcoming week?',
          //     description:
          //       'In the upcoming week, the temperature in ' +
          //       this.config.capitalize(this.currentLocation.stateName) +
          //       ' is expected to drop to a low of ' +
          //       data[0].minTemp +
          //       ' °F. The average 1,500 square foot house will burn ' +
          //       data[0].oilUse.toFixed(1) +
          //       ' gallons of heating oil.',
          //     // The average 1,500 square foot house will burn [UpcomingWeekGallons] gallons of heating oil. This is [GallonDifference] [more/less] than last week, because the average temperature this week will be
          //     type: false,
          //     checked: false,
          //   },
          // ];
          // this.faqsContentTown = [...faqsContentTown_, ...this.faqsContentTown];
        }
      });
  }

  addFaqsSchema() {
    this.config.schema = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: this.tagName,
        url:
          'https:\u002F\u002F' +
          'heatfleet.com/' +
          this.config.typeURL +
          this.fields[0] +
          '-' +
          this.fields[1],
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: this.content_,
      },
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'WebSite',
        name: 'Heat Fleet',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
      },
    ];

    if (this.stateName == 'Connecticut') {
      this.config.schema[0].areaServed = this.Connecticut;
    } else if (this.stateName == 'Massachusetts') {
      this.config.schema[0].areaServed = this.Massachusetts;
    } else if (this.stateName == 'New York') {
      this.config.schema[0].areaServed = this.New_York;
    } else if (this.stateName == 'New Hampshire') {
      this.config.schema[0].areaServed = this.New_Hampshire;
    } else if (this.stateName == 'Vermont') {
      this.config.schema[0].areaServed = this.Vermont;
    } else if (this.stateName == 'Rhode Island') {
      this.config.schema[0].areaServed = this.Rhode_Island;
    } else if (this.stateName == 'Maine') {
      this.config.schema[0].areaServed = this.Maine;
    } else if (this.stateName == 'New Jersey') {
      this.config.schema[0].areaServed = this.New_Jersey;
    } else if (this.stateName == 'Pennsylvania') {
      this.config.schema[0].areaServed = this.Pennsylvania;
    } else if (this.stateName == 'Maryland') {
      this.config.schema[0].areaServed = this.Maryland;
    } else if (this.stateName == 'Long Island') {
      this.config.schema[0].areaServed = this.Long_Island;
    }

    if (this.breadcrumbs[0] && this.breadcrumbs[2]) {
      var bc = {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: '1',
            item: {
              '@id': '\u002F' + this.breadcrumbs[0].url,
              name: this.breadcrumbs[0].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '2',
            item: {
              '@id': '\u002F' + this.breadcrumbs[1].url,
              name: this.breadcrumbs[1].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '3',
            item: {
              '@id': '\u002F' + this.breadcrumbs[2].url,
              name: this.breadcrumbs[2].label,
            },
          },
        ],
      };
    }

    this.config.schema.push(bc);

    // let faq = {
    //   '@context': 'http:\u002F\u002Fschema.org',
    //   '@type': 'FAQPage',
    //   mainEntity: [],
    // };

    // let mainEntity = [];

    // this.faqsContentTown.forEach((el) => {
    //   mainEntity.push({
    //     '@type': 'Question',
    //     name: el.question,
    //     acceptedAnswer: {
    //       '@type': 'Answer',
    //       text:
    //         "\u003Cdiv class='faqItem'\u003E\u003Cdiv class='answer'\u003E" +
    //         el.answer +
    //         '\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E',
    //     },
    //   });
    // });

    // faq.mainEntity = mainEntity;

    let faq = this.faQsSchema;

    // var insertValue = faq;
    // var insertAt = 3;

    // [...this.config.schema[insertAt]] = [
    //   insertValue,
    //   this.config.schema[insertAt],
    // ];
    this.config.schema.push(faq);

    // this.config.schema = this.config.schema.flat();

    this.config.insertSchema(this.config.schema, 'structured-data-org');
  }

  navigateUrl(event, url) {
    event.preventDefault();
    this.router.navigate([url]);
  }
}
