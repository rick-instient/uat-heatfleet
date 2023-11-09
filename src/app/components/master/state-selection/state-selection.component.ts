import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NavController } from '@ionic/angular';
import { BUSINESS_TYPES } from 'src/app/shared/api/constants';
import { LocationService } from 'src/app/shared/api/location.service';
// import { BreadcrumbsService } from 'src/shared/services/breadcrumbs.service';
import { Title, Meta } from '@angular/platform-browser';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common.config';
// import { IonContent } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-state-selection',
  templateUrl: './state-selection.component.html',
  styleUrls: ['./state-selection.component.scss']
})
export class StateSelectionComponent implements OnInit {
  // @ViewChild(IonContent)
  // content: IonContent;
  services: Array<any> = [];
  states: Array<any> = [];
  currentBusinessType: string;
  counter = 1;
  breadcrumbs: any;
  ctaText: any;
  infoCheckBox: any;
  bsAltLine: any;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    // public breadcrumbsService: BreadcrumbsService,
    private title: Title,
    private meta: Meta,
    // private navCtrl: NavController,
    public config: CommonService,
    @Inject(DOCUMENT) private document: Document,
    public http: HttpClient,
  ) {
    // this.fetchInit();

    // router.events.subscribe((event: any) => {
    //   if (
    //     event.type == 15 &&
    //     event.routerEvent.id == 2 &&
    //     (event.routerEvent.url.includes('States') ||
    //       event.routerEvent.url.includes('Regions'))
    //   ) {
    //     this.fetchInit();
    //   }
    // });
  }
  ngOnInit(): void { 
    this.fetchInit();

    this.router.events.subscribe((event: any) => {
      if (
        event.type == 15 &&
        event.routerEvent.id == 2 &&
        (event.routerEvent.url.includes('States') ||
          event.routerEvent.url.includes('Regions'))
      ) {
        this.fetchInit();
      }
    });
  }

  fetchInit() {
    this.config.getTypeURL();
    let page_type;
    if (this.router.url.includes('States')) {
      page_type = 'States';
      this.config.isRegion = false;

      if (this.config.typeParam == 'type=1') {
        var type = 'Heating Oil Providers';
        var description =
          "America's top home heating oil options for each state in the northeast. Enter your ZIP code to search for local providers serving your neighborhood.";
      } else if (this.config.typeParam == 'subType=1') {
        var type = 'Heating Oil Companies';
        var description =
          'The most comprehensive state by state listing of heating oil companies in America. Enter your ZIP code to search for companies serving your home.';
      } else if (this.config.typeParam == 'subType=2') {
        var type = 'Heating Oil Prices';
        var description =
          'Save money on oil delivery with our listing of oil prices for states from Maine to Virginia. The most comprehensive, instant heating oil price search.';
      } else if (this.config.typeParam == 'subType=3') {
        var type = 'Oil Delivery';
        var description =
          "A homeowner's oil delivery directory. Browse providers and oil prices by state or enter your ZIP to find the local oil companies serving your town.";
      } else if (this.config.typeParam == 'type=2') {
        var type = 'Heating Repair';
        var description =
          "America's top home heating oil options for each state in the northeast. Enter your ZIP code to search for local providers serving your neighborhood.";
      }
    } else if (this.router.url.includes('Regions')) {
      page_type = 'Regions';
      this.config.isRegion = true;

      if (this.config.typeParam == 'type=1') {
        var type = 'Heating Oil';
        var description =
          'Search for heating oil in your region with our directory of oil prices and oil companies. Heat Fleet helps homeowners like you stay warm all winter.';
      } else if (this.config.typeParam == 'subType=1') {
        var type = 'Heating Oil Companies';
        var description =
          'Find oil companies in your region instantly. Enter your ZIP code for a complete heating oil delivery listing of providers serving your neighborhood.';
      } else if (this.config.typeParam == 'subType=2') {
        var type = 'Heating Oil Prices';
        var description =
          "Today's best oil prices per gallon by region. Our  home heating oil price search can save you $100 per delivery right now. Instant ZIP code search.";
      } else if (this.config.typeParam == 'subType=3') {
        var type = 'Oil Delivery';
        var description =
          "A comprehensive directory by region of oil delivery. User our instant ZIP code search to find local oil companies and today's oil prices per gallon.";
      } else if (this.config.typeParam == 'type=2') {
        var type = 'Heating Repair';
        var description =
          'Search for heating oil in your region with our directory of oil prices and oil companies. Heat Fleet helps homeowners like you stay warm all winter.';
      }
    }

    let title = type + ' | Heat Fleet | ' + page_type;

    this.title.setTitle(title);
    this.meta.updateTag({
      name: 'description',
      content: description,
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
      { property: 'og:title', content: title },
      { property: 'og:url', content: this.router.url },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: description },
      { property: 'twitter:title', content: title },
      { property: 'twitter:site', content: this.router.url },
      {
        property: 'og:image',
        content:
          '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
      {
        property: 'twitter:image',
        content:
          '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
      },
    ]);

    let sp = this.router.url.split('/')[2];

    this.config.updateCanonicalUrl(
      'https://heatfleet.com/' + this.config.typeURL + sp
    );

    // commented_v
    // this.breadcrumbsService.createFromUrl(
    //   this.router.url.split('/')[1],
    //   'home'
    // );

    // this.route.params.subscribe((params) => {
    // this.currentBusinessType = params['type'];
    let url;
    if (this.config.isRegion) {
      url = environment.api_url + `locations?isRegion=true`;
    } else {
      url = environment.api_url + `locations`;
    }

    var type_ = '';
    if (this.config.typeParam != 'type=1') {
      var type_ = this.config.typeCategory + '&';
    }

    let url3 = type_ + this.config.typeParam + '&level=2';

    if (this.config.isRegion) {
      url3 = type_ + this.config.typeParam + '&level=2' + '&isRegion=true';
    }
    console.log(url3);

    this.getStates(url).subscribe((response: any[]) => {
      this.states = response;
    });

    this.getPageDetails(url3).subscribe((response: any) => {
      console.log("response", response);
      
      this.breadcrumbs = response.breadcrumbs;

        if (this.config.isRegion) {
          this.breadcrumbs[2].label = type + ' by Region';
          this.bsAltLine = response.bsAltLine.replaceAll(
            'State',
            'Regions'
          );
        } else {
          this.breadcrumbs[2].label = type + ' by State';
          this.bsAltLine = response.bsAltLine;
        }
        this.ctaText = response.ctaText;
        this.infoCheckBox = response.infoCheckBox;
    });

    // this.locationService
    //   .requestDataFromMultipleSources_Landing(url, url3, true, true)
    //   .subscribe((responseList) => {
    //     this.states = responseList[0];

    //     this.breadcrumbs = responseList[1].breadcrumbs;

    //     if (this.config.isRegion) {
    //       this.breadcrumbs[2].label = type + ' by Region';
    //       this.bsAltLine = responseList[1].bsAltLine.replaceAll(
    //         'State',
    //         'Regions'
    //       );
    //     } else {
    //       this.breadcrumbs[2].label = type + ' by State';
    //       this.bsAltLine = responseList[1].bsAltLine;
    //     }
    //     this.ctaText = responseList[1].ctaText;
    //     this.infoCheckBox = responseList[1].infoCheckBox;
    //   });

    let input = this.router.url;
    let fields = input.split('-');

    this.config.schema = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: title,
        url: 'https:\u002F\u002F' + 'heatfleet.com' + fields[0],
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: description,
      },
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'WebSite',
        name: 'Heat Fleet',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
      },

      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          // commented_v
          // {
          //   '@type': 'ListItem',
          //   position: '1',
          //   item: {
          //     '@id': '\u002F' + this.breadcrumbsService.breadcrumbs[0].url,
          //     name: this.breadcrumbsService.breadcrumbs[0].label,
          //   },
          // },
          // {
          //   '@type': 'ListItem',
          //   position: '2',
          //   item: {
          //     '@id': '\u002F' + page_type + '.html',
          //     name: this.breadcrumbsService.breadcrumbs[1].label,
          //   },
          // },
        ],
      },
    ];
    setTimeout(() => {
      let topSection = this.document.getElementById('topSection');
      let header = this.document.getElementById('header');
      // commented_v
      // this.content.scrollToPoint(
      //   0,
      //   topSection.offsetTop - header.clientHeight - 5
      // );

      let schema_ = [];
      this.states.forEach((el) => {
        el.default = false;
        var imageUrl;
        if (el.imageUrl) {
          imageUrl = el.imageUrl;
        } else {
          imageUrl = '';
        }
        schema_.push({
          '@context': 'http:\u002F\u002Fschema.org',
          '@type': 'State',
          name: el.stateName,
          url: 'https://heatfleet.com/' + this.config.typeURL + this.getUrl(el),
          image: imageUrl,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'United States',
          },
        });
      });

      this.config.schema = [...this.config.schema, ...schema_];
      this.config.insertSchema(this.config.schema, 'structured-data-org');
    }, 1000);
  }
  public getRandomId() {
    return Math.floor(Math.random() * 6 + 1);
  }
  getUrl(loc: any) {
    let stateName = loc.stateName.replaceAll(' ', '_');

    let url = loc.stateId + '-' + stateName + '.html';

    return url;
  }

  ionViewWillEnter() {
    // commented_v
    // this.breadcrumbsService.createFromUrl(
    //   this.router.url.split('/')[1],
    //   'home'
    // );

    // this.breadcrumbsService.breadcrumbs$.subscribe((data) => {});
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

  navigateUrl(event, url) {
    event.preventDefault();
    this.router.navigate([url]);
  }

  navigateState(res, event) {
    var url = this.config.typeURL + this.getUrl(res);
    event.preventDefault();
    this.config.navigate(url);
  }

  headerInit(n) {
    this.fetchInit();
  }

  getStates(url){
    return this.http.get(url);
  }

  getPageDetails(url3){
    const url = environment.api_url + `locations/getPageDetails?${url3}`;
    return this.http.get(url);
  }
}
