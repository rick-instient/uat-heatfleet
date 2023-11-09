import { Component, ElementRef, HostListener, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ClientApiService } from 'src/app/shared/api/client.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { LocationService } from 'src/app/shared/api/location.service';
import { Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.config';
import { DOCUMENT } from '@angular/common';
import { SharedService } from 'src/app/shared/services/shared-service.service';
// import { isPlatformServer } from '@angular/common';
export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-town-profile',
  templateUrl: './town-profile.component.html',
  styleUrls: ['./town-profile.component.scss']
})
export class TownProfileComponent implements OnInit {
  @HostListener('scroll', ['$event'])
  @ViewChild('div', { static: true }) _div: ElementRef;
  private window: CustomWindow;
  data_map: any;
  pricesData: any;
  data_res: any = null;
  public loaded = false;
  public logoUrls_loaded = false;
  selectedTownName: string;
  selectedTownHash: string;

  selectedStateName: string;
  selectedStateHash: string;
  townPage = true;
  selectedRegionName: string;
  selectedRegionhash: string;
  townDescription: any;
  public fixed: boolean = false;
  public zipCodeInput: any;
  public zipIsValid = true;
  public isLoading = false;
  public userInitZip = '';
  public City = 'Unknown';
  public CityShort = 'Unknown';
  companySearchInput: any;
  firstEntered: boolean = true;
  searchContain: any;
  searchContainShow = false;
  deliverBy: any;
  townPrices: any = 'enable';
  townZip: any;
  townDetails: any;
  deviceId: any;
  enableImg: boolean = true;
  loading = false;
  townCompanies: any;
  breadcrumbs: any[] = [];
  enableCompanyData = false;
  showChart = false;
  townImage_url: any;
  stateName;
  logoUrls: any;

  enableTown: boolean = true;
  epochNow: any;
  townZip_loaded = false;
  breadcrumb_City: any;
  breadcrumb_Town: any;
  homeSize = 1500;
  oilHotWater = true;
  householdSize = 4;
  faqsContentTown = [];
  discountCompany: any;
  fullserviceCompany: any;
  lastUpdate: any;
  annual_oil: any;
  loadChart = false;
  national_avg_price: any;
  disableChart = false;
  srcSetConfig: any;
  otherTownImages = [];
  cityName: any;
  schema: any;
  townmapImage = true;
  fetchForecast_ = true;
  LowValue: any;
  MaxValue: any;
  isCompanyAvailable = false;
  routerUrl: any;
  townCompanies_Arr = [];
  showMore = false;
  showLess = false;
  showComponent = false;
  townWeatherHistory: any;
  nearestTowns: any;
  state_id: any;
  TownHash: any;
  comparePricesText: any;
  breadcrumbs_: any;
  ctaText: any;
  infoCheckBox: any;
  bsAltLine: any;
  enableComponent = false;
  faQsSchema: any;
  fields: any;
  content_: any;
  title_: any;
  heatingOilPricesData: any;
  oilCompaniesData: any;
  oilDeliverydata: any;
  topTowns: any;
  topCounties: any;
  quantityInput = 100;
  pageView = false;
  areaServed_: any;
  constructor(
    private locationService: LocationService,
    public sharedService: SharedService,
    protected route: ActivatedRoute,
    public router: Router,
    private clientApiService: ClientApiService,
    public config: CommonService,
    public http: HttpClient,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    // @Inject(PLATFORM_ID) private platformId: Object,
    public fb: FormBuilder
  ) {
    this.window = <any>this.document.defaultView;
    // new HttpHeaders().set('X-Content-Type-Options', 'nosniff');
    // new HttpHeaders().set(
    //   'Strict-Transport-Security',
    //   'max-age=31536000; includeSubDomains; preload'
    // );



    // commented_v
    // router.events.subscribe((event: NavigationStart) => {
    //   if (event.navigationTrigger === 'popstate') {
    //     let fields = event.url.split('-');
    //     let fields2 = this.router.url.split('-');
    //     if (
    //       !fields[2].includes('Cities.html') &&
    //       fields.length == 3 &&
    //       fields.length == fields2.length
    //     ) {
    //       this.window.location.reload();
    //     }
    //   }
    // });


  }

  fetchInit() {
    this.config.getTypeURL();

    this.routerUrl = this.router.url;
    this.fields = this.routerUrl.split('/')[2].split('-');
    this.cityName = this.config.replaceAll(this.fields[1], '_', ' ');
    this.stateName = this.config.replaceAll(this.fields[1], '_', ' ');
    this.state_id = this.config.replaceAll(this.fields[2], '.html', '');

    let city_ = this.cityName + ', ' + this.state_id.toUpperCase();

    if (this.config.typeParam == 'type=1') {
      this.title_ = "TODAY'S Best Heating Oil Deals in " + city_;
      this.content_ =
        city_ +
        ' HEATING OIL DEALS. Save up to $100 PER OIL DELIVERY. Enter your ZIP to instantly compare oil prices from trusted local heating oil companies.';

      if (this.title_.length > 60) {
        city_ = city_.replace(' Cape Cod', '');
        city_ = city_.replace(' South Shore Massachusetts', '');
        city_ = city_.replace(' Southern Maine', '');
        city_ = city_.replace(' Western Mass', '');
        city_ = city_.replace(' Mid Coast Maine', '');
        city_ = city_.replace(' Central Maine', '');
        city_ = city_.replace(' Long Island', '');

        this.title_ = "TODAY'S Best Heating Oil Deals in " + city_;
      }

      if (this.title_.length > 60) {
        this.title_ = 'Best Heating Oil Deals in ' + city_;
      }
    } else if (this.config.typeParam == 'subType=1') {
      this.title_ = 'TOP Oil Companies in ' + city_ + ' - Heating Oil';
      this.content_ =
        'Find reliable, affordable oil companies in ' +
        city_ +
        ' with our free heating oil directory. Save up to $100 PER OIL DELIVERY.';
      if (this.title_.length > 60) {
        city_ = city_.replace(' Cape Cod', '');
        city_ = city_.replace(' South Shore Massachusetts', '');
        city_ = city_.replace(' Southern Maine', '');
        city_ = city_.replace(' Western Mass', '');
        city_ = city_.replace(' Mid Coast Maine', '');
        city_ = city_.replace(' Central Maine', '');
        city_ = city_.replace(' Long Island', '');
        this.title_ = 'TOP Oil Companies in ' + city_ + ' - Heating Oil';
      }
    } else if (this.config.typeParam == 'subType=2') {
      this.title_ = "Today's BEST Heating Oil Prices in " + city_;
      this.content_ =
        'Find the best current oil prices in ' +
        city_ +
        ' with our free, instant fuel oil price search. Trusted local oil companies. Save up to $1.00 per gallon.';
      if (this.title_.length > 60) {
        city_ = city_.replace(' Cape Cod', '');
        city_ = city_.replace(' South Shore Massachusetts', '');
        city_ = city_.replace(' Southern Maine', '');
        city_ = city_.replace(' Western Mass', '');
        city_ = city_.replace(' Mid Coast Maine', '');
        city_ = city_.replace(' Central Maine', '');
        city_ = city_.replace(' Long Island', '');
        this.title_ = "Today's BEST Heating Oil Prices in " + city_;
      }
      if (this.title_.length > 60) {
        this.title_ = 'Best Heating Oil Prices in ' + city_;
      }
    } else if (this.config.typeParam == 'subType=3') {
      this.title_ = "TODAY's Heating Oil Delivery Deals in " + city_;
      this.content_ =
        'Find reliable, affordable oil delivery in ' +
        city_ +
        ' with our free heating oil search engine. Save up to $1.00 PER GALLON.';
      if (this.title_.length > 60) {
        city_ = city_.replace(' Cape Cod', '');
        city_ = city_.replace(' South Shore Massachusetts', '');
        city_ = city_.replace(' Southern Maine', '');
        city_ = city_.replace(' Western Mass', '');
        city_ = city_.replace(' Mid Coast Maine', '');
        city_ = city_.replace(' Central Maine', '');
        city_ = city_.replace(' Long Island', '');
        this.title_ = "TODAY's Heating Oil Delivery Deals in " + city_;
      }
      if (this.title_.length > 60) {
        this.title_ = 'Best Heating Oil Delivery Deals in ' + city_;
      }
    } else {
      this.title_ = 'Heating Oil Prices Near Me In ' + city_;

      this.content_ =
        'Find the best home heating oil prices in ' +
        city_ +
        "  with HeatFleet's oil price search engine.";
      if (this.title_.length > 60) {
        city_ = city_.replace(' Cape Cod', '');
        city_ = city_.replace(' South Shore Massachusetts', '');
        city_ = city_.replace(' Southern Maine', '');
        city_ = city_.replace(' Western Mass', '');
        city_ = city_.replace(' Mid Coast Maine', '');
        city_ = city_.replace(' Central Maine', '');
        city_ = city_.replace(' Long Island', '');
        this.title_ = 'Heating Oil Prices Near Me In ' + city_;
      }
    }

    this.title.setTitle(this.title_);

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
      { property: 'og:title', content: this.title_ },
      { property: 'og:url', content: this.router.url },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: this.content_ },
      { property: 'twitter:title', content: this.title_ },
      { property: 'twitter:site', content: this.router.url },
      {
        property: 'og:image',
        content:
          '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
    ]);

    this.TownHash = this.routerUrl.split('/')[2].split('-')[0];

    // this.makeTwoApiCalls();

  }

  getTownDetailsByHash() {
    console.log("getTownDetailsByHash");
    this.http.get(environment.api_url + `locations/getTownDetailsByHash?hash=${this.TownHash}`)
      .subscribe((res: any) => {
        this.sharedService.townHashApiData.next(res);
        this.townDetails = res;

        this.nearestTowns = this.townDetails.nearestTowns;
        this.areaServed_ = this.townDetails.areaServed;

        this.national_avg_price = res.national_avg_price;
        this.townZip = this.townDetails.zip;
        const imgurl = this.townDetails.image_url;

        this.townImage_url = imgurl;
        this.meta.addTags([
          { property: 'og:image', content: this.townImage_url },
          { property: 'twitter:image', content: this.townImage_url },
        ]);

        this.showComponent = true;

        this.otherTownImages = this.townDetails.otherTownImages;
        var townImageUrl;
        townImageUrl = this.townImage_url;

        this.srcSetConfig = `${townImageUrl}?tr=w-350 350w,${townImageUrl}?tr=w-480 480w, ${townImageUrl}?tr=w-500 500w`;

        var data_: any = [];
        data_.push(res)
        this.data_map = data_;

        this.loaded = true;
        this.townZip_loaded = true;

        this.loading = true;
        this.loadChart = true;
      });
  }
  getTownCompaniesByHash() {
    console.log("getTownCompaniesByHash");
    this.http.get(environment.api_url + 'locations/getTownCompaniesByHash?hash=' + this.TownHash)
      .subscribe((res: any) => {
        this.sharedService.townCompaniesHashApiData.next(res);
        this.townCompanies = [];
        this.townCompanies = res.data;

        this.isCompanyAvailable = res.activeCompaniesPresent;

        if (this.townCompanies.length) {
          this.enableCompanyData = true;
          this.discountCompany = '';
          this.fullserviceCompany = '';
          this.fullserviceCompany = res.fullServiceCompaniesCount;
          this.discountCompany = res.discountCompaniesCount;
          this.comparePricesText = res.underLine;

          this.logoUrls = res.logoUrls;


          // this.LowValue = res.lowPrice.toFixed(2);
          // this.MaxValue = res.highPrice.toFixed(2);


          if (this.config.mobile_view) {
            if (this.townCompanies && this.townCompanies.length > 15) {
              this.showMore = true;
            }
            this.townCompanies_Arr = this.townCompanies.slice(0, 15);
          } else {
            if (this.townCompanies && this.townCompanies.length > 30) {
              this.showMore = true;
              this.townCompanies_Arr = this.townCompanies.slice(0, 30);
            } else {
              this.townCompanies_Arr = this.townCompanies;
            }
          }
        }
      });
  }

  getPageDetails() {



    console.log("getPageDetails");
    let stateName = this.config.getCityName(this.state_id.toUpperCase());

    var type_ = '';
    if (this.config.typeParam != 'type=1') {
      var type_ = this.config.typeCategory + '&';
    }

    let url3 = type_ + this.config.typeParam + '&level=4&stateId=' + this.state_id.toUpperCase() + '&stateName=' +
      stateName + '&townName=' + this.stateName + '&townHash=' + this.TownHash;

    const url1Api = this.http.get(environment.api_url + `locations/getPageDetails?${url3}`);

    url1Api.subscribe((res: any) => {
      this.sharedService.getPageDetailsApiData.next(res);

      this.loaded = false;

      this.infoCheckBox = res.infoCheckBox;
      this.breadcrumbs_ = res.breadcrumbs;
      this.ctaText = res.ctaText;
      this.infoCheckBox = res.infoCheckBox;
      this.bsAltLine = res.bsAltLine;
      this.faqsContentTown = res.faqs;
      this.faQsSchema = res.faQsSchema;
      this.oilCompaniesData = res.oilCompaniesData;
      this.heatingOilPricesData = res.heatingOilPricesData;
      this.oilDeliverydata = res.oilDeliverydata;
      this.comparePricesText = res.underLine;
      this.addSchema();
    });


    // this.http.get(environment.api_url + `locations/getPageDetails?${url3}`)
    //   .subscribe((res: any) => {


    //     this.infoCheckBox = res.infoCheckBox;
    //     this.breadcrumbs_ = res.breadcrumbs;
    //     this.ctaText = res.ctaText;
    //     this.infoCheckBox = res.infoCheckBox;
    //     this.bsAltLine = res.bsAltLine;
    //     this.faqsContentTown = res.faqs;
    //     this.faQsSchema = res.faQsSchema;
    //     this.oilCompaniesData = res.oilCompaniesData;
    //     this.heatingOilPricesData = res.heatingOilPricesData;
    //     this.oilDeliverydata = res.oilDeliverydata;
    //     this.comparePricesText = res.underLine;
    //     this.topTowns = res.topTowns;
    //     this.topCounties = res.topCounties;
    //     this.pageView = true;
    //   });
  }


  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  ngOnInit() {

    this.fetchInit();
    this.getTownDetailsByHash();
    this.getTownCompaniesByHash();
    this.getPageDetails();


    this.document.addEventListener('scroll', (ev) => {
      this.keepTrack();
    })


    let inputFields = this.router.url.split('-');
    let stateHash = inputFields[1];

    this.selectedTownHash = this.config.replaceAll(inputFields[2], '.html', '');
    this.selectedTownName = inputFields[1];
    var url_ = this.routerUrl;

    if (stateHash != 'li') {
      this.config.updateCanonicalUrl('https://heatfleet.com' + url_);
    } else {
      var canonical_url =
        'https://heatfleet.com/' +
        this.config.typeURL +
        this.selectedTownHash.toUpperCase() +
        '-' +
        this.selectedTownName +
        '-NY.html';
      this.config.updateCanonicalUrl(canonical_url);
    }
  }

  keepTrack() {
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

  schemaAdd(breadcrumbsService, fields, title_content, content) {
    this.config.schema = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: title_content,
        url:
          'https:\u002F\u002F' +
          'heatfleet.com' +
          fields[0] +
          '-' +
          fields[1] +
          '-' +
          fields[2] +
          '-' +
          fields[3] +
          '-' +
          fields[4] +
          '-' +
          fields[5],
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: content,
        areaServed: [],
      },
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'WebSite',
        name: 'Heat Fleet',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
        potentialAction: {
          '@type': 'SearchAction',
          target: '',
          'query-input': '',
        },
      },
    ];

    if (
      breadcrumbsService.breadcrumbs[0] &&
      breadcrumbsService.breadcrumbs[3]
    ) {
      var bc = {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: '1',
            item: {
              '@id': '\u002F' + breadcrumbsService.breadcrumbs[0].url,
              name: breadcrumbsService.breadcrumbs[0].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '2',
            item: {
              '@id':
                '\u002F' +
                this.config.typeURL +
                '\u002F' +
                breadcrumbsService.breadcrumbs[1].url,
              name: breadcrumbsService.breadcrumbs[1].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '3',
            item: {
              '@id':
                '\u002F' +
                this.config.typeURL +
                '\u002F' +
                breadcrumbsService.breadcrumbs[2].url,
              name: breadcrumbsService.breadcrumbs[2].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '4',
            item: {
              '@id':
                '\u002F' +
                this.config.typeURL +
                '\u002F' +
                breadcrumbsService.breadcrumbs[3].url,
              name: breadcrumbsService.breadcrumbs[3].label,
            },
          },
        ],
      };
    }

    this.config.schema[1].potentialAction.target =
      'https://heatfleet.com/oil-select-provider/{zip}/0/0/4/100';
    this.config.schema[1].potentialAction['query-input'] = 'required name=zip';
    this.config.schema.push(bc);

    this.config.insertSchema(this.config.schema, 'structured-data-org');
  }

  private getUrl(uri: string): string {
    return `${environment.api_url}${uri}`;
  }

  loadMore() {
    this.showMore = false;
    this.showLess = true;

    this.townCompanies_Arr = this.townCompanies;
  }

  loadLess() {
    this.showMore = true;
    this.showLess = false;

    this.townCompanies_Arr = this.townCompanies_Arr.slice(0, 30);
  }

  toggleClick() {
    if (this.showMore) {
      this.loadMore();
    } else {
      this.loadLess();
    }
  }

  quantity: any;

  ngAfterViewInit() {
    // commented_v
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

  protected getHttpOptions(withoutToken: boolean = false) {
    const token = environment.token;
    return {
      headers: new HttpHeaders({
        'X-Api-Key': `${environment.api_key}`,
        'DAVOS-IsMobile': environment.isMobile.toString(),
      }),
    };
  }

  DataOutputEv(n) {
    if (n == true) {
      this.showChart = true;
    }
  }

  getClasses(n) {
    if (n == 0) {
      return 'home_service';
    } else if (n == 1) {
      return 'prices';
    } else if (n == 2) {
      return 'city';
    } else {
      return null;
    }
  }

  onImgError(event) {
    this.townmapImage = false;
    event.target.src = '/assets/icon/placeholder-rectangle.png';
  }

  fetchImageURL(compId) {
    let objIndex = this.townCompanies.findIndex(
      (obj) => obj.companyHash == compId
    );
    if (objIndex > -1) this.townCompanies[objIndex]['isDefaultLogo'] = true;
  }

  fetchWeatherHistory(zip) {
    var url = this.getUrl('locations/weather-history?zip=' + zip);

    this.locationService
      .GetWeatherHistory(url)
      .pipe(first())
      .subscribe((data) => {
        if (data) {
          this.fetchForecast_ = false;
          this.townWeatherHistory = data;
          this.enableComponent = true;
        }
      });
  }

  townAv(n) {
    if (!n && this.fetchForecast_) {
      this.fetchForecast_ = false;

      this.fetchWeatherHistory(this.townZip);
      return;
    }

    this.lastUpdate = n.lastUpdate;

    if (this.fetchForecast_) {
      this.fetchForecast_ = false;

      this.fetchWeatherHistory(this.townZip);
    }
  }

  addFaqsSchema() {
    let faq = this.faQsSchema;

    this.config.schema.push(faq);


    this.config.schema[0].areaServed = [];

    if (this.townDetails.areaServed) {
      this.config.schema[0].areaServed = this.townDetails.areaServed;
    }

    this.config.insertSchema(this.config.schema, 'structured-data-org');
  }
  findAverage(arr) {
    const { length } = arr;
    return arr.reduce((acc, val) => {
      return acc + val.heatfleet / length;
    }, 0);
  }

  navigateUrl(event, url) {
    event.preventDefault();

    this.router.navigate([url]);
  }

  get_otherTownImages(n) {
    return this.otherTownImages[n];
  }

  otherTownImages_Click(n) {
    var width = '';
    if (n == '1') {
      if (this.otherTownImages[0].zoom == 'W') {
        width = '/tr:w-0.5,h-0.75';
      }
      return this.otherTownImages[0].imageURL + width;
    } else if (n == '2') {
      if (this.otherTownImages[1].zoom == 'W') {
        width = '/tr:w-0.5,h-0.75';
      }
      return this.otherTownImages[1].imageURL + width;
    } else if (n == '3') {
      if (this.otherTownImages[2].zoom == 'W') {
        width = '/tr:w-0.5,h-0.75';
      }

      return this.otherTownImages[2].imageURL + width;
    } else if (n == '4') {
      if (this.otherTownImages[3].zoom == 'W') {
        width = '/tr:w-0.5,h-0.75';
      }

      return this.otherTownImages[3].imageURL + width;
    } else {
      return false;
    }
  }

  selectedZip(n) {
    this.townZip = n;
    this.zipCodeInput = this.townZip;
    // commented_v
    // this.cart.zipCode = this.zipCodeInput;

    // this.cart.city = this.cart.city;
    // this.cart.state = this.cart.state;
    // this.cart.amount = this.quantityInput;

    // this.cookieHelper.setCart(this.cart);

    // this.addNavigationHistoryItem('defaultcity', this.cart.city);
    // commented_v
    // this.addNavigationHistoryItem('defaultstate', this.cart.state);

    this.config.companyNavigate = false;
    // commented_v
    // if (this.cart.isDealAvailable) {
    //   var orderType = ServiceType.OilDelivery;

    //   var qty = JSON.stringify(this.quantityInput);
    //   this.addNavigationHistoryItem('quantityEntered', JSON.stringify(qty));
    //   this.addNavigationHistoryItem('home', `${this.quantityInput} gal`);

    //   // this.addNavigationHistoryItem('AddressInput', this.AddressInput);
    //   // this.addNavigationHistoryItem('AddressInput_Id', this.AddressInput_Id);

    //   this.navCtrl.navigateRoot([
    //     this.URLS.CLIENT_SELECT_OIL_PROVIDER,
    //     this.cart.zipCode,
    //     0,
    //     this.customerType,
    //     orderType,
    //     this.quantityInput,
    //   ]);
    // } else {
    //   var orderType = ServiceType.OilDelivery;
    //   this.clientApiService.IsDealAvailable = true;

    //   var today = new Date();

    //   var tomorrow = new Date(today);
    //   tomorrow.setDate(today.getDate() + 1);

    //   var year = tomorrow.getFullYear();
    //   var month = tomorrow.getMonth() + 1;
    //   var day = tomorrow.getDate();
    //   let len = JSON.stringify(month).length;

    //   var newMonth: any;

    //   if (len == 1) {
    //     newMonth = JSON.stringify(0) + month;
    //   } else {
    //     newMonth = month;
    //   }

    //   let default_date =
    //     JSON.stringify(year) + '/' + newMonth + '/' + JSON.stringify(day);
    //   this.clientApiService.defaultDate = default_date;
    //   var formatted = JSON.stringify(year) + newMonth + JSON.stringify(day);

    //   this.quantityInput = 100;
    //   // commented_v
    //   // this.addNavigationHistoryItem('home', `${this.quantityInput} gal`);
    //   // this.addNavigationHistoryItem('AddressInput', this.AddressInput);
    //   // this.addNavigationHistoryItem('AddressInput_Id', this.AddressInput_Id);
    //   this.config.navigateCompanyId = null;

    //   // commented_v
    //   // this.navCtrl.navigateRoot([
    //   //   this.URLS.CLIENT_SELECT_OIL_PROVIDER,
    //   //   this.cart.zipCode,
    //   //   0,
    //   //   this.customerType,
    //   //   orderType,
    //   //   this.quantityInput,
    //   // ]);
    // }
  }

  ngOnDestroy() {
    this.sharedService.getPageDetailsApiData.next({});
    this.sharedService.townHashApiData.next({});
    this.sharedService.townCompaniesHashApiData.next({});
  }

  addSchema() {
    this.config.schema = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: this.title_,
        url:
          'https:\u002F\u002F' +
          'heatfleet.com/' +
          this.config.typeURL +
          this.fields[0] +
          '-' +
          this.fields[1] +
          '-' +
          this.fields[2],
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: this.content_,
        areaServed: [],

      },
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'WebSite',
        name: 'Heat Fleet',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
        potentialAction: {
          '@type': 'SearchAction',
          target: '',
          'query-input': '',
        },
      },
    ];

    let arr = this.townCompanies_Arr.slice(0, 9);


    if (this.config.typeParam == 'subType=2') {
      this.config.schema[0].offers = [];
      let off = [];
      arr.forEach((el) => {
        if (el.price) {
          off.push({
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: el.price,
              priceCurrency: 'USD',
            },
          });
        }
      });


      this.config.schema[0].makesOffer = off;
    }

    this.config.schema[1].potentialAction.target =
      this.config.schema[1].potentialAction.target =
      'https://heatfleet.com/oil-select-provider/{zip}/0/0/4/100';
    this.config.schema[1].potentialAction['query-input'] =
      'required name=zip';

    if (this.breadcrumbs_[0] && this.breadcrumbs_[3]) {
      var bc = {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: '1',
            item: {
              '@id': '\u002F',
              name: this.breadcrumbs_[0].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '2',
            item: {
              '@id': '\u002F' + this.breadcrumbs_[1].url,
              name: this.breadcrumbs_[1].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '3',
            item: {
              '@id': '\u002F' + this.breadcrumbs_[2].url,
              name: this.breadcrumbs_[2].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '4',
            item: {
              '@id': '\u002F' + this.breadcrumbs_[3].url,
              name: this.breadcrumbs_[3].label,
            },
          },
        ],
      };
    }

    this.config.schema.push(bc);

    this.config.schema.push(this.faQsSchema);

    this.config.schema[0].areaServed = [];

    if (this.townDetails.areaServed) {
      this.config.schema[0].areaServed = this.townDetails.areaServed;
    }

    this.config.insertSchema(this.config.schema, 'structured-data-org');
  }
}
