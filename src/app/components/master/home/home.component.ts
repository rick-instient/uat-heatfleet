import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  Renderer2,
  HostListener,
  ElementRef,

} from '@angular/core';

import { HttpClient, HttpBackend } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { DOCUMENT } from '@angular/common';
import { NetworkService } from 'src/app/shared/api/network.service';
// import { GoogleAnalyticsService } from 'angular-google-analytics';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/services/common.config';
import { LocationService } from 'src/app/shared/api/location.service';
import { finalize, fromEvent } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';

export interface CustomWindow extends Window {

  customProperty: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private window: CustomWindow;
  @HostListener('scroll', ['$event'])
  @ViewChild('div', { static: true }) _div: ElementRef;
  scrollPosition: number = 0;
  public loaded = false;
  LandingPage = true;
  selected_data: any;
  data_res: any = null;
  enable_pricesData = true;
  enable_chartData = false;
  enable_fetchGEO = true;
  enable_articlesData = true;
  lastUpdate: any;
  data_map: any;
  pricesData: any;
  endpoint = `https://infocenter.heatfleet.com/wp-json/wp/v2/posts?_fields=id,excerpt,title,link,featured_media_src_url,featured_image,featured,featured_media,better_featured_image?_embed`;
  allPosts = null;
  pages: any;
  articles_data = [];
  qtyLoaded = false;
  firstTimeLoad: boolean = false;
  heatingOil = false;
  breadcrumbs: any;
  ctaText: any;
  infoCheckBox: any;
  bsAltLine: any;
  faqsContentTown: any;
  landing = false;
  mainEntity = [];
  payLater = true;
  topTowns: any;
  topCounties: any;
  fullServiceCompaniesInUS: any;
  loadComp = false;
  innerWidth: number;
  constructor(
    public clientbase: CommonService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public handler: HttpBackend,
    private title: Title,
    private meta: Meta,
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
    public networkService: NetworkService,
    private locationService: LocationService,
    protected authenticationServie: AuthenticationService,
    private cookieService: CookieService
  ) {
    // this.http = new HttpClient(this.handler);
    this.window = <any>this.document.defaultView;
    this.document.addEventListener('scroll', (ev) => {
      this.keepTrack();
    })

  }


  keepTrack() {
    const sc_position = window.scrollY;


    if (sc_position > 490) {
      this.clientbase.onScrollFix = true;
      this.clientbase.islogin = true;
      this.clientbase.login = true;
    } else {
      this.clientbase.onScrollFix = false;
    }


  }



  scrollTop() {
    // commented_v
    this.clientbase.innerWidth = this.window.innerWidth;


    console.log(this.clientbase.innerWidth);

    if (this.clientbase.innerWidth <= 500) {
      this.clientbase.mobile_view = true;
      this.innerWidth =  this.clientbase.innerWidth;
    } else {
      console.log("Comm");
      // this.getChartData();
      this.loadComp = true;
      this.clientbase.mobile_view = false;
      this.innerWidth =  this.clientbase.innerWidth;
    }
    // this.content.scrollToTop(0);
  }







  ngOnInit() {
  this.fetchInit();
  this.scrollTop();
  
  // if(this.clientbase.innerWidth >= 500) {
    this.getChartData();
  // }
   
  }




  ionViewDidEnter() {
    this.clientbase.onScrollFix = false;
    let username = this.route.snapshot.queryParamMap.get('username');

    if (username) {
      this.clientbase.storageSave('username', username);

      let CallCompanyId =
        this.route.snapshot.queryParamMap.get('companyId') || null;
      if (CallCompanyId) {
        this.clientbase.storageSave('CallCompanyId', CallCompanyId);
      } else {
        this.clientbase.storageRemove('CallCompanyId');
      }
    } else {
      this.clientbase.storageRemove('username');
      this.clientbase.storageRemove('CallCompanyId');
    }

    if (this.document && this.document.referrer) {
      this.clientbase.storageSave('ReferredBy', this.document.referrer);
    }
  }

  
  fetchInit() {
    this.clientbase.onlyLanding = true;
    this.faqsContentTown = this.clientbase.faqsContent;

    let title_ = 'Heating Oil Prices Near Me | 500+ Companies | Heat Fleet';

    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:title', content: title_ });
    this.meta.addTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.addTag({ property: 'og:url', content: 'https://heatfleet.com/' });
    this.meta.addTag({
      property: 'og:image',
      content:
        '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
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


    var content_ =
      "OIL DELIVERY DEALS: Today's best heating oil prices from local oil companies. HEATING REPAIR DIRECTORY: Trusted, expert heating contractors for furnace repairs.";

    const url = this.getUrl('customer/offer/get-nearest-location');
    var type_ = '';
    if (this.clientbase.typeParam != 'type=1') {
      var type_ = this.clientbase.typeCategory + '&';
    }
    let url3 = type_ + this.clientbase.typeParam + '&level=1';

    this.getNearestLocation(url, this.getHttpOptions()).subscribe((response)=>{
      this.pricesData = response['nearestTown'];
      this.data_map = response['nearestTown'];
      this.loaded = true;
      this.scrollTop();
    })

    this.getPageDeatails(url3).subscribe((response: any)=>{
      this.topTowns = response.topTowns;
        this.topCounties = response.topCounties;
        this.fullServiceCompaniesInUS =
          response.fullServiceCompaniesInUS;
    });

    // this.locationService
    //   .requestDataFromMultipleSources_Landing(
    //     url,
    //     url3,
    //     this.getHttpOptions(),
    //     true
    //   )
    //   .subscribe((responseList) => {
    //     this.enable_pricesData = false;
    //     this.pricesData = responseList[0]['nearestTown'];
    //     this.data_map = responseList[0]['nearestTown'];
    //     this.loaded = true;
    //     this.scrollTop();

    //     this.topTowns = responseList[1].topTowns;
    //     this.topCounties = responseList[1].topCounties;
    //     this.fullServiceCompaniesInUS =
    //       responseList[1].fullServiceCompaniesInUS;

    //   });

    var schema_ = [];
    schema_ = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: 'Heat Fleet',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: content_,
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
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'FAQPage',
        mainEntity: [],
      },
    ];

    this.mainEntity = [];
    // commented_v
    this.clientbase.faqsContent.forEach((el) => {
      // this.mainEntity.push({
      //   '@type': 'Question',
      //   name: el.question,
      //   acceptedAnswer: {
      //     '@type': 'Answer',
      //     text:
      //       "\u003Cdiv class='faqItem'\u003E\u003Cdiv class='answer'\u003E" +
      //       el.answer +
      //       '\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E',
      //   },
      // });
    });

    schema_[2].mainEntity = this.mainEntity;
    // commented_v
    // schema_[1].potentialAction.target =
    //   'https://heatfleet.com/oil-select-provider/{zip}/0/0/4/100';
    // schema_[1].potentialAction['query-input'] = 'required name=zip';

    this.clientbase.insertSchema(schema_, 'structured-data-org');

    this.clientbase.updateCanonicalUrl('https://heatfleet.com');

    this.clientbase.onlyLanding = false;
    this.qtyLoaded = true;


    this.title.setTitle(title_);

    this.meta.updateTag({
      name: 'description',
      content: content_,
    });
  }



  private getUrl(uri: string): string {
    return `${environment.api_url}${uri}`;
  }

  protected getHttpOptions(withoutToken: boolean = false) {
    const token = environment.token;
    return {
      headers: new HttpHeaders({
        'X-Api-Key': `${environment.api_key}`,
        'DAVOS-IsMobile': environment.isMobile.toString(),
        // Authorization: token,
      }),
    };
  }

  getChartData() {
    performance.mark('map-start');
    const url = this.getUrl('company/account/pricehistory');
    this.http.get(url, this.getHttpOptions()).subscribe((data) => {
      this.enable_chartData = true;

      var newArray = JSON.parse(JSON.stringify(data)).map((o: any) => {
        var today = new Date(o.date);

        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        let len = JSON.stringify(month).length;

        var newMonth: any;

        if (len == 1) {
          newMonth = JSON.stringify(0) + month;
        } else {
          newMonth = month;
        }

        let default_date =
          newMonth + '/' + JSON.stringify(day) + '/' + JSON.stringify(year);
        this.lastUpdate = o.createdat;
        return {
          heatfleet: o.price,
          Date: default_date,
        };
      });

      this.data_res = newArray;



      const date = new Date(this.lastUpdate);
      const today = new Date();
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const formattedDate = `${date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      })} at ${date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
      if (isToday) {
        this.lastUpdate = 'Today' + ' at ' + formattedDate.slice(-8);
      } else {
        this.lastUpdate = formattedDate;
      }
    });

    performance.mark('map-end');

  }

  async storageClear() {
    if (localStorage) {
      localStorage.clear();
    }
  }

  async storageRemove(name: any) {
    if (name) {
      localStorage.removeItem(name);
    }
  }

  // public getIPAddress()
  // {
  // let ip = this.http.get("http://api.ipify.org/?format=json");
  // this.clientbase.storageSave(
  //             'ip_address',
  //             this.networkService.ip_address
  //           );

  // }

  // ipGeo() {
  //   var today = new Date().toUTCString;

  //   var existing_date =
  //     this.clientbase.storageGet('existing_date')['__zone_symbol__value'];

  //   if (today > existing_date || existing_date == null) {
  //     this.http.get('https://api.ipify.org/?format=json').subscribe(
  //       (value: any) => {
  //         this.networkService.ip_address = value.ip;
  //         var today = new Date();
  //         var futureDate = new Date(today);
  //         futureDate.setDate(today.getDate() + 5);
  //         this.clientbase = .storageSave('existing_date', futureDate);

  //         this.clientbase.storageSave(
  //           'ip_address',
  //           this.networkService.ip_address
  //         );
  //       },
  //       (error) => {}
  //     );
  //   }
  // }

  onScroll(): void {

    console.log(window.scrollY);

    let scrollPosition = window.pageYOffset || window.scrollY;

    console.log("this.scrollPosition", scrollPosition);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = this.window.innerWidth;
  }

  getPageDeatails(url3){
    const url = environment.api_url + `locations/getPageDetails?${url3}`;
    return this.http.get(url);
  }

  getNearestLocation(url, httpOptions){  
    return this.http.get(url, httpOptions);
  }
}
