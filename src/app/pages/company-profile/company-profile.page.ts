import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  PLATFORM_ID,
} from '@angular/core';
import {
  HttpClient,
  HttpBackend,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
// import { BreadcrumbsService } from 'src/shared/services/breadcrumbs.service';
// import { ClientBaseComponent } from '../../components/clientbase.component';
// import {
//   AuthenticationService,
//   ConstructorParams,
//   CookieHelper,
//   EventBus,
// } from 'src/shared';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
// import { SuspiciousUserDialogComponent } from '../../dialogs/suspicious-user-dialog/suspicious-user-dialog.component';
import { ClientApiService } from 'src/app/shared/api/client.service';
import { NetworkService } from 'src/app/shared/api/network.service';
// import { NotifyZipDialogComponent } from '../../dialogs/notify-zip-dialog/notify-zip-dialog.component';
// import { ServiceType } from 'src/shared/models/general.model';
import { FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.config';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
// import { isPlatformServer } from '@angular/common';
import { ServiceType } from 'src/app/shared/models/types';
import { HostListener } from '@angular/core';

export interface CustomWindow extends Window {

  customProperty: boolean;
}


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePage implements OnInit {
  // @ViewChild('slides') ionSlides: IonSlides;
  // @ViewChild(IonContent)
  modalView = false;
  Error:any;
  customerType = 0;
  cart :any= {};
  private window: CustomWindow;
  companyDescriptions: any;
  companyData: any;
  routeSub: any;
  currentSlug: string;
  mapImageURL: any;
  selectedTownName: string = '';
  selectedTownHash: string = '';
  selectedCompanyHash: string = '';
  public zipCodeInput: any;
  public defaultZip: any;
  public quantityInput = 100;
  minimumQuantity: any;
  public isLoading = false;
  public City = 'Unknown';
  truckImage = true;
  companyImage = true;
  vanImage = true;
  firstEntered: boolean = true;
  public quantityInput_withGal = '100 gal';
  loaded = false;
  state_: any;
  CompanyProfile: any;
  cashHeating = false;
  company_Id: any;
  loadData = true;
  epochNow: any;
  CompanyLogoUrl: any;
  companyName: any;
  logoAltTag: any;
  loadChart = false;
  data_res: any = null;
  disableChart = false;
  showTime = true;
  closestTerminal: any;
  sliderConfig = {};
  nearByCompanies: any;
  routerType: any;
  Random_offers = [
    {
      label: 'competitive heating oil prices',
    },
    {
      label: 'emergency 24/7 dispatch',
    },
    {
      label: 'price protection',
    },
    {
      label: 'fixed price plans',
    },
    {
      label: 'annual service contracts',
    },
  ];
  hours = [
    {
      day: 'Mon',
      time: '9:00am - 4:30pm',
    },
    {
      day: 'Tues',
      time: '9:00am - 4:30pm',
    },
    {
      day: 'Wed',
      time: '9:00am - 4:30pm',
    },
    {
      day: 'Thurs',
      time: '9:00am - 4:30pm',
    },
    {
      day: 'Fri',
      time: '9:00am - 4:30pm',
    },
    {
      day: 'Sat',
      time: 'Closed',
    },
    {
      day: 'Sun',
      time: 'Closed',
    },
  ];
  otherCompanyImages = [];
  schema = [];
  companypricetiers = [];
  randomTime:any = '9:00am - 5:00pm';
  routerUrl: any;
  calculatedPrice: any;
  otherTownCount: any;
  moreLesValue: any;

  titleContent: any;
  descContent: any;
  fields: any;
  innerWidth: number;
  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public breadcrumbsService: BreadcrumbsService,
    public router: Router,
    public handler: HttpBackend,
    // public eventBus: EventBus,
    // public modalController: ModalController,
    private clientApiService: ClientApiService,
    public networkService: NetworkService,
    // private navCtrl: NavController,
    // protected cookieHelper: CookieHelper,
    // protected authenticationServie: AuthenticationService,
    public fb: FormBuilder,
    public config: CommonService,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    private ref: ChangeDetectorRef,
    // @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // super(ConstructorParams.Create().with(eventBus, modalController), fb);
    // this.http = new HttpClient(this.handler);



    router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        let fields = event.url.split('-');

        let fields2 = this.router.url.split('-');

        if (fields.length === fields2.length) {
          // commented_v
          this.window.location.reload();
        }
      }
    });
    this.window = <any>this.document.defaultView;

    
    // if (isPlatformServer(this.platformId)) {
    // }else{
      this.fetchInit();
    // }

    // this.schemaAdd(breadcrumbsService, descContent, fields, titleContent);
  }

  fetchInit() {
    this.routerUrl = this.router.url;
    this.routerType = this.routerUrl.split('/')[1];
    this.fields = this.routerUrl.split('-');

    this.breadcrumbsService.createFromUrl(this.routerUrl.split('/')[2], 'home');

    this.breadcrumbsService.breadcrumbs[4].label =
      this.breadcrumbsService.breadcrumbs[4].label + ' Oil Prices';

    this.breadcrumbsService.breadcrumbs[4].label =
      this.breadcrumbsService.breadcrumbs[4].label.replace('Oil Oil', 'Oil');

    var company_name = this.config.replaceAll(this.fields[2], '_', ' ');

    var city_name = this.config.replaceAll(this.fields[3], '_', ' ');
    var state_name = this.config.replaceAll(this.fields[4], '.html', '');

    let fle = this.routerUrl.split('/')[2];

    let sp = fle.split('-');

    this.breadcrumbsService.breadcrumbs[3].url =
      this.config.typeURL + sp[0] + '-' + sp[3] + '-' + sp[4];

    city_name = this.config.replaceAll(city_name, ' Long Island', '');

    if (state_name == 'li') {
      state_name = 'NY';
    }

    // if (input.indexOf('Long') > -1) {
    //   titleContent =
    //     company_name +
    //     ' | ' +
    //     city_name +
    //     ', ' +
    //     state_name.toUpperCase() +
    //     ' | Home Heating Oil Delivery & COD Fuel Oil';
    //   descContent =
    //     company_name +
    //     ' Provides ' +
    //     city_name +
    //     ', ' +
    //     state_name.toUpperCase() +
    //     "'s area residents with home heating oil delivery. Offers: competitive heating oil prices, COD fuel discounts, price protection";
    // } else {
    //   titleContent =
    //     company_name +
    //     ' | ' +
    //     city_name +
    //     ', ' +
    //     state_name.toUpperCase() +
    //     ' | Home Heating Oil Delivery';
    //   descContent =
    //     company_name +
    //     ' Provides ' +
    //     city_name +
    //     ', ' +
    //     state_name.toUpperCase() +
    //     "'s area residents with home heating oil delivery. Offers: competitive heating oil prices, cash heating oil discounts, price protection";
    // }

    let state_name_ = this.config.fetchStateName(state_name.toUpperCase());

    city_name = city_name.replace(' Cape Cod', ', Cape Cod');
    city_name = city_name.replace(
      ' South Shore Massachusetts',
      ', South Shore Massachusetts'
    );
    city_name = city_name.replace(' Southern Maine', ', Southern Maine');
    city_name = city_name.replace(' Western Mass', ', Western Mass');
    city_name = city_name.replace(' Mid Coast Maine', ', Mid Coast Maine');
    city_name = city_name.replace(' Central Maine', ', Central Maine');
    city_name = city_name.replace(' Long Island', ', Long Island');

    this.titleContent =
      'Heating Oil | ' +
      company_name +
      ' | ' +
      city_name +
      ', ' +
      state_name.toUpperCase();

    this.currentSlug = this.route.snapshot.paramMap.get('companyHash');

    if (this.titleContent.length > 60) {
      city_name = city_name.replace(', Cape Cod', '');
      city_name = city_name.replace(', South Shore Massachusetts', '');
      city_name = city_name.replace(', Southern Maine', '');
      city_name = city_name.replace(', Western Mass', '');
      city_name = city_name.replace(', Mid Coast Maine', '');
      city_name = city_name.replace(', Central Maine', '');
      city_name = city_name.replace(', Long Island', '');

      this.titleContent =
        'Heating Oil | ' +
        company_name +
        ' | ' +
        city_name +
        ', ' +
        state_name.toUpperCase();

      if (this.titleContent.length > 60) {
        this.titleContent =
          company_name + ' | ' + city_name + ', ' + state_name.toUpperCase();
      }
    }

    this.descContent =
      company_name +
      ' Provides ' +
      city_name +
      ', ' +
      state_name_ +
      "'s area residents with home heating oil delivery.";

    this.title.setTitle(this.titleContent);

    this.meta.updateTag({
      name: 'description',
      content: this.descContent,
    });

    this.meta.addTags([
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: this.titleContent },
      {
        property: 'og:url',
        content: 'https://heatfleet.com' + this.router.url,
      },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: this.descContent },
      { property: 'twitter:title', content: this.titleContent },
      { property: 'twitter:site', content: this.router.url },
      {
        property: 'og:image',
        content:
          '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
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

    let stateName = this.config.getCityName(state_name);
    stateName = stateName.replace(/ /g, '_');
    this.breadcrumbsService.breadcrumbs[2].url =
      this.config.typeURL + state_name + '-' + stateName + '.html';
    this.breadcrumbsService.breadcrumbs[1].url =
      this.config.typeURL + this.breadcrumbsService.breadcrumbs[1].url;

    this.GetCompanyProfile();
  }

  ngOnInit() {
    this.config.getTypeURL();
    this.innerWidth = window.innerWidth;
  }

  schemaAdd() {
    this.config.schema = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: this.titleContent,
        url:
          'https:\u002F\u002F' +
          'heatfleet.com' +
          this.fields[0] +
          '-' +
          this.fields[1] +
          '-' +
          this.fields[2] +
          '-' +
          this.fields[3] +
          '-' +
          this.fields[4],
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: this.descContent,
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
      this.breadcrumbsService.breadcrumbs[0] &&
      this.breadcrumbsService.breadcrumbs[4]
    ) {
      var bc = {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: '1',
            item: {
              '@id': '\u002F',
              name: this.breadcrumbsService.breadcrumbs[0].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '2',
            item: {
              '@id': '\u002F' + this.breadcrumbsService.breadcrumbs[1].url,
              name: this.breadcrumbsService.breadcrumbs[1].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '3',
            item: {
              '@id': '\u002F' + this.breadcrumbsService.breadcrumbs[2].url,
              name: this.breadcrumbsService.breadcrumbs[2].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '4',
            item: {
              '@id': '\u002F' + this.breadcrumbsService.breadcrumbs[3].url,
              name: this.breadcrumbsService.breadcrumbs[3].label,
            },
          },
          {
            '@type': 'ListItem',
            position: '5',
            item: {
              '@id':
                '\u002F' + this.config.typeURL + this.router.url.split('/')[2],
              name: this.breadcrumbsService.breadcrumbs[4].label,
            },
          },
        ],
      };
    }

    this.config.schema[1].potentialAction.target =
      'https://heatfleet.com/oil-select-provider/{zip}/0/0/4/100';
    this.config.schema[1].potentialAction['query-input'] = 'required name=zip';
    // this.config.schema.push(bc);

    let logoUrl;
    if (this.companyData.logoUrl) {
      logoUrl = this.companyData.logoUrl;
    } else {
      logoUrl =
        '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg';
    }
    this.config.schema.push({
      '@context': 'http:\u002F\u002Fschema.org',
      '@type': 'LocalBusiness',
      name: this.companyData.companyName,
      logo: logoUrl,
      image: this.companyData.profileTruckUrl,
      url: 'https://heatfleet.com' + this.routerUrl,
      telephone: this.companyData.phone,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          opens: '09:00:00',
          closes: '16:30:00',
          dayOfWeek: 'https://schema.org/Monday',
        },
        {
          '@type': 'OpeningHoursSpecification',
          opens: '09:00:00',
          closes: '16:30:00',
          dayOfWeek: 'https://schema.org/Tuesday',
        },
        {
          '@type': 'OpeningHoursSpecification',
          opens: '09:00:00',
          closes: '16:30:00',
          dayOfWeek: 'https://schema.org/Wednesday',
        },
        {
          '@type': 'OpeningHoursSpecification',
          opens: '09:00:00',
          closes: '16:30:00',
          dayOfWeek: 'https://schema.org/Thursday',
        },
        {
          '@type': 'OpeningHoursSpecification',
          opens: '09:00:00',
          closes: '16:30:00',
          dayOfWeek: 'https://schema.org/Friday',
        },
      ],
      priceRange: '',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: this.companyData.locationLat,
        longitude: this.companyData.locationLong,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: this.companyData.city,
        addressRegion: this.companyData.state,
        postalCode: this.companyData.zip,
        streetAddress: this.companyData.address_1,
        addressCountry: 'USA',
      },
      makesOffer: [],
    });

    let makesOffer = [];
    if (
      this.companyData.makesOfferArray &&
      this.companyData.makesOfferArray.length > 0
    ) {
      makesOffer = this.companyData.makesOfferArray;
    }

    if (this.config.schema[3] && this.config.schema[3].makesOffer) {
      this.config.schema[3].makesOffer = makesOffer;
    }

    if (this.config.schema[2] && this.config.schema[2].makesOffer) {
      this.config.schema[2].makesOffer = makesOffer;
    }

    this.config.insertSchema(this.config.schema, 'structured-data-org');
  }

  replaceText(str) {
    str = str.replace(/#039;/g, "'");
    str = str.replace(/quot;/g, '"');
    str = str.replace(/&amp;/g, '');
    str = str.replace(/amp;/g, '');
    return str;
  }

  async GetCompanyProfile() {
    this.loaded = false;
    // this.loadData = false;
    // this.companyData = {};
    const url = environment.api_url + 'locations/GetCompanyProfileByHash';

    if (this.currentSlug) {
      let send = {
        Slug: this.currentSlug,
        isHF: true,
        amount: 100,
      };
      await this.http.post(url, send).subscribe((data: any) => {
        this.companyData = data;
        this.nearByCompanies = data.nearByCompanies;
        this.meta.addTags([
          { property: 'og:image', content: this.companyData.logoUrl },
          { property: 'twitter:image', content: this.companyData.logoUrl },
        ]);

        data.stateName = data.stateName.replace(/\b\w/g, (match) =>
          match.toUpperCase()
        );

        let state_name = this.config.replaceAll(data.stateName, ' ', '_');

        // this.breadcrumbsService.breadcrumbs[2].url =
        //   this.config.typeURL + data.state + '-' + state_name + '.html';

        // this.breadcrumbsService.breadcrumbs[2].label = data.stateName;

        this.closestTerminal = this.companyData.terminalData[0];

        this.closestTerminal.terminalOwner =
          this.closestTerminal.terminalOwner.toLowerCase();
        let urlCityName = this.routerUrl.split('-')[5];
        let apiCityName = this.companyData.city;
        apiCityName = this.config.replaceAll(apiCityName, ' ', '_');

        if (apiCityName == urlCityName) {
          let sp = this.router.url.split('/')[2];
          var url_ = 'https://heatfleet.com/heating_oil/' + sp;

          this.config.updateCanonicalUrl(url_);
        } else {
          if (this.companyData.sitemapURL) {
            let sitemap = this.companyData.sitemapURL.replaceAll(
              'Heating_Oil_Prices/',
              'heating_oil/'
            );
            this.config.updateCanonicalUrl(sitemap);
          }
        }

        if (this.companyData.deliveryServiceAreas[0]) {
          this.otherTownCount =
            this.companyData.deliveryServiceAreas[0].towns.split(',').length;
        }

        this.companypricetiers = this.companyData.companypricetiers;
        this.loaded = true;
        this.loadChart = true;

        this.calculatedPrice = (
          (this.companyData.stateAveragePrice *
            this.closestTerminal.offsetDistance *
            2) /
          6.2
        ).toFixed(2);

        // if (this.companypricetiers && this.companypricetiers.length > 0) {
        //   this.companypricetiers.forEach((el) => {
        //     let payWith;
        //     if (el.payWith) {
        //       payWith = el.payWith;
        //     } else {
        //       payWith = '';
        //     }
        //     makesOffer.push({
        //       '@type': 'Offer',
        //       price: el.type.credit, //credit price
        //       priceCurrency: 'USD',
        //       acceptedPaymentMethod: payWith,
        //       eligibleQuantity: {
        //         '@type': 'QuantitativeValue',
        //         value: el.gallons,
        //         unitCode: 'GLL',
        //       },
        //     });
        //   });
        // }

        this.otherCompanyImages = this.companyData.otherCompanyImages;

        this.state_ = this.companyData.city;

        if (this.companyData.serviceTruckUrl) {
          this.companyData.serviceTruckUrl =
            this.companyData.serviceTruckUrl +
            `?tr=w-225 225w,`;
            
        }
        if (this.companyData.truckUrl) {
          this.companyData.truckUrl =
            this.companyData.truckUrl +
            `?tr=w-225 225w,`;
        }
        if (this.companyData.profileTruckUrl) {
          this.companyData.profileTruckUrl =
            this.companyData.profileTruckUrl +
            `?tr=w-480 480w,` +
            this.companyData.profileTruckUrl +
            `?tr=w-640 640w,` +
            this.companyData.profileTruckUrl +
            `?tr=w-768 768w,` +
            this.companyData.profileTruckUrl +
            `?tr=w-960 960w,` +
            this.companyData.profileTruckUrl +
            `?tr=w-1024 1024w,` +
            this.companyData.profileTruckUrl +
            `?tr=w-1366 1366w,` +
            this.companyData.profileTruckUrl +
            `?tr=w-1600 1600w,` +
            this.companyData.profileTruckUrl +
            `?tr=w-1920 1920w,` +
            this.companyData.profileTruckUrl +
            `?tr=w-4096 4096w`;
        }

        this.schemaAdd();

        if (this.companyData.serviceAreaMapUrl) {
          var serviceAreaMapUrl = this.companyData.serviceAreaMapUrl;

          this.companyData.serviceAreaMapUrl =
            serviceAreaMapUrl +
            `?tr=w-480 480w,` +
            serviceAreaMapUrl +
            `?tr=w-640 640w,` +
            serviceAreaMapUrl +
            `?tr=w-768 768w,` +
            serviceAreaMapUrl +
            `?tr=w-960 960w,` +
            serviceAreaMapUrl +
            `?tr=w-1024 1024w,` +
            serviceAreaMapUrl +
            `?tr=w-1366 1366w,` +
            serviceAreaMapUrl +
            `?tr=w-1600 1600w,` +
            serviceAreaMapUrl +
            `?tr=w-1920 1920w,` +
            serviceAreaMapUrl +
            `?tr=w-4096 4096w`;
        }

        // ==== for faqs
        // if (this.VisibleCompanyType(
        //   this.companyData.isOilDel,
        //   this.companyData.isService
        // )) {
        //   var _company_type = 'Furnace Repair';
        // }

        // if (this.companyData.isLongIslandCompany) {
        //   var _company_type = 'COD Fuel Oil';
        // }

        // if (this.VisibleCompanyType(
        //   this.companyData.isOilDel,
        //   this.companyData.isService && this.companyData.isLongIslandCompany
        // )) {
        //   var offers_1 = 'boiler & furnace repair, ';
        // }

        // if (!this.VisibleCompanyType(
        //   this.companyData.isOilDel,
        //   this.companyData.isService && this.companyData.isLongIslandCompany
        // )) {
        //   var offers_1 = 'COD fuel discounts, ';
        // }

        // if (!this.VisibleCompanyType(
        //   this.companyData.isOilDel,
        //   this.companyData.isService && !this.companyData.isLongIslandCompany
        // )) {
        //   var offers_1 = 'cash heating oil discounts, ';
        // }
        // var title_p;

        // if (_company_type) {
        //   title_p =
        //     this.companyData.companyName +
        //     ' | Home Heating Oil Delivery & ' +
        //     _company_type +
        //     ' | Heat Fleet';
        // } else {
        //   title_p =
        //     this.companyData.companyName +
        //     ' | Home Heating Oil Delivery | Heat Fleet';
        // }

        // this.title.setTitle(title_p);

        // var city_name = this.companyData.city;
        // if (this.companyData.isLongIslandCompany) {
        //   city_name = 'Long Island';
        // }

        // if (this.companyData.isCapeCodCompany) {
        //   city_name = 'Cape Cod';
        // }

        // var content = 'Provides ' +
        //   city_name +
        //   ' area residents with home heating oil delivery. Offers: ' +
        //   offers_1 +
        //   this.getRandom_Offer() +
        //   '.';

        // if (content.length < 150) {
        //   var content = 'Provides ' +
        //     city_name +
        //     ' area residents with home heating oil delivery. Offers: ' +
        //     offers_1 +
        //     this.getRandom_Offer() +
        //     ', ' +
        //     this.getRandom_Offer() +
        //     '.';
        // }

        // if (content.length < 150) {
        //   var content = 'Provides ' +
        //     city_name +
        //     ' area residents with home heating oil delivery. Offers: ' +
        //     offers_1 +
        //     this.getRandom_Offer() +
        //     ', ' +
        //     this.getRandom_Offer() +
        //     ', ' +
        //     this.getRandom_Offer() +
        //     '.';
        // }

        var company_name = data.companyName;
        company_name = company_name.replace(/ /g, '-');
        this.zipCodeInput = data.zip;
        this.defaultZip = this.zipCodeInput;

        this.company_Id = data.id;
        // this.loadData = true;

        this.companyDescriptions = data.companyDescParas[0];

        if (data.priceStatus == 0) {
          this.orderNow(false);
        } else {
          this.loadData = false;
        }
        this.getRandomTime();
        this.find(this.zipCodeInput);
      });
    }

    // setTimeout(() => {

    // }, 1000);
  }

  getRandom_Offer() {
    let rd = Math.floor(Math.random() * this.Random_offers.length);
    var random = [this.Random_offers[rd]];

    return random[0].label;
  }

  onImgError(event) {
    event.target.src = '/assets/icon/placeholder-rectangle.png';
  }

  VisibleCompanyType(a, b) {
    if (a && b) {
      return true;
    } else {
      return false;
    }
  }

  getClasses(n) {
    if (n == 0) {
      return 'home_service';
    }
    if (n == 1) {
      return 'prices';
    }
    if (n == 2) {
      return 'city';
    }else{
      return '';
    }
  }

  updateQuantity(f) {
    f = f.replaceAll(' gal', '');
    this.quantityInput = f;
  }


  inp(f: any){

    // var qty;

    // if( f.target){

    //   var inputElement = f.target as HTMLInputElement;
    //   const inputValue = inputElement.value;
  
    //   console.log(inputValue);
      
  
    //   // Remove any non-numeric characters
    //   inputElement.value = inputValue.replace(/[^0-9]/g, '');

    //  qty =  inputElement.value;


         
    //  qty = this.config.replaceAll(qty, ' gal', '');
    // this.quantityInput = qty;

    // if (this.quantityInput > 2000) {
    //   this.quantityInput = 2000;
    //   this.quantityInput_withGal = '2000';
    //   // this.showNotifyZipDialog(true, true, null);
    // }


    // }else{
    
    //   f = this.config.replaceAll(f, ' gal', '');
    //   this.quantityInput = f;
  
    //   if (this.quantityInput > 2000) {
    //     this.quantityInput = 2000;
    //     this.quantityInput_withGal = '2000';
    //     // this.showNotifyZipDialog(true, true, null);
    //   }
    // }


  }

  public find(f): void {

    var qty;

    if( f.target){

      var inputElement = f.target as HTMLInputElement;
      const inputValue = inputElement.value;
  

      
  
      // Remove any non-numeric characters
      inputElement.value = inputValue.replace(/[^0-9]/g, '');

     qty =  inputElement.value;

    }else{
     qty = f;
    }




    if (qty) {
      var len = qty.toString().length;
    }

    if (len == 5) {
      this.zipCodeInput = qty;

      // this.existing_zip_searched = this.cart.zipCode;

      // this.loadingZipResponse = true;
      // this.loadZipcode();
// 
      // if (this.networkService.ip_address) {
      //   this.loadZipcode();
      // } else {
      //   let headers = new HttpHeaders({
      //     'X-Frame-Options': 'DENY',
      //     'Referrer-Policy': `no-referrer-when-downgrade`,
      //     'Access-Control-Allow-Origin': '*',
      //   });
      //   let options = {
      //     headers: headers,
      //   };
      //   this.http
      //     .get('https://api.ipify.org/?format=json')
      //     .subscribe((res: any) => {
      //       this.networkService.ip_address = res.ip;
      //       this.config.storageSave('ip_address', res.ip);
      //       this.loadZipcode();
      //     });

      // }
    }

    //   var qty = f;
    //   if (qty) {
    //     var len = qty.toString().length;
    //   }
    //   if (len != 5 && len != 0) {
    //     var qty = f;
    //     var len = qty.toString().length;
    //   }
    //   if (len == 5) {
    //     this.zipCodeInput = qty;
    //     // ip of the device
    //     var ip_address =
    //       this.config.storageGet('ip_address')['__zone_symbol__value'];
    //     this.networkService.ip_address = ip_address;
    //     const res = this.clientApiService.checkZipCode(
    //       this.zipCodeInput,
    //       this.networkService.ip_address
    //     );
    //     res.loading.subscribe((res) => {
    //       this.isLoading = res;
    //     });
    //     res.result.subscribe(
    //       (response) => {
    //         // if (response.isSuspiciousUser) {
    //         //   this.showSuspiciousUserDialog(
    //         //     response.suspiciousCities,
    //         //     this.networkService.ip_address
    //         //   );
    //         //   return;
    //         // }
    //         this.clientApiService.IsDealAvailable = false;
    //         if (response.zipCodeExists) {
    //           this.minimumQuantity = response.minimumQuantity;
    //           this.cart.zipCode = response.zipCode;
    //           this.cart.city = response.city;
    //           this.cart.county = response.county;
    //           this.cart.state = response.state;
    //           this.cart.isMultipleFips = response.isMultipleFips;
    //           this.cart.tankSize = 275;
    //           this.cart.isDealAvailable = response.isDealAvailable;
    //           // this.cart.address = this.City;
    //           if (response.allFips == null) {
    //             this.cart.fipsCode = response.fips;
    //           }
    //           var msg =
    //             'The minimum quantity for ' +
    //             this.cart.city +
    //             ' is ' +
    //             this.minimumQuantity +
    //             ' gallons. Please enter a quantity of at least that size.';
    //           // `The minimum order quantity in this service area is ${this.data.minimalAmount}gal, please revise your order quantity.`
    //           if (this.quantityInput < this.minimumQuantity) {
    //             this.ShowError(msg);
    //             this.quantityInput = this.minimumQuantity;
    //             return;
    //           }
    //           this.cookieHelper.setCart(this.cart);
    //           this.addNavigationHistoryItem('zipcode', response.zipCode);
    //           this.addNavigationHistoryItem('defaultcity', response.city);
    //           this.addNavigationHistoryItem('defaultstate', response.state);
    //           this.addNavigationHistoryItem(
    //             'isDealAvailable',
    //             JSON.stringify(response.isDealAvailable)
    //           );
    //           // if (this.cart.isDealAvailable) {
    //           //   this.quantityInput = this.minimumQuantity;
    //           // }
    //         }
    //         // else {
    //         //   this.showNotifyZipDialog();
    //         // }
    //       },
    //       (error: HttpErrorResponse) => {
    //         return this.HandleApiErrorDialogOnly(error);
    //       }
    //     );
    //   }
  }

  
  ShowError(n){
    this.Error = n;
  
     this.modalView = true;
      // this..className = 'modal fade show';
      
    }
  

  findDeal() {
    if (isNaN(Number(this.quantityInput)) || Number(this.quantityInput) < 1) {
      this.ShowError('Valid quantity required');

      return;
    }

    var msg =
      'The minimum quantity for ' +
      this.cart.city +
      ' is ' +
      this.minimumQuantity +
      ' gallons. Please enter a quantity of at least that size.';
    // `The minimum order quantity in this service area is ${this.data.minimalAmount}gal, please revise your order quantity.`
    if (this.quantityInput < this.minimumQuantity) {
      this.ShowError(msg);
      // this.quantityInput = this.minimumQuantity;
      return;
    }

    this.cart.zipCode = this.zipCodeInput;

    this.cart.city = this.cart.city;
    this.cart.state = this.cart.state;
    this.cart.amount = this.quantityInput;

    // this.cookieHelper.setCart(this.cart);

    // return;

    // this.addNavigationHistoryItem('defaultcity', this.cart.city);
    // this.addNavigationHistoryItem('defaultstate', this.cart.state);

    if (this.cart.isDealAvailable) {
      var orderType = ServiceType.OilDelivery;

    var qty = JSON.stringify(this.quantityInput);

    // this.addNavigationHistoryItem('quantityEntered', JSON.stringify(qty));

    this.config.EnableLoggedInUser = '';
    this.config.delivery_address = undefined;

    // this.addNavigationHistoryItem('home', `${this.quantityInput} gal`);

    
    let path_ = environment.secure_url;

    let url = path_+"oil-select-provider/"+this.cart.zipCode+"/"+0+"/"+this.customerType+"/"+orderType+"/"+this.quantityInput
    this.window.open(url, "_self");

    // this.navCtrl.navigateRoot([
    //   this.URLS.CLIENT_SELECT_OIL_PROVIDER,
    //   this.cart.zipCode,
    //   0,
    //   this.customerType,
    //   orderType,
    //   this.quantityInput,
    // ]);
    } else {
      var orderType = ServiceType.OilDelivery;
      this.clientApiService.IsDealAvailable = true;

      var today = new Date();

      var tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      var year = tomorrow.getFullYear();
      var month = tomorrow.getMonth() + 1;
      var day = tomorrow.getDate();
      let len = JSON.stringify(month).length;

      var newMonth: any;

      if (len == 1) {
        newMonth = JSON.stringify(0) + month;
      } else {
        newMonth = month;
      }

      let default_date =
        JSON.stringify(year) + '/' + newMonth + '/' + JSON.stringify(day);
      this.clientApiService.defaultDate = default_date;
      var formatted = JSON.stringify(year) + newMonth + JSON.stringify(day);

      let predefined = {
        amount: 100,
        cash: false,
        customerType: 0,
        dayId: formatted,
        orderType: 4,
        tankSize: 0,
        zipCode: this.zipCodeInput,
      };

      this.quantityInput = 100;
      this.config.EnableLoggedInUser = '';
      this.config.companyNavigate = true;
      this.config.delivery_address = undefined;
      let path_ = environment.secure_url;
    
      let url = path_+"oil-select-provider/"+this.cart.zipCode+"/"+0+"/"+this.customerType+"/"+orderType+"/"+this.quantityInput
      this.window.open(url, "_self");
  


      // this.addNavigationHistoryItem('home', `${this.quantityInput} gal`);
      // this.navCtrl.navigateRoot([
      //   this.URLS.CLIENT_SELECT_OIL_PROVIDER,
      //   this.cart.zipCode,
      //   0,
      //   this.customerType,
      //   orderType,
      //   this.quantityInput,
      // ]);
    }
  }

  // async showSuspiciousUserDialog(n, ip) {
  //   //debugger;
  //   const modal = await this.modalController.create({
  //     component: SuspiciousUserDialogComponent,
  //     componentProps: {
  //       zipCode1: n[0],
  //       zipCode2: n[1],
  //       zipCode3: n[2],
  //       zipCode4: n[3],
  //       zipCode5: n[4],
  //       zipCode6: n[5],

  //       ip: ip,
  //     },
  //     cssClass: 'custom-dialog notify-zip-dialog',
  //   });
  //   // modal.onDidDismiss().then((detail: OverlayEventDetail) => {});
  //   modal.present();
  // }

  // async showNotifyZipDialog() {
  //   //debugger;
  //   const modal = await this.modalController.create({
  //     component: NotifyZipDialogComponent,
  //     componentProps: {
  //       zipCode: this.zipCodeInput,
  //     },
  //     cssClass: 'custom-dialog notify-zip-dialog',
  //   });
  //   modal.onDidDismiss().then((detail: OverlayEventDetail) => {});
  //   modal.present();
  // }

  fetchVanURL(n) {
    var name: any;

    if (n.companyName) {
      name = this.config.replaceAll(n.companyName, / /g, '-');
    }

    var URL =
      'https://media-cdn.heatingoilfinder.com/cod/' +
      n.slug +
      '-V-h0-' +
      name +
      '-furnace-repair-van.png';
    return URL;
  }

  fetchTruckURL(n) {
    var name: any;

    if (n.companyName) {
      name = this.config.replaceAll(n.companyName, / /g, '-');
    }

    var URL =
      'https://media-cdn.heatfleet.com/cod/' +
      n.slug +
      '-B-fs-' +
      name +
      '-best-price-Cash-Heating-Oil-truck.png';
    return URL;
  }

  vanImageDefault() {
    this.vanImage = false;
  }

  truckImageDefault() {
    this.truckImage = false;
  }
  companyImageDefault() {
    this.companyImage = false;
  }

  clearInput() {
    if (this.firstEntered == true) {
      this.zipCodeInput = '';
      this.firstEntered = false;
    }
  }

  focusOutFunction(n) {
    this.config.replaceAll(n, ' gal', '');
    this.quantityInput_withGal = n + ' gal';
  }

  focusFunction(n) {
    n = this.config.replaceAll(n.value, ' gal', '');

    this.quantityInput_withGal = n;

    // n.select();
  }

  clearInputQty() {
    this.quantityInput_withGal = '';
    // if (this.firstEntered == true) {
    // this.zipCodeInput = '';
    // this.firstEntered = false;
    // }
  }

  async orderNow(n) {
    const res = this.clientApiService.getProviderById(
      this.company_Id,
      this.zipCodeInput,
      this.quantityInput
    );
    // res.loading.subscribe((res) => {
    //   this.isLoading = res;
    // });
    res.subscribe(
      (response) => {
        this.CompanyProfile = response;
        if (this.CompanyProfile) {
          this.CompanyLogoUrl = response.logoUrl;
          this.logoAltTag = response.logoAltTag;
          this.companyName = response.name;
          this.config.activeCompany = true;
        }
        this.loadData = false;
        if (n == true) {
          this.providerNext();
        }
      },
      (error: HttpErrorResponse) => {
        this.loadData = false;
        // return this.HandleApiErrorDialogOnly(error);
      }
    );
  }

  getTotal(price) {
    var flatFee: any = 0;
    if (
      this.CompanyProfile.isFlatFee == true &&
      this.CompanyProfile.isFirstTier == true
    ) {
      var flatFee = this.CompanyProfile.flatFee;
    }

    return price * this.quantityInput + flatFee;
  }

  providerNext() {



    this.cart.zipCode = this.zipCodeInput;
    this.cart.amount = this.quantityInput;
    var orderType = ServiceType.OilDelivery;

    let path_ = environment.secure_url;
    let url = path_+"oil-select-provider/"+this.cart.zipCode+"/"+0+"/"+0+"/"+orderType+"/"+this.quantityInput
    this.window.open(url, "_self");

    // this.addNavigationHistoryItem('defaultcity', this.cart.city);
    // this.addNavigationHistoryItem('defaultstate', this.cart.state);
    // var qty = JSON.stringify(this.quantityInput);
    // this.addNavigationHistoryItem('quantityEntered', JSON.stringify(qty));
    // this.addNavigationHistoryItem('home', `${this.quantityInput} gal`);
    // var orderType = ServiceType.OilDelivery;
    // this.addNavigationHistoryItem(
    //   'oil-delivery-window',
    //   this.CompanyProfile.firstDay
    // );
    // this.addNavigationHistoryItem('logoUrl', this.CompanyProfile.logoUrl);
    // this.cart.payWithCash = this.cashHeating;
    // if (this.CompanyProfile.isPayWithCash) {
    //   if (this.cart.payWithCash) {
    //     var paymentMethodLabel = 'Cash';
    //   } else {
    //     var paymentMethodLabel = 'Credit';
    //   }
    //   this.addNavigationHistoryItem('isCash', 'Cash');
    //   this.addNavigationHistoryItem('isCredit', '');
    // } else {
    //   this.addNavigationHistoryItem('isCredit', 'Credit');
    //   this.addNavigationHistoryItem('isCash', 'Credit');
    // }
    // this.addNavigationHistoryItem(
    //   'oil-select-provider-title',
    //   this.CompanyProfile.name
    // );
    // this.addNavigationHistoryItem(
    //   'oil-select-provider',
    //   this.CompanyProfile.name
    // );
    // this.addNavigationHistoryItem(
    //   'oil-select-provider-lastdigit',
    //   JSON.stringify(this.CompanyProfile.price)
    // );
    // this.addNavigationHistoryItem(
    //   'oil-select-provider-price',
    //   JSON.stringify(this.CompanyProfile.price)
    // );
    // this.addNavigationHistoryItem(
    //   'oil-select-provider-calculatedPrice',
    //   JSON.stringify(this.CompanyProfile.calculatedPrice)
    // );
    // this.cookieHelper.setCart(this.cart);
    // this.CompanyProfile.zipCode = this.cart.zipCode;
    // this.CompanyProfile.amount = this.cart.amount;
    // this.CompanyProfile.orderType = ServiceType.OilDelivery;
    // //this.cookieHelper.setCart(this.CompanyProfile);
    // this.config.navigateCompanyId = this.companyData.id;
    // this.navCtrl.navigateRoot([
    //   this.URLS.CLIENT_SELECT_OIL_PROVIDER,
    //   this.cart.zipCode,
    //   0,
    //   this.customerType,
    //   orderType,
    //   this.quantityInput,
    // ]);
    // if (this.CompanyProfile.enablePremiumFuelAdditive) {
    //   this.navCtrl.navigateRoot([
    //     this.URLS.CLIENT_FUEL_ADDITIVE,
    //     this.zipCode,
    //     this.tankSize,
    //     this.customerType,
    //     this.orderType,
    //     this.amount,
    //     this.CompanyProfile.dayId,
    //     this.cart.payWithCash,
    //     this.CompanyProfile.companyId,
    //   ]);
    // } else {
    //   if (this.authenticationServie.isAuthenticated()) {
    //     this.navCtrl.navigateRoot([this.URLS.CLIENT_CONFIRM_DELIVERY_ADDRESS]);
    //   } else {
    //     this.navCtrl.navigateRoot([this.URLS.CLIENT_ORDER_LOGIN]);
    //   }
    // }
  }

  getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data,
      width,
      height,
      i = -4,
      length,
      rgb = { r: 0, g: 0, b: 0 },
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height =
      imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width =
      imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */
      return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }

  navigateUrl(event, url) {
    event.preventDefault();
    this.router.navigate([url]);
  }

  get_otherCompanyImages(n) {
    return this.otherCompanyImages[n];
  }

  otherCompanyImages_Click(n) {
    //   var width = '';
    //   if (n == '1') {
    //     if (this.otherCompanyImages[0].zoom == 'W') {
    //       width = '/tr:w-0.5,h-0.75';
    //       // if (this.config.mobile_view) {
    //       //   width = '/tr:w-0.4,h-0.4';
    //       // } else {
    //       //   width = '/tr:w-0.4';
    //       // }
    //     }
    //     return this.otherCompanyImages[0].imageURL + width;
    //   }
    //   if (n == '2') {
    //     if (this.otherCompanyImages[1].zoom == 'W') {
    //       width = '/tr:w-0.5,h-0.75';
    //       // if (this.config.mobile_view) {
    //       //   width = '/tr:w-0.4,h-0.4';
    //       // } else {
    //       //   width = '/tr:w-0.4';
    //       // }
    //     }
    //     return this.otherCompanyImages[1].imageURL + width;
    //   }
    //   if (n == '3') {
    //     if (this.otherCompanyImages[2].zoom == 'W') {
    //       width = '/tr:w-0.5,h-0.75';
    //       // if (this.config.mobile_view) {
    //       //   width = '/tr:w-0.5,h-0.75';
    //       // } else {
    //       //   width = '/tr:w-0.5';
    //       // }
    //     }
    //     return this.otherCompanyImages[2].imageURL + width;
    //   }
    //   if (n == '4') {
    //     if (this.otherCompanyImages[3].zoom == 'W') {
    //       if (this.config.mobile_view) {
    //         width = '/tr:w-0.4,h-0.4';
    //       } else {
    //         width = '/tr:w-0.4';
    //       }
    //     }
    //     return this.otherCompanyImages[3].imageURL + width;
    //   }
  }

  navigate(url) {
    this.window.open(url, '_blank');
  }

  getRandomTime() {
    let randomTime = [
      {
        time: '8:00am - 4:00pm',
      },
      {
        time: '8:00am - 4:30pm',
      },
      {
        time: '8:00am - 5:00pm',
      },
      {
        time: '8:30am - 4:00pm',
      },
      {
        time: '8:30am - 4:30pm',
      },
      {
        time: '8:30am - 5:00pm',
      },
      {
        time: '9:00am - 4:00pm',
      },
      {
        time: '9:00am - 4:30pm',
      },
      {
        time: '9:00am - 5:00pm',
      },
    ];

    let lastDigit = this.companyData.id.toString().slice(-1);

    if (lastDigit == 1) {
      this.randomTime = randomTime[0].time;
    } else if (lastDigit == 2) {
      this.randomTime = randomTime[1].time;
    } else if (lastDigit == 3) {
      this.randomTime = randomTime[2].time;
    } else if (lastDigit == 4) {
      this.randomTime = randomTime[3].time;
    } else if (lastDigit == 5) {
      this.randomTime = randomTime[4].time;
    } else if (lastDigit == 6) {
      this.randomTime = randomTime[5].time;
    } else if (lastDigit == 7) {
      this.randomTime = randomTime[6].time;
    } else if (lastDigit == 8) {
      this.randomTime = randomTime[7].time;
    } else {
      this.randomTime = randomTime[8].time;
    }
  }

  fetchImageURL(compId) {
    compId.isDefaultLogo = true;
  }
  sliderCheckScreen() {
    let innerWidth = this.config.innerWidth;

    if (innerWidth <= 400 && innerWidth >= 300) {
      this.sliderConfig = {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: false,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: false,
        resistanceRatio: 0,
        virtualTranslate: false,
        autoplay: true,
      };
    }
    if (innerWidth <= 699 && innerWidth >= 401) {
      this.sliderConfig = {
        slidesPerView: 2,
        spaceBetween: 10,
        centeredSlides: false,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: false,
        resistanceRatio: 0,
        virtualTranslate: false,
        autoplay: true,
      };
    }
    if (innerWidth <= 2500 && innerWidth >= 700) {
      this.sliderConfig = {
        slidesPerView: 3,
        spaceBetween: 10,
        centeredSlides: false,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: false,
        resistanceRatio: 0,
        virtualTranslate: false,
        autoplay: false,
      };
    }
  }

  // next() {
  //   this.ionSlides.slideNext();
  // }
  // prev() {
  //   this.ionSlides.slidePrev();
  // }

  navigateCompany(event, n, fig) {
    var companyName;
    if (n.companyDBA) {
      companyName = n.companyDBA;
    } else {
      companyName = n.companyName;
    }
    companyName = this.config.replaceAll(companyName, '-', '_');
    companyName = this.config.replaceAll(companyName, ' ', '_');
    companyName = this.config.replaceAll(companyName, '/', '_');
    companyName = this.config.replaceAll(companyName, '.', '');
    companyName = this.config.replaceAll(companyName, '&amp;', '');
    companyName = this.config.replaceAll(companyName, ',', '');
    companyName = this.config.replaceAll(companyName, '&', '');
    companyName = this.config.replaceAll(companyName, ';', '');
    companyName = this.config.replaceAll(companyName, "'", '');
    companyName = this.config.replaceAll(companyName, '’', '');
    companyName = this.config.replaceAll(companyName, '"', '');
    companyName = this.config.replaceAll(companyName, '%26', '');
    companyName = this.config.replaceAll(companyName, '%2c', '');
    companyName = this.config.replaceAll(companyName, '%2f', '');
    companyName = this.config.replaceAll(companyName, '%2b', '');
    companyName = this.config.replaceAll(companyName, '%e2', '');
    companyName = this.config.replaceAll(companyName, '%80', '');
    companyName = this.config.replaceAll(companyName, '%99', '');
    companyName = this.config.replaceAll(companyName, '%20', '');
    companyName = this.config.replaceAll(companyName, '+', '');
    companyName = this.config.replaceAll(companyName, '!', '');
    companyName = this.config.replaceAll(companyName, ' ', '_');
    companyName = this.config.replaceAll(companyName, '__', '_');
    companyName = this.config.replaceAll(companyName, '|', '');
    let town = this.config.replaceAll(n.town, ' ', '_');
    if (town.length === 3) {
      town = town + '_';
    }
    if (n.isRegion) {
      n.regionName = n.regionName
        .replace(/\b\w/g, (match) => match.toUpperCase())
        .replace(/\s/g, '_');
      town = town + '_' + n.regionName;
      var url =
        'heating_oil/' +
        n.townHash +
        '-' +
        n.companyHash +
        '-' +
        companyName +
        '-' +
        town +
        '-' +
        n.stateHash +
        '.html';
      url = url.replace(/__/g, '_');
    } else {
      var url =
        'heating_oil/' +
        n.townHash +
        '-' +
        n.companyHash +
        '-' +
        companyName +
        '-' +
        town +
        '-' +
        n.stateHash +
        '.html';
    }
    if (fig == true) {
      event.preventDefault();
      this.router.navigate([url]);
      let topSection = this.document.getElementById('topSection');
      let header = this.document.getElementById('header');
      // this.content.scrollToPoint(
      //   0,
      //   topSection.offsetTop - header.clientHeight - 5
      // );
      setTimeout(() => {
        this.window.location.reload();
    
      }, 1000);
      return null;
    } else {
      return url;
    }
  }

  closeModel() {
    this.modalView = false;
  }

  ZipFocusOut(){
    if (this.zipCodeInput === ""){
      this.zipCodeInput = this.defaultZip;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
}
