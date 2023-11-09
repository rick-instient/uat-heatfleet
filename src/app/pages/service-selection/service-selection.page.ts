import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BUSINESS_TYPES } from 'src/app/shared/api/constants';

import { Title, Meta } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/shared/services/common.config';

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.page.html',
  styleUrls: ['./service-selection.page.scss'],
})
export class ServiceSelectionPage implements OnInit {
  services: Array<any> = [];

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    public config: CommonService
  ) {}

  ngOnInit() {
    this.config.updateCanonicalUrl('https://heatfleet.com' + this.router.url);

    this.services = BUSINESS_TYPES;
    // this.breadcrumbsService.createFromPage('home services', 'home_services');

    let title = 'Discover Our Services | Heat Fleet';
    let description =
      'Search hundreds of oil companies at once to find the best home heating oil prices.';
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

    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:title', content: title });
    this.meta.addTag({ property: 'og:url', content: this.router.url });
    this.meta.addTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ property: 'twitter:description', content: description });
    this.meta.addTag({ property: 'twitter:title', content: title });
    this.meta.addTag({ property: 'twitter:site', content: this.router.url });
    this.meta.addTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.addTag({ property: 'twitter:description', content: description });
    this.meta.addTag({ property: 'twitter:title', content: title });
    this.meta.addTag({ property: 'twitter:site', content: this.router.url });
    this.meta.addTag({
      property: 'og:image',
      content:
        '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
    });
    this.meta.addTag({
      property: 'twitter:image',
      content:
        '/assets/icons/9m-Heat-Fleet-Heating-Oil-Logo.svg',
    });

    let input = this.router.url;
    let fields = input.split('-');

    let schema = [
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
          {
            '@type': 'ListItem',
            position: '1',
            item: {
              // '@id': '\u002F' + this.breadcrumbsService.breadcrumbs[0].url,
              // name: this.breadcrumbsService.breadcrumbs[0].label,
            },
          },
        ],
      },
    ];

    this.config.insertSchema(schema, 'structured-data-org');
  }

  getUrl() {
    // return `${getHash(str.trim().toLowerCase())}-${capitalizeWords(str)
    //   .trim()
    //   .replace(/ /g, '_')}.html`;
    // if(str){
    //   return `Heating_Oil_Prices/States.html`;
    // }else{
    //   return `States.html`
    // }
    return `Heating_Oil_Prices/States.html`;
  }

  navigateUrl(event, url) {
    event.preventDefault();
    this.router.navigate([url]);
  }
}
