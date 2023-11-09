import { Component, OnInit, ViewChild, Inject, Renderer2 } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { NetworkService } from 'src/app/shared/api/network.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationService } from 'src/app/shared/api/location.service';
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.config';

@Component({
  selector: 'app-oil-delivery',
  templateUrl: './oil-delivery.component.html',
  styleUrls: ['./oil-delivery.component.scss']
})
export class OilDeliveryComponent implements OnInit {
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
  enableComponent = false;
  pageDetails: any;
  WeatherHistory: any;
  oilDeliverydata: any;

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
    private sanitizer: DomSanitizer
  ) {
    // this.http = new HttpClient(this.handler);
  }

  scrollTop() {
    // commented_v
    // this.clientbase.innerWidth = this.window.innerWidth;

    if (this.clientbase.innerWidth <= 500) {
      this.clientbase.mobile_view = true;
    } else {
      // this.getChartData();
      this.clientbase.mobile_view = false;
    }

    // this.content.scrollToTop(0);
  }

  ngOnInit() {
    // this.clientbase.checkCookie();
    this.getNearestLocation();
    this.getPageDeatails();
    this.fetchInit();
    this.fetchWeatherHistory(10001);
  }

  ionViewDidEnter() {
    this.clientbase.onScrollFix = false;
    var content_ =
      'Find reliable, affordable oil delivery with our free heating oil search engine. Save up to $1.00 PER GALLON on heating oil delivery.';

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

  fetchInit() {
    this.clientbase.getTypeURL();
    let typeURL = this.clientbase.typeURL.replace('/', '.html');

    this.clientbase.updateCanonicalUrl('https://heatfleet.com/' + typeURL);

    var title_ = "Today's BEST Local Oil Delivery Deals | Heating Oil Savings";
    var content_ =
      'Find reliable, affordable oil delivery with our free heating oil search engine. Save up to $1.00 PER GALLON on heating oil delivery.';

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
    //     // this.scrollTop();

    //     this.breadcrumbs = responseList[1].breadcrumbs;
    //     this.ctaText = responseList[1].ctaText;
    //     this.infoCheckBox = responseList[1].infoCheckBox;
    //     this.bsAltLine = responseList[1].bsAltLine;
    //     this.faqsContentTown = responseList[1].faqs;
    //     this.faQsSchema = responseList[1].faQsSchema;
    //     this.comparePricesText = responseList[1].underLine;
    //     this.topTowns = responseList[1].topTowns;
    //     this.topCounties = responseList[1].topCounties;
    //     this.pageDetails = responseList[1];
    //     this.enableComponent = true;
    //     this.oilDeliverydata = responseList[1].oilDeliverydata;
    //   });

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

  fetchWeatherHistory(zip) {
    let url = `${environment.api_url}locations/weather-history?zip=${zip}`;

    this.http.get(url).subscribe((response: any)=>{
      if (response) {
        this.WeatherHistory = response;
        this.enableComponent = true;
      }
    });
  }

  getPageDeatails(){
    var type_ = '';
      if (this.clientbase.typeParam != 'type=1') {
        var type_ = this.clientbase.typeCategory + '&';
      }
      let url3 = type_ + this.clientbase.typeParam + '&level=1';
      const url = environment.api_url + `locations/getPageDetails?${url3}`;
    
    this.http.get(url).subscribe((response: any)=>{
      this.loaded = true;
      this.breadcrumbs = response.breadcrumbs;
        this.ctaText = response.ctaText;
        this.infoCheckBox = response.infoCheckBox;
        this.bsAltLine = response.bsAltLine;
        this.faqsContentTown = response.faqs;
        this.faQsSchema = response.faQsSchema;
        this.comparePricesText = response.underLine;
        this.topTowns = response.topTowns;
        this.topCounties = response.topCounties;
        this.pageDetails = response;
        this.enableComponent = true;
        this.oilDeliverydata = response.oilDeliverydata;
    });
  }

  getNearestLocation(){  
    const url = this.getUrl('customer/offer/get-nearest-location');
    let httpOptions = this.getHttpOptions();

    this.http.get(url, httpOptions).subscribe((response)=>{
      this.pricesData = response['nearestTown'];
      this.data_map = response['nearestTown'];
      this.enable_pricesData = false;
    })

    
  }
}
