import {
  Component,
  OnInit,
  Input,
  Inject,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
// import { IonContent, NavController } from '@ionic/angular';
// import { environment } from 'src/environments/environment';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';
// import { WINDOW } from 'src/app/heatfleet-landing/window.service';
import { DatePipe } from '@angular/common';
// import { ILocation } from 'src/shared/models/location.model';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '../../services/common.config';
import { HostListener } from '@angular/core';
// import { log } from 'console';


export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-section-bestprices',

  templateUrl: './section-bestprices.component.html',
  styleUrls: ['./section-bestprices.component.scss'],
})
export class SectionBestpricesComponent implements OnInit {
  private window: CustomWindow;
  @Input() data_: any;
  @Input() townData: any;
  @Input() lastUpdate: string = '';
  @Input() townSelector: any;
  @Input() LandingPage: any;
  @Input() townPage: any;
  @Input() stateName: any;
  @Input() city: any;
  @Input() state: any;
  @Input() stateId: any;
  @Input() isCompanyAvailable: any;

  data_Arr: any;
  data_Arr_hidden = [];
  data_states: any;
  // @ViewChild(IonContent, { static: false }) content: IonContent;
  duplicateTownList: any;
  showMore = false;
  showLess = false;
  showContent: boolean = false;
  dataLength: any;
  townList: any;
  firstTimeLoaded = false;
  hideArray = false;
  townSchema = [];
  showButtonEnable = false;
  data_Arr2: any;
  data_states2: any;
  isLandingPage: boolean = false;
  isHeatingOilPage: boolean = false;
  stateData = [
    {
      zip: '06416',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'CT',
      state_name: 'Connecticut',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 3.89064,
    },
    {
      zip: '01005',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'MA',
      state_name: 'Massachusetts',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 3.89995,
    },
    {
      zip: '13502',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'NY',
      state_name: 'New York',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 4.06541,
    },
    {
      zip: '03217',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'NH',
      state_name: 'New Hampshire',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 3.87973,
    },
    {
      zip: '05660',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'VT',
      state_name: 'Vermont',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 3.98933,
    },
    {
      zip: '02816',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'RI',
      state_name: 'Rhode Island',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 3.87123,
    },
    {
      zip: '04401',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'ME',
      state_name: 'Maine',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 3.79863,
    },
    {
      zip: '08520',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'NJ',
      state_name: 'New Jersey',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 3.90565,
    },
    {
      zip: '16841',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'PA',
      state_name: 'Pennsylvania',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 3.98149,
    },
    {
      zip: '21228',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'MD',
      state_name: 'Maryland',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 4.3325,
    },
    {
      zip: '11204',
      lat: 0,
      lng: 0,
      city: null,
      state_id: 'LI',
      state_name: 'Long Island',
      county_fips: null,
      county_name: null,
      isActive: true,
      dist: null,
      price: 4.053,
    },
  ];

  innerWidth: number;

  constructor(
    public config: CommonService,
    // @Inject(WINDOW) public window: Window,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private ref: ChangeDetectorRef
  ) {
    this.window = <any>this.document.defaultView;
    if (this.router.url.split('/')[1].replace('.html', '') == 'heating_oil') {
      this.isHeatingOilPage = true;
    }
    if (this.router.url.split('/')[1] == '') {
      this.isLandingPage = true;
    }
  }

  ngOnInit() {
    let elem: any = this.document.getElementById('containarray');
    // elem.style.display = 'none';
    this.innerWidth = this.window.innerWidth;
  }

  navigateTo(event: any) {
    event.preventDefault();
    this.config.isRegion = false;
    // commented_v
    this.config.navigate('States.html');
  }

  ngOnChanges() {
    if (
      (this.townPage || this.townSelector || this.LandingPage) &&
      this.data_
    ) {
      // commented_v
      let innerWidth = this.window.innerWidth;

      this.config.innerWidth = innerWidth;

      if (this.config.innerWidth <= 500) {
        this.config.mobile_view = true;
      } else {
        this.config.mobile_view = false;
      }



      if (this.data_) {
        if (this.config.innerWidth <= 1072) {
          this.data_states = this.data_;
        } else {
          this.data_states = this.data_.slice(0, 5);
          this.data_states2 = this.data_.slice(5, 10);
        }
      }

      let townList = this.data_;

      this.duplicateTownList = townList;
      this.ref.detectChanges();
      if (this.config.mobile_view) {
        if (townList && townList.length > 15) {
          this.showMore = true;
          let elem: any = this.document.getElementById('containarray');
          // elem.style.display = 'none';
        }
        let count: any = [];
        let count2: any = [];

        this.duplicateTownList.forEach((el: any) => {
          if (el.price) {
            count.push(el);
          } else {
            count2.push(el);
          }
        });

        if (this.config.innerWidth <= 1072) {
          this.data_Arr = townList.slice(0, 15);
          this.data_Arr_hidden = count2;
        } else {
          this.data_Arr = townList.slice(0, 8);
          this.data_Arr2 = townList.slice(8, 15);
          this.data_Arr_hidden = count2;
        }

        if (count && count.length > 15) {
          this.showButtonEnable = true;
          // commented_v
          // this.data_Arr_hidden = [
          //   ...this.data_Arr_hidden,
          //   ...count.slice(31, count.length),
          // ];
        } else {
          this.showButtonEnable = false;
        }
      } else {
        if (townList && townList.length > 30) {
          this.showMore = true;

          let elem: any = this.document.getElementById('containarray');
          // elem.style.display = 'none';
        }

        let count: any = [];
        let count2: any = [];

        this.duplicateTownList.forEach((el: any) => {
          if (el.price) {
            count.push(el);
          } else {
            count2.push(el);
          }
        });

        if (this.config.innerWidth <= 1072) {
          this.data_Arr = count.slice(0, 10);
          this.data_Arr_hidden = count2;
        } else {
          this.data_Arr = count.slice(0, 15);
          this.data_Arr2 = count.slice(15, 30);
          this.data_Arr_hidden = count2;
        }

        if (count && count.length > 30) {
          this.showButtonEnable = true;
          // this.data_Arr_hidden = [
          //   ...this.data_Arr_hidden,
          //   ...count.slice(31, count.length),
          // ];
        } else {
          this.showButtonEnable = false;
        }
      }

      this.firstTimeLoaded = true;

      if (this.townPage && this.townSchema.length == 0) {
        this.townSchema = [];

        let maximumValue = Math.max.apply(
          Math,
          this.data_Arr.map(function (obj: any) {
            return obj.price;
          })
        );
        let minValue = Math.min.apply(
          Math,
          this.data_Arr.map(function (obj: any) {
            return obj.price;
          })
        );
        // commented_v
        // this.townSchema = [
        //   {
        //     '@context': 'http:\u002F\u002Fschema.org',
        //     '@type': 'AggregateOffer',
        //     areaServed: this.city,
        //     highPrice: maximumValue,
        //     lowPrice: minValue,
        //     offerCount: 30,
        //     acceptedPaymentMethod: 'Cash, Credit',
        //     availability: 'https://schema.org/InStock',
        //     category: 'Heating Oil',
        //     alternateName: 'Home Heating Oil / Fuel Oil',
        //     name: 'Heating Oil',
        //     description:
        //       'Heating oil is any petroleum product or other oil used for heating; a fuel oil. Most commonly, it refers to low viscosity grades of fuel oil used for furnaces or boilers use for home heating and in other buildings.',
        //     sameAs: 'https://en.wikipedia.org/wiki/Heating_oil',
        //     priceCurrency: 'USD',
        //     eligibleQuantity: {
        //       '@type': 'QuantitativeValue',
        //       value: 100,
        //       unitCode: 'GLL',
        //     },
        //     offers: [],
        //   },
        // ];

        let offers: any = [];
        // commented_v
        // this.townSchema[0].offers: = offers;

        this.config.schema = [...this.config.schema, ...this.townSchema];
      }
    }
  }

  editSchoolName(schools: any[], oldName: any, name: any) {
    return schools.map((item) => {
      var temp = Object.assign({}, item);
      if (temp.name === oldName) {
        temp.name = name;
      }
      return temp;
    });
  }

  loadMore_Cities(event: any, fig: boolean) {

    let stateName = this.config.replaceAll(this.stateName, ' ', '_');

    let url =
      this.config.typeURL + this.stateId + '-' + stateName + '-Cities.html';

    if (fig == true) {
      event.preventDefault();

      this.config.breadcrumbNav = {
        label: this.stateName,
        url: this.router.url,
        type: 1,
        stateName: '',
      };

      console.log(url);
      
      this.router.navigate([url]);
      return null;
    } else {
      return url;
    }
  }
  loadMore() {
    this.showMore = false;
    this.showLess = true;

    // this.hideArray = true;

    this.data_Arr = [];
    this.data_Arr = this.data_;

    this.data_Arr_hidden = this.duplicateTownList;
    this.ref.detectChanges();
  }

  loadLess() {
    this.showMore = true;
    this.showLess = false;
    this.hideArray = false;

    if (this.config.mobile_view) {
      this.data_Arr = this.data_Arr.slice(0, 10);
    } else {
      this.data_Arr = this.data_Arr.slice(0, 30);
    }
  }

  validateTodayDate(date: string | number | Date) {
    const today = new Date().getDate();
    const updateddate = new Date(date).getDate();
    if (updateddate == today) {
      return 'Today';
    }
    return (
      new DatePipe('en-US').transform(date, 'yyyy-dd-MM') +
      'at' +
      new Date(date).getTime()
    );
  }

  navigateState(res: { state_name: any; state_id: string }) {
    let state_name = this.config.replaceAll(res.state_name, ' ', '_');
    var url = this.config.typeURL + res.state_id + '-' + state_name + '.html';
    return url;
  }

  navigateState2(
    res: { state_name: any; state_id: string },
    event: { preventDefault: () => void }
  ) {
    let state_name = this.config.replaceAll(res.state_name, ' ', '_');
    var url = this.config.typeURL + res.state_id + '-' + state_name + '.html';
    event.preventDefault();
    this.config.navigate(url);
  }

  navigate(event: any, city: any, fig: any) {
    // console.log('Nvv');
    var url = this.config.typeURL + this.getUrl(city);
    if (fig == true) {
      console.log('Nvv2');
      if (city.townName) {
        event.preventDefault();
      }
      console.log(url);

      this.config.navigate(url);
      return false;
    } else {
      if (city.townName) {
        let inputFields = this.router.url.split('-');
        let stateHash = inputFields[1];
        if (stateHash == 'li') {
          url = this.config.replaceAll(url, 'li', 'ny');
          return url;
        } else {
          return url;
        }
      } else {
        return 'https://heatfleet.com/';
      }
    }
  }

  getUrl(loc: any) {
    var businesshash = this.router.url.split('/')[2].split('-')[0].trim();

    let town = loc.townName
      .replace(/\b\w/g, (match: string) => match.toUpperCase())
      .replace(/\s/g, '_');
    let townName = town;

    townName = townName.replaceAll(' ', '-');

    if (townName.length === 3) {
      townName = townName + '_';
    }

    if (loc.isRegion) {
      loc.regionName = loc.regionName
        .replace(/\b\w/g, (match) => match.toUpperCase())
        .replace(/\s/g, '_');
      let url = `${loc.hash}-${townName}_${loc.regionName}-${loc.stateId}.html`;
      url = url.replace(/__/g, '_');
      return url;
    }

    return `${loc.hash}-${townName}-${businesshash}.html`;
  }

  navigateCompany(event: any, n: any, fig: any) {
    var companyName;
    if (n.companyDBA) {
      companyName = n.companyDBA;
    } else {
      companyName = n.companyname
    }this.isCompanyAvailable                       

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
    let townName = this.config.replaceAll(n.townName, ' ', '_');

    if (townName.length === 3) {
      townName = townName + '_';
    }

    if (n.isRegion) {
      n.regionName = n.regionName
        .replace(/\b\w/g, (match: any) => match.toUpperCase())
        .replace(/\s/g, '_');

      townName = townName + '_' + n.regionName;
      var url =
        'heating_oil/' +
        n.townHash +
        '-' +
        n.companyHash +
        '-' +
        companyName +
        '-' +
        townName +
        '-' +
        n.stateHash.toUpperCase() +
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
        townName +
        '-' +
        n.stateHash.toUpperCase() +
        '.html';
    }

    if (fig == true) {
      event.preventDefault();
      this.router.navigate([url]);
      return true;
    } else {
      return url;
    }
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }

  fetchName(n: string) {
    return n + ' heating oil prices';
  }

  sitemapURL(n: string) {
    // commented_v
    // if (environment.stage == 'prod') {
    //   return n;
    // }
    // if (environment.stage == 'dev') {
    //   let url = this.config.replaceAll(
    //     n,
    //     'https://heatfleet.com',
    //     'https://heatfleet-dev-client-ssr-hf.sigmanet.info'
    //   );
    //   return url;
    // }
    // if (environment.stage == 'uat') {
    //   let url = this.config.replaceAll(
    //     n,
    //     'https://heatfleet.com',
    //     'https://demo.heatfleet.com'
    //   );
    //   return url;
    // }
  }

  getButtonText(n: any) {
    if (n == 'type=1') {
      var sl = 'HEATING OIL';
    } else if (n == 'subType=1') {
      var sl = 'OIL COMPANIES';
    } else if (n == 'subType=2') {
      var sl = 'HEATING OIL PRICES';
    } else if (n == 'subType=3') {
      var sl = 'OIL DELIVERY';
    } else if (n == 'type=2') {
      var sl = 'HEATING REPAIR';
    }
    return (
      'VIEW ' + sl + ' FOR ALL ' + this.stateName.toUpperCase() + ' CITIES'
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = this.window.innerWidth;
  }
}
