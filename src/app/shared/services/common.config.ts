import { Injectable, Inject, Optional, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { CookieService } from 'ngx-cookie-service';

export interface CustomWindow extends Window {

  customProperty: boolean;
}


@Injectable({
  providedIn: 'root',
})


export class CommonService {
  private window: CustomWindow;
  deviceId: any;
  onScrollFix = false;
  login = true;
  dealer = true;
  islogin = true;
  noClick = false;
  public IsLoggedIn = false;
  isVendor = false;
  zipCodeGeo: any;
  pricesData: any;
  selectedDeliveryAddress: any;
  EnableLoggedInUser :any= false;
  delivery_address: any;
  finalAmount: any;
  order_summary: any;
  companyNavigate = false;
  isAgent = false;
  metaTownDesc: any;
  metaTownTitle: any;
  metaCompanyDesc: any;
  metaCompanTitle: any;
  email_entered: any;
  companyProfile_Data: any;
  townProfile_Data: any;
  navigateCompanyId: any;
  isRegion = false;
  whitelistbots = new Set([
    'APIs-Google',
    'AdsBot-Google-Mobile',
    'AdsBot-Google',
    'Mediapartners-Google',
    'Googlebot-Image',
    'Googlebot',
    'Googlebot-News',
    'Googlebot-Video',
    'AdsBot-Google-Mobile-Apps',
    'FeedFetcher-Google',
    'bingbot',
  ]);
  epochNow: any;
  innerWidth: any;
  mobile_view = true;
  activeCompany = false;
  schema = [];
  faqs: any;

  typeComp = 'type=1';
  typeURL = 'heating_oil/';
  typeCategory = 'type=1';
  typeParam = 'type=1';
  onlyLanding = false;

  zipSearchModal: boolean = false;


  breadcrumbNav = {
    label: 'States',
    url: 'States.html',
    stateName: '',
    type: 0,
  };

  landing: any = [
    {
      '@context': 'http:\u002F\u002Fschema.org',
      '@type': 'Organization',
      name: 'Heat Fleet',
      url: 'https:\u002F\u002Fheatfleet.com\u002F',
      logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
      description:
        'Search hundreds of oil companies at once to find the best home heating oil prices.',
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

  faqsContent = [
    // {
    //   question:
    //     'How does The Heat Fleet heating oil delivery marketplace work?',
    //   answer:
    //     'We research the heating oil market in your county to find most reliable discount oil companies with the best prices, and invite them to join The Heat Fleet. They post deals their best deals to the marketplace. (We also provide a list of non-member oil companies, just in case you want to double-check to make sure our deals are the best!) When you place an order with Heat Fleet, we instantly transmit it to your selected provider’s dispatcher, who schedules delivery on or before your specified delivery date. After delivery, we’ll send you a confirmation e-mail!',
    //   type: false,
    //   checked: false,
    // },
    // {
    //   question:
    //     'How do you calculate average heating oil prices for towns, price estimate ranges for non-member companies, and savings estimates?',
    //   answer:
    //     'We estimate these values based on a number of factors, including: prices that our users input for non-member companies, the wholesale oil prices that heating oil companies pay, and the price of heating oil futures on the US commodities exchanges. All estimated price, price ranges, and savings values are only directional estimates, and should only be relied on for informational purposes. Please call non-member oil companies directly for price information before making any purchase decisions.',

    //   type: false,
    //   checked: false,
    // },
    {
      question: 'What if oil prices change after I order, but before delivery?',
      answer: 'Your price is locked in when you place the order.',
      type: false,
      checked: false,
    },

    {
      question: 'Do I need to be home for the delivery?',
      answer: 'Credit card orders: You don’t need to be home.',
      description2:
        'Cash/check orders: Your provider will call you to arrange payment. Many providers are happy to agree on a hiding place (e.g. under the doormat) for check payments if you don’t expect to be home. Some providers require payment directly to the driver.',
      type: 'ul',
      checked: false,
    },
    {
      question: 'How much oil should I order?',
      answer:
        '95% of homes have 275 gallon oil tanks, and if you have around ¼ tank, we recommend ordering 150 gallons to take advantage of bulk discounts, which typically kick in at 150 gallons.',
      type: false,
      checked: false,
    },
    {
      question:
        'What is a “cash/check deal” and why is it cheaper than a regular credit card deal?',
      answer:
        'Many oil companies offer a discount for cash or check payment because this avoids credit card fees. If you grab a cash/check deal, the provider contacts you prior to delivery to arrange payment.',
      type: false,
      checked: false,
    },
  ];

  constructor(
    // public alertController: AlertController,
    // public navCtrl: NavController,
    // public toastController: ToastController,
    @Inject(DOCUMENT) private dom: any,
    private meta: Meta,
    private router: Router,
    // public networkService: NetworkService,
    public http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    // @Inject(CookieService) private cookieService: CookieService,
  ) {
    this.epochNow = '16800000000';
    this.window = <any>this.document.defaultView;
  }

  enableMenuClose() {
    this.login = true;
    this.dealer = true;
    this.islogin = true;
  }

  async storageSave(name:any, name1:any) {
    if (name && name1) {
     localStorage.removeItem(name);
      const value = typeof name1 === 'string' ? name1 : JSON.stringify(name1);
     localStorage.setItem(name, value);
    }
  }

  async storageClear() {
    if (localStorage) {
      localStorage.clear();
    }
  }

  async storageGet(get:any) {
    let val2 :any=  localStorage.getItem(get);

    return typeof val2 === 'string' ? val2 : JSON.parse(val2);
  }

  async storageRemove(name:any) {
    if (name) {
      localStorage.removeItem(name);
    }
  }

  replaceAll(string:any, search:any, replace:any) {
    if (string != null) {
      return string.split(search).join(replace);
    } else {
      return '';
    }
  }

  updateCanonicalUrl(url: string) {
    const head = this.dom.getElementsByTagName('head')[0];
    var element: HTMLLinkElement =
      this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
    this.meta.updateTag({ property: 'og:url', content: url });
  }

  insertSchema(schema:any, className:any): void {
    // console.log('Schema:', schema);
    let scriptType: any = 'application/ld+json';
    let script;
    let shouldAppend = false;
    if (this.dom.head.getElementsByClassName(className).length) {
      script = this.dom.head.getElementsByClassName(className)[0];
    } else {
      script = this.dom.createElement('script');
      shouldAppend = true;
    }
    script.setAttribute('class', className);
    script.type = scriptType;
    script.text = JSON.stringify(schema);

    if (shouldAppend) {
      this.dom.head.appendChild(script);
    }
  }

  capitalize = (str:any) => {
    if (typeof str !== 'string') {
      throw Error('Feed me string');
    } else if (!str) {
      return '';
    } else {
      return str
        .split(' ')
        .map((s) => {
          if (s.length == 1) {
            return s.toUpperCase();
          } else {
            const firstLetter = s.split('')[0].toUpperCase();
            const restOfStr = s.substr(1, s.length).toLowerCase();
            return firstLetter + restOfStr;
          }
        })
        .join(' ');
    }
  };

  getCityName(n:any) {
    let pricesData = [
      {
        state_id: 'CT',
        state_name: 'Connecticut',
        price: '',
      },
      {
        state_id: 'DE',
        state_name: 'Delaware',
        price: '',
      },
      {
        state_id: 'OH',
        state_name: 'Ohio',
        price: '',
      },
      {
        state_id: 'VA',
        state_name: 'Virginia',
        price: '',
      },

      {
        state_id: 'MA',
        state_name: 'Massachusetts',
        price: '',
      },
      {
        state_id: 'NY',
        state_name: 'New York',
        price: '',
      },
      {
        state_id: 'NH',
        state_name: 'New Hampshire',
        price: '',
      },
      {
        state_id: 'VT',
        state_name: 'Vermont',
        price: '',
      },
      {
        state_id: 'RI',
        state_name: 'Rhode Island',
        price: '',
      },
      {
        state_id: 'ME',
        state_name: 'Maine',
        price: '',
      },
      {
        state_id: 'NJ',
        state_name: 'New Jersey',
        price: '',
      },
      {
        state_id: 'PA',
        state_name: 'Pennsylvania',
        price: '',
      },
      {
        state_id: 'MD',
        state_name: 'Maryland',
        price: '',
      },

      // regions

      {
        state_id: 'LI',
        state_name: 'Long Island',
        price: '',
      },

      {
        state_id: 'CC',
        state_name: 'Cape Cod',
        price: '',
      },
      {
        state_id: 'SS',
        state_name: 'South Shore Massachusetts',
        price: '',
      },
      {
        state_id: 'SM',
        state_name: 'Southern Maine',
        price: '',
      },
      {
        state_id: 'WM',
        state_name: 'Western Mass',
        price: '',
      },
      {
        state_id: 'MC',
        state_name: 'Mid Coast Maine',
        price: '',
      },
      {
        state_id: 'CM',
        state_name: 'Central Maine',
        price: '',
      },
    ];

    let state_name = '';

    pricesData.forEach((el) => {
      if (el.state_id === n.toUpperCase()) {
        state_name = el.state_name;
      }
    });

    return state_name;
  }

  getTypeURL() {
    let sp = this.router.url.split('/')[1].replace('.html', '');

    if (sp == 'heating_oil_prices') {
      this.typeURL = 'heating_oil_prices/'; //
      this.typeCategory = 'type=1';
      this.typeParam = 'subType=2';
      return;
    } else if (sp == 'heating_oil') {
      this.typeComp = 'type=1'; //
      this.typeParam = 'type=1';
      this.typeCategory = 'type=1';
      this.typeURL = 'heating_oil/';
      return;
    } else if (sp == 'oil_companies') {
      this.typeURL = 'oil_companies/';
      this.typeCategory = 'type=1';
      this.typeParam = 'subType=1';
      return;
    } else if (sp == 'oil_delivery') {
      this.typeURL = 'oil_delivery/';
      this.typeCategory = 'type=1';
      this.typeParam = 'subType=3';
      return;
    }
  }

  fetchStateName(_id:any) {
    let HashState = new Map([
      ['CT', 'Connecticut'],
      ['DE', 'Delaware'],
      ['OH', 'Ohio'],
      ['VA', 'Virginia'],
      ['MA', 'Massachusetts'],
      ['NY', 'New York'],
      ['NH', 'New Hampshire'],
      ['VT', 'Vermont'],
      ['RI', 'Rhode Island'],
      ['ME', 'Maine'],
      ['NJ', 'New Jersey'],
      ['PA', 'Pennsylvania'],
      ['MD', 'Maryland'],
      ['LI', 'Long Island'],
    ]);

    return HashState.get(_id);
  }

  fetchStateCode(_id:any) {
    let HashState = new Map([
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Ohio', 'OH'],
      ['Virginia', 'VA'],
      ['Massachusetts', 'MA'],
      ['New York', 'NY'],
      ['New Hampshire', 'NH'],
      ['Vermont', 'VT'],
      ['Rhode Island', 'RI'],
      ['Maine', 'ME'],
      ['New Jersey', 'NJ'],
      ['Pennsylvania', 'PA'],
      ['Maryland', 'MD'],
      ['Long Island', 'LI'],
    ]);

    return HashState.get(_id);
  }

  navigate(url){
    this.router.navigate([url]);
  }




    getRefreshToken(){
      return ""
    }

    getCookie(name: string): string | null {
      const cookies = this.document.cookie.split('; ');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    }

    
  replaceCookie(name: string, newValue: string, options: string = ''): void {
    // Check if the cookie exists
    if (this.getCookie(name) !== null) {
      // Set the expiration date to a past date to delete the cookie
      this.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

      // Set the new cookie with the updated value and options
      this.document.cookie = `${name}=${encodeURIComponent(newValue)}; ${options}`;
    }
  }

  removeAllCookies(): void {
    const cookies = this.document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName] = cookie.split('=');
      // Set the expiration date to a past date to delete the cookie
      this.document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }

}
