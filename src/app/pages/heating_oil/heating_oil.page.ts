import { Component, OnInit, ViewChild, Inject, Renderer2 } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
// import { NetworkService } from 'src/shared/api/network.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/services/common.config';
import { NetworkService } from 'src/app/shared/api/network.service';
import { LocationService } from 'src/app/shared/api/location.service';

export interface CustomWindow extends Window {

  customProperty: boolean;
}


@Component({
  selector: 'app-heating_oil',
  templateUrl: './heating_oil.page.html',
  styleUrls: ['./heating_oil.page.scss'],
})
export class HeatingOilPage implements OnInit {
  private window: CustomWindow;
  public loaded = false;
  LandingPage = true;
  selected_data: any;
  data_res: any = null;
  enable_pricesData = true;
  enable_chartData = false;
  enable_fetchGEO = true;
  enable_articlesData = true;
  lastUpdate: string;
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
  faQsSchema: any;
  comparePricesText: any;
  topTowns: any;
  topCounties: any;
  pageDetails: any;
  showComponent: boolean = false;
  loading = false;
  constructor(
    public clientbase: CommonService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public handler: HttpBackend,
    private title: Title,
    private meta: Meta,
    public router: Router,
    // @Inject(WINDOW) public window: Window,
    @Inject(DOCUMENT) private document: Document,
    public networkService: NetworkService,
    private locationService: LocationService,
    private sanitizer: DomSanitizer,
    public config: CommonService
  ) {
    this.http = new HttpClient(this.handler);
   this.window = <any>this.document.defaultView;
    this.fetchInit();
  }

  scrollTop() {
    this.clientbase.innerWidth = this.window.innerWidth;

    if (this.clientbase.innerWidth <= 500) {
      this.clientbase.mobile_view = true;
    } else {
      this.getChartData();
      this.clientbase.mobile_view = false;
    }

    // this.content.scrollToTop(0);
  }

  ngOnInit() {
    // this.config.checkCookie();
  }

  ionViewDidEnter() {
    this.clientbase.onScrollFix = false;
    this.scrollTop();

    var content_ =
      'Our heating oil search engine can save you up to $100 PER OIL DELIVERY. Enter your ZIP to instantly compare oil prices from trusted local heating oil companies.';

    setTimeout(() => {
      let schema = [];
      schema = [
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
      ];

      let typeURL = this.clientbase.typeURL.replace('/', '.html');

      schema[0].url = 'https:\u002F\u002Fheatfleet.com/' + typeURL;

      schema[1].potentialAction.target =
        'https://heatfleet.com/oil-select-provider/{zip}/0/0/4/100';
      schema[1].potentialAction['query-input'] = 'required name=zip';

      schema.push(this.faQsSchema);
      this.clientbase.insertSchema(schema, 'structured-data-org');
    }, 1000);
  }

  ionViewWillEnter() {
    this.clientbase.getTypeURL();
  }
  fetchInit() {
    this.clientbase.getTypeURL();
    let typeURL = this.clientbase.typeURL.replace('/', '.html');

    this.clientbase.updateCanonicalUrl('https://heatfleet.com/' + typeURL);

    var title_ = "TODAY'S Top Heating Oil Deals | Fuel Oil Price Search By ZIP";
    var content_ =
      'Our heating oil search engine can save you up to $100 PER OIL DELIVERY. Enter your ZIP to instantly compare oil prices from trusted local heating oil companies.';

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

    const url = this.getUrl('customer/offer/get-nearest-location');
    var type_ = '';
    if (this.clientbase.typeParam != 'type=1') {
      var type_ = this.clientbase.typeCategory + '&';
    }
    let url3 = type_ + this.clientbase.typeParam + '&level=1';

    this.locationService
      .requestDataFromMultipleSources_Landing(
        url,
        url3,
        this.getHttpOptions(),
        true
      )
      .subscribe((responseList) => {
        this.enable_pricesData = false;
        this.pricesData = responseList[0]['nearestTown'];
        this.data_map = responseList[0]['nearestTown'];
        this.loaded = true;

        this.breadcrumbs = responseList[1].breadcrumbs;
        this.ctaText = responseList[1].ctaText;
        this.infoCheckBox = responseList[1].infoCheckBox;
        this.bsAltLine = responseList[1].bsAltLine;
        this.faqsContentTown = responseList[1].faqs;
        this.faQsSchema = responseList[1].faQsSchema;
        this.topTowns = responseList[1].topTowns;
        this.topCounties = responseList[1].topCounties;

        this.comparePricesText = responseList[1].underLine;
        this.pageDetails = responseList[1];

        console.log( this.pageDetails);
        
        this.showComponent = true;
        this.loading = true;
      });

    this.qtyLoaded = true;

    this.title.setTitle(title_);

    this.meta.updateTag({
      name: 'description',
      content: content_,
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
  }

  ngAfterViewInit() {
    // commented_v
    // this.content.ionScroll.subscribe(($event) => {
    //   let sc_position = $event.detail.scrollTop;
    //   if (sc_position > 196.66) {
    //     this.clientbase.onScrollFix = true;
    //     this.clientbase.islogin = true;
    //     this.clientbase.login = true;
    //   } else {
    //     this.clientbase.onScrollFix = false;
    //   }
    // });
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

  async getChartData() {
    performance.mark('map-start');
    const url = this.getUrl('company/account/pricehistory');
    await this.http.get(url, this.getHttpOptions()).subscribe((data) => {
      this.enable_chartData = true;

      var newArray = JSON.parse(JSON.stringify(data)).map((o) => {
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

  async storageRemove(name) {
    if (name) {
      localStorage.removeItem(name);
    }
  }
}
