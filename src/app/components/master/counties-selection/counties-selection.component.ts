import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocationService } from 'src/app/shared/api/location.service';
import { Title, Meta } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/shared/services/common.config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-counties-selection',
  templateUrl: './counties-selection.component.html',
  styleUrls: ['./counties-selection.component.scss']
})
export class CountiesSelectionComponent implements OnInit {
  epochNow: any;
  counties: Array<any> = [];
  defaultImgUrl: any;
  bsAltLine: any;
  breadcrumbs: any;
  topTowns: any;
  topCounties: any;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    public config: CommonService,
    private http: HttpClient
  ) {
    this.epochNow = '16800000000';
  }
  ngOnInit() {
    this.breadcrumbs = [
      {
        label: 'Home',
        url: '',
        bsService: 'Heating Oil',
        bsTail: null,
      },
      {
        label: 'Heating Oil',
        url: this.config.typeURL + 'States.html',
        bsService: 'Heating Oil',
        bsTail: null,
      },
      {
        label: 'Heating Oil By County',
        url: 'States.html',
        bsService: null,
        bsTail: null,
      },
    ];

    this.config.getTypeURL();
    if (this.config.typeParam == 'type=1') {
      var type = 'Heating Oil Providers';
      var description =
        'Select a county for your local heating oil directory. Find oil companies, oil prices, heating contractors, and answers to frequently asked questions.';
    } else if (this.config.typeParam == 'subType=1') {
      var type = 'Heating Oil Companies';
      var description =
        'A listing, by county, of local oil companies. Search by discount companies (oil delivery only, COD) or full-service (oil delivery and furance repair).';
    } else if (this.config.typeParam == 'subType=2') {
      var type = 'Heating Oil Prices';
      var description =
        "Find the best oil prices in your county with our free oil price search engine. Homeowners like you save money all winter. TODAY's per gallon prices.";
    } else if (this.config.typeParam == 'subType=3') {
      var type = 'Oil Delivery Options';
      var description =
        'Select your county to find local affordable, dependable oil delivery in your area. Save time and money with our complete directory of oil companies.';
    } else if (this.config.typeParam == 'type=2') {
      var type = 'Heating Repair';
      var description =
        'Select a county for your local heating oil directory. Find oil companies, oil prices, heating contractors, and answers to frequently asked questions.';
    }
    this.bsAltLine = 'Search Fuel Oil by County';

    let title = type + ' | Heat Fleet | Counties';

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

    this.config.updateCanonicalUrl('https://heatfleet.com' + this.router.url);

    // this.locationService.getCounties().subscribe((res: any) => {
    //   this.counties = res;

    //   // res.forEach((element) => {
    //   //   element.defaultImage = false;
    //   //   if (element.imageURL) {
    //   //     element.imageURL =
    //   //       element.imageURL +
    //   //       `?&tr=w-225 225w,` +
    //   //       element.imageURL +
    //   //       `?&tr=w-350 350w,` +
    //   //       element.imageURL +
    //   //       `?&tr=w-700 700w,` +
    //   //       element.imageURL +
    //   //       `?&tr=w-900 900w`;
    //   //   }
    //   // });
    // });
    this.getCountiesApiData().subscribe((res:any)=>{
      this.counties = res;
      console.log(res)
    });


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
    ];

    this.config.insertSchema(this.config.schema, 'structured-data-org');

  }

  getCountiesApiData(){
    const url = environment.api_url + `locations/get-counties`
    return this.http.get(url);
  }

  ionViewWillEnter() {
    this.route.params.subscribe((params) => { });

    this.defaultImgUrl =
      `https://media-cdn.heatingoilfinder.com/izu-pa-4-wycombe-PA-Train-Station.jpg` +
      `?&tr=w-225 225w,` +
      `https://media-cdn.heatingoilfinder.com/izu-pa-4-wycombe-PA-Train-Station.jpg` +
      `?&tr=w-350 350w,` +
      `https://media-cdn.heatingoilfinder.com/izu-pa-4-wycombe-PA-Train-Station.jpg` +
      `?&tr=w-700 700w,` +
      `https://media-cdn.heatingoilfinder.com/izu-pa-4-wycombe-PA-Train-Station.jpg` +
      `?&tr=w-900 900w`;

    // let schema_ = [];
    // this.counties.forEach((el) => {
    //   var imageUrl;
    //   if (el.imageURL) {
    //     imageUrl = el.imageURL;
    //   } else {
    //     imageUrl = '';
    //   }
    //   schema_.push({
    //     '@context': 'http:\u002F\u002Fschema.org',
    //     '@type': 'County',
    //     name: el.countyName,
    //     url: 'https://heatfleet.com/COD_fuel_oil/' + this.getUrl(el),
    //     image: imageUrl,
    //     address: {
    //       '@type': 'PostalAddress',
    //       addressCountry: 'United States',
    //     },
    //   });
    // });

    // this.config.schema = [...this.config.schema, ...schema_];
  }
  updateDefault(n) {
    return (n.defaultImage = true);
  }

  load_Cities(fig, ele, event) {
    let stateCode = ele.state;
    let stateName = ele.stateName.replace(/ /g, '_');
    let countyName = ele.countyName.replace(/ /g, '_');
    let url = stateCode + '-' + stateName + '-' + countyName + '-Cities.html';

    if (fig == true) {
      event.preventDefault();
      this.router.navigate([url]);
      return true;
    } else {
      return url;
    }
  }

  getUrl(loc: any) {
    let stateName = loc.stateName.replace(/ /g, '_');
    let countyName = loc.countyName.replace(/ /g, '_');
    return (
      this.config.typeURL +
      `${loc.state}-${stateName}-${countyName}_County-Cities.html`
    );
  }

  navigateState(res, event) {
    var url = this.getUrl(res);
    event.preventDefault();
    this.config.breadcrumbNav = {
      label: 'Counties',
      stateName: res.stateName,
      url: this.router.url,
      type: 1,
    };
    this.config.navigate(url);
  }

  navigateUrl(event, url) {
    event.preventDefault();
    this.config.navigate(url);
  }
}
