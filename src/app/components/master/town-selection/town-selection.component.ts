import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { Router } from '@angular/router';
// import { capitalizeWords } from 'src/shared/utils/string.utils';
import { LocationService } from 'src/app/shared/api/location.service';
import { ILocation } from 'src/app/shared/models/location.model';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { BreadcrumbsService } from 'src/shared/services/breadcrumbs.service';
import { CommonService } from 'src/app/shared/services/common.config';

import { Title, Meta } from '@angular/platform-browser';
// import { WINDOW } from 'src/app/shared/services/window.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
// import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-town-selection',
  templateUrl: './town-selection.component.html',
  styleUrls: ['./town-selection.component.scss']
})

export class TownSelectionComponent implements OnInit {
  townList: any;

  // @ViewChild(IonContent)
  // content: IonContent;
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
  logoUrls = [];
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
  routerUrl: any;
  // countyName: any = null;
  oneTime = true;
  CountyName: any;
  breadcrumbs: any;
  bsAltLine: any;
  slug: any;
  constructor(
    private locationService: LocationService,
    private router: Router,
    // public breadcrumbsService: BreadcrumbsService,
    public config: CommonService,
    // private navCtrl: NavController,
    private title: Title,
    private meta: Meta,
    // @Inject(WINDOW) public window: Window,
    public http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    // @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // if (isPlatformServer(this.platformId)) {

    // } else {

    // router.events.subscribe((event: any) => {
    //   if (event.type == 15 && event.routerEvent.url.includes('Cities')) {
    //     this.fetchInit();
    //   } else if (event.type == 16) {
    //     this.fetchInit();
    //   }
    // });
    // }


  }

  ngOnInit() {
    // this.router.events.subscribe((event: any) => {
    //   if (event.type == 15 && event.routerEvent.url.includes('Cities')) {
    //     this.fetchInit();
    //   } else if (event.type == 16) {
    //     this.fetchInit();
    //   }
    // });

    this.fetchInit();

    this.getCities(this.slug, this.CountyName).subscribe((response: any) => {
      this.routerUrl = this.router.url;
      this.townList = response;
      this.loading = true;
      this.loadChart = true;
      this.loaded = false;
    },
    (error) => {
      this.loaded = false;
    }
    )
  }

  ngOnChanges() { }

  fetchInit() {
    this.config.getTypeURL();
    this.oneTime = false;
    let routeUrl = this.router.url;
    let fields = routeUrl.split('/');

    var slug = fields[2].replace('.html', '');

    if (slug === 'Cities') {
      slug = null;
      this.stateName = 'United States of America';
      let sp = this.router.url.split('/')[2];

      this.config.updateCanonicalUrl(
        'https://heatfleet.com/' + this.config.typeURL + sp
      );
    } else {
      slug = fields[2].split('-')[0].trim();
      this.stateName = this.config.replaceAll(
        fields[2].split('-')[1].trim(),
        '_',
        ' '
      );
      let sp = this.router.url.split('/')[2];
      this.config.updateCanonicalUrl(
        'https://heatfleet.com/' + this.config.typeURL + sp
      );
    }

    var county = '';
    let siteUrl;

    if (fields[2].split('-').length == 4) {
      // this.CountyName = fields[2].split('-')[2].split('_')[0];
      this.CountyName = fields[2].split('-')[2];
      this.CountyName = this.CountyName.replace('_County', '');
      console.log(this.CountyName);

      this.CountyName = this.CountyName.replace(/_/g, ' ');
      console.log(this.CountyName);

      county = this.CountyName + ', ' + this.stateName;
      siteUrl = fields[2];
    } else {
      county = this.stateName;
      siteUrl = fields[2];
    }

    if (this.config.typeParam == 'type=1') {
      var type = 'Heating Oil';
      var description =
        'Save money with our town by town heating oil directory. Comprehensive directory stretching from Maine to Virginia and everywhere in between.';
    } else if (this.config.typeParam == 'subType=1') {
      var type = 'Heating Oil Companies';
      var description =
        'A comprehensive town by town directory of oil companies. Listed by discount (oil delivery only) and full-service (oil delivery and furnace repair).';
    } else if (this.config.typeParam == 'subType=2') {
      var type = 'Heating Oil Prices';
      var description =
        'Find the best oil prices per gallon right now in your town. You could SAVE UP TO $100 PER DELIVERY! Save money and stay warm with Heat Fleet!';
    } else if (this.config.typeParam == 'subType=3') {
      var type = 'Oil Delivery';
      var description =
        "Homeowners' most complete town by town oil delivery guide in America. Search for heating oil companies and today's best oil prices per gallon.";
    } else if (this.config.typeParam == 'type=2') {
      var type = 'Heating Repair';
      var description =
        'Save money with our town by town heating oil directory. Comprehensive directory stretching from Maine to Virginia and everywhere in between.';
    }

    var title_ = 'Cities In ' + county + ' with ' + type;

    if (title_.length > 60) {
      if (fields[2].split('-').length == 4) {
        let state_code = this.config.fetchStateCode(this.stateName);
        county = this.CountyName + ', ' + state_code;
      }

      county = county.replace('South Shore Massachusetts', 'South Shore MA');

      var title_ = 'Cities In ' + county + ' with ' + type;
    }

    // if (this.config.breadcrumbNav.type == 1) {
    //   var url_ = this.config.breadcrumbNav.url;
    // } else {
    //   var url_ = this.config.typeURL.replace('/', '.html')
    // }
    var url_ = this.config.typeURL.replace('/', '.html');

    var label_ = type + ' by City';
    slug = fields[2].replace('.html', '');

    if (slug === 'Cities') {
      slug = null;
      if (type == 'Oil Delivery') {
        this.bsAltLine = 'Search Heating ' + type + ' by City';
      } else {
        this.bsAltLine = 'Search ' + type + ' by City';
      }
      this.tagName = label_;
    } else {
      slug = fields[2].split('-')[0].trim();
      if (type == 'Oil Delivery') {
        this.bsAltLine = 'Search Heating ' + type + ' in ' + county;
      } else {
        this.bsAltLine = 'Search ' + type + ' in ' + county;
      }
      this.tagName = title_;

      if (fields[2].split('-').length == 4) {
        if (type == 'Oil Delivery') {
          this.bsAltLine =
            'Search ' +
            this.CountyName +
            ' County Heating ' +
            type +
            ' by City';
        } else {
          this.bsAltLine =
            'Search ' + this.CountyName + ' County ' + type + ' by City';
        }
        label_ = 'Search ' + this.CountyName + ' County ' + type + ' by City';
        this.tagName = label_;
      }
    }
    this.title.setTitle(this.tagName);

    this.meta.updateTag({
      name: 'description',
      content: description,
    });

    this.breadcrumbs = [
      {
        label: 'Home',
        url: '',
      },
      {
        label: type,
        url: url_,
      },
      {
        label: label_,
        url: '',
      },
    ];

    this.config.schema = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: this.tagName,
        url:
          'https:\u002F\u002F' +
          'heatfleet.com/' +
          this.config.typeURL +
          siteUrl,
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: description,
      },
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'WebSite',
        name: 'Heat Fleet',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
      },
    ];
    this.config.insertSchema(this.config.schema, 'structured-data-org');
    this.meta.addTags([
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: this.tagName },
      { property: 'og:url', content: this.router.url },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: description },
      { property: 'twitter:title', content: this.tagName },
      { property: 'twitter:site', content: this.router.url },
      {
        property: 'og:image',
        content: '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
      {
        property: 'twitter:image',
        content: '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
    ]);

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

    if (slug) {
      this.currentStateHash = this.router.url
        .split('/')[1]
        .split('-')[0]
        .trim();
    }

    this.slug = slug;

    // this.getCities(slug, this.CountyName).subscribe((response: any) => {
    //   this.routerUrl = this.router.url;
    //   this.townList = response;
    //   this.loading = true;
    //   this.loadChart = true;
    //   this.loaded = false;
    // },
    // (error) => {
    //   this.loaded = false;
    // }
    // )

    // this.locationService
    //   .getCitiesByState(slug, this.CountyName)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.routerUrl = this.router.url;
    //       this.townList = data;
    //       // this.townZip = data.zipcode;
    //       // this.national_avg_price = data.nationalAvgPrice;
    //       // this.totalCompanies = data.totalCompanies;
    //       // this.fullserviceComapnies = data.fullserviceComapnies;
    //       // this.discountComapnies = data.discountComapnies;

    //       // this.townImage_url = data.townImage;

    //       // this.faqsContentTown.push;

    //       this.loading = true;
    //       this.loadChart = true;

    //       this.loaded = false;

    //       let topSection = this.document.getElementById('topSection');
    //       let header = this.document.getElementById('header');

    //       // this.content.scrollToPoint(
    //       //   0,
    //       //   topSection.offsetTop - header.clientHeight - 5
    //       // );

    //       // if (this.loadedFirstTime == false) {
    //       //   this.loadedFirstTime = true;
    //       //   this.fetchForecast(this.townZip);
    //       // }
    //     },
    //     (error) => {
    //       this.loaded = false;
    //     }
    //   );
  }

  ionViewDidEnter() {
    this.config.onScrollFix = false;

    // let innerWidth = this.window.innerWidth;

    this.config.innerWidth = innerWidth;

    if (this.config.innerWidth <= 500) {
      this.config.mobile_view = true;
    } else {
      this.config.mobile_view = false;
    }
  }

  scrollTop() {
    // this.content.scrollToTop(0);
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


  setDefaultImage(n) {
    return (n.default = true);
  }

  onImgError(event) {
    event.target.src = '/assets/icon/placeholder-rectangle.png';
  }

  navigate(city) {
    // this.navCtrl.navigateRoot([this.config.typeURL + this.getUrl(city)]);
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

    this.faqsContentTown.push(data);

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

    var data2 = {
      name:
        'Is the price of heating oil in ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' rising or falling?',
      description:
        'The average ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' heating oil price ' +
        ' is ' +
        type2,
      type: false,
      checked: false,
    };

    this.faqsContentTown.push(data2);

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

    var data3 = {
      name:
        'What is the best price per gallon of home heating oil in ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' ?',
      description:
        "Today's best price of heating oil in " +
        this.config.capitalize(this.currentLocation.stateName) +
        ' is $' +
        Number(min.heatfleet).toFixed(2) +
        '/gal. The price of heating oil in ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' ranges from a low of $' +
        LowValue +
        ' to a high of $' +
        MaxValue +
        '. The average heating oil price in ' +
        this.config.capitalize(this.currentLocation.stateName) +
        ' is $' +
        averageValue +
        '.',
      type: false,
      checked: false,
    };

    this.faqsContentTown.push(data3);

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

    let data_ = {
      name:
        'How many residential heating oil companies deliver to ' +
        this.config.capitalize(this.currentLocation.stateName) +
        '?',
      description:
        this.totalCompanies +
        ' residential home heating oil companies deliver to ' +
        this.config.capitalize(this.currentLocation.stateName) +
        '.' +
        ser +
        ser2,
      type: false,
      checked: false,
    };

    this.faqsContentTown.push(data_);

    setTimeout(() => {
      this.addFaqsSchema();
    }, 2000);
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

  ngAfterViewInit() {
    // this.content.ionScroll.subscribe(($event) => {
    //   let sc_position = $event.detail.scrollTop;
    //   if (sc_position > 196.66) {
    //     this.config.onScrollFix = true;
    //     this.config.islogin = true;
    //     this.config.login = true;
    //     this.config.dealer = true;
    //   } else {
    //     this.config.onScrollFix = false;
    //   }
    // });
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

          let faqsContentTown_ = [
            {
              name:
                'How many gallons of heating oil does a home in ' +
                this.config.capitalize(this.currentLocation.stateName) +
                ' burn annually?',
              description:
                'A 1,500 square foot home in ' +
                this.config.capitalize(this.currentLocation.stateName) +
                ' uses an average of ' +
                annua_usage +
                ' gallons each year.',
              type: false,
              checked: false,
            },

            {
              name:
                'How much heating oil will a home in ' +
                this.config.capitalize(this.currentLocation.stateName) +
                ' use in the upcoming week?',
              description:
                'In the upcoming week, the temperature in ' +
                this.config.capitalize(this.currentLocation.stateName) +
                ' is expected to drop to a low of ' +
                data[0].minTemp +
                ' °F. The average 1,500 square foot house will burn ' +
                data[0].oilUse.toFixed(1) +
                ' gallons of heating oil.',
              // The average 1,500 square foot house will burn [UpcomingWeekGallons] gallons of heating oil. This is [GallonDifference] [more/less] than last week, because the average temperature this week will be
              type: false,
              checked: false,
            },
          ];
          this.faqsContentTown = [...faqsContentTown_, ...this.faqsContentTown];
        }
      });
  }

  addFaqsSchema() {
    let faq = {
      '@context': 'http:\u002F\u002Fschema.org',
      '@type': 'FAQPage',
      mainEntity: [],
    };

    let mainEntity = [];

    this.faqsContentTown.forEach((el) => {
      mainEntity.push({
        '@type': 'Question',
        name: el.name,
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "\u003Cdiv class='faqItem'\u003E\u003Cdiv class='answer'\u003E" +
            el.description +
            '\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E',
        },
      });
    });

    faq.mainEntity = mainEntity;

    var insertValue = faq;
    var insertAt = 3;

    [...this.config.schema[insertAt]] = [
      insertValue,
      this.config.schema[insertAt],
    ];

    // this.config.schema = this.config.schema.flat();

    this.config.insertSchema(this.config.schema, 'structured-data-org');
  }

  navigateUrl(event, url) {
    event.preventDefault();
    this.router.navigate([url]);
  }

  getUrl(loc: ILocation) {
    let businessType = 's01';

    let businesshash = this.router.url.split('/')[2].split('-')[1].trim();

    let townName = loc.isRegion
      ? loc.townName + ' ' + loc.regionName
      : loc.townName;

    let stateName;
    if (loc.stateName) {
      stateName = loc.stateName;
    } else {
      stateName = this.stateName;
    }
    if (townName.length === 3) {
      townName = townName + '_';
    }

    // let url = `${businessType.replace(/ /g, '_')}-${loc.stateId}-${
    //   loc.hash
    // }-${capitalizeWords(townName).replace(/ /g, '_')}-${capitalizeWords(
    //   stateName
    // ).replace(/ /g, '_')}-Heating_Oil_Prices.html`;

    townName = townName.replace(/\b\w/g, (match) => match.toUpperCase());
    stateName = stateName.replace(/\b\w/g, (match) => match.toUpperCase());

    let url = `${businessType.replace(/ /g, '_')}-${loc.stateId}-${loc.hash
      }-${townName.replace(/ /g, '_')}-${stateName.replace(
        / /g,
        '_'
      )}-Heating_Oil_Prices.html`;

    return url;
  }

  goToCompanyPage(n, event, fig) {
    let townName = this.config.replaceAll(n.townName, ' ', '_');

    if (townName.length === 3) {
      townName = townName + '_';
    }

    if (n.isRegion) {
      n.regionName = n.regionName
        .replace(/\b\w/g, (match) => match.toUpperCase())
        .replace(/\s/g, '_');

      var url =
        this.config.typeURL +
        n.hash +
        '-' +
        townName +
        '_' +
        n.regionName +
        '-' +
        n.stateId +
        '.html';
      url = url.replace(/__/g, '_');
    } else {
      var url =
        this.config.typeURL +
        n.hash +
        '-' +
        townName +
        '-' +
        n.stateId +
        '.html';
    }

    if (fig == true) {
      event.preventDefault();
      this.config.navigate(url);
      return false;
      // this.navCtrl.navigateRoot([url]);
    } else {
      return url;
    }
  }

  navigateUrl_(event, url) {
    event.preventDefault();
    this.config.navigate(url);
    // this.navCtrl.navigateRoot([url]);
  }

  getCities(hash:any, countyName:any){
    let vr = '';
    if (hash != null) {
      if (countyName) {
        countyName = encodeURIComponent(countyName);
        vr = '?stateId=' + hash + `&countyName=` + countyName;
      } else {
        vr = '?stateId=' + hash;
      }
    }
    const url = environment.api_url + `locations/getCitiesByState` + vr;

    return this.http.get(url);
  }



}
