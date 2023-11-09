import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.config'; 
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service'; 
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage {
  searchText: any;
  epochNow: any;
  AddressInput_Id: any;

  private isRefreshingToken: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    public clientbase: CommonService,
    private title: Title,
    private meta: Meta,
    protected authenticationServie: AuthenticationService,
  ) {
    this.epochNow = '16800000000';
    let title_ = 'Press Center | About HeatFleet.com';
    this.title.setTitle(title_);
    let description =
      'The most comprehensive home heating oil directory in America. Homeowners can save $100 per delivery or more with our free oil price search engine.';
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
      { property: 'og:title', content: title_ },
      { property: 'og:url', content: this.router.url },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: description },
      { property: 'twitter:title', content: title_ },
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
  }

  ngOnInit(): void {
    // this.clientbase.checkCookie();
    this.clientbase.updateCanonicalUrl(
      'https://heatfleet.com' + this.router.url
    );

    let schema = [
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'Organization',
        name: 'Press Center | About HeatFleet.com',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
        logo: 'https:\u002F\u002Fmedia-cdn.heatfleet.com\u002F9m-Heat-Fleet-Heating-Oil-Logo.svg',
        description: 'About Heat Fleet',
      },
      {
        '@context': 'http:\u002F\u002Fschema.org',
        '@type': 'WebSite',
        name: 'Press Center | About HeatFleet.com',
        url: 'https:\u002F\u002Fheatfleet.com\u002F',
      },
    ];

    this.clientbase.insertSchema(schema, 'structured-data-org');

    this.clientbase.storageSave('AddressInput_Id', this.AddressInput_Id);

    if (this.clientbase.delivery_address) {
      if (this.authenticationServie.isAuthenticated()) {
        this.clientbase.EnableLoggedInUser = 'EnableLoggedInUser';
        this.authenticationServie
          .refreshAccessToken(this.clientbase.getRefreshToken())
          .pipe(
            finalize(() => {
              this.isRefreshingToken.next(false);
            })
          )
          .subscribe(
            (res) => {
              this.clientbase.EnableLoggedInUser = 'EnableLoggedInUser';
              var selectedDeliveryAddress =
                this.clientbase.selectedDeliveryAddress;
              if (selectedDeliveryAddress == undefined) {
                var selectedDeliveryAddress = this.clientbase.delivery_address[0];
              }

              if (selectedDeliveryAddress == undefined) {
                this.clientbase.EnableLoggedInUser = null;
                this.clientbase.delivery_address = false;
                // this.zipSearch();
                return;
              }
              var deliveryStreet1 = '';

              if (selectedDeliveryAddress.deliveryStreet1) {
                deliveryStreet1 =
                  selectedDeliveryAddress.deliveryStreet1 + ' ';
              }

              this.AddressInput_Id = selectedDeliveryAddress.id;
            },
            (err) => {
              this.clientbase.delivery_address = undefined;
              this.clientbase.EnableLoggedInUser = '';

              this.clientbase.storageRemove('delivery_address');

              this.clientbase.IsLoggedIn = false;
            }
          );
      } else {
        this.clientbase.delivery_address = undefined;
        this.clientbase.EnableLoggedInUser = '';
        this.clientbase.storageRemove('delivery_address');
        this.clientbase.IsLoggedIn = false;
        return;
      }
    } else {
      this.clientbase.delivery_address = undefined;
      this.clientbase.EnableLoggedInUser = '';
    }
  }

  // commented_v
  // navigateTo(n) {
  //   this.navCtrl.navigateForward(n);
  // }

  ionViewWillEnter() {
    this.clientbase.onScrollFix = false;
  }

  // commented_v
  // ngAfterViewInit() {
  //   this.content.ionScroll.subscribe(($event) => {
  //     let sc_position = $event.detail.scrollTop;

  //     if (sc_position > 196.66) {
  //       this.clientbase.onScrollFix = true;
  //       this.clientbase.islogin = true;
  //       this.clientbase.login = true;
  //     } else {
  //       this.clientbase.onScrollFix = false;
  //     }
  //   });
  // }
}
