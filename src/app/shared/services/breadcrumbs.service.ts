import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Breadcrumb } from '../models/breadcrumb.model';
import { Router } from '@angular/router';
import { CommonService } from './common.config';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  breadcrumbs: Breadcrumb[] = [];

  constructor(public config: CommonService, public router: Router) {
    const breadcrumbs: Breadcrumb[] = [];

    this._breadcrumbs$.next(breadcrumbs);
  }

  createFromPage(title: string, url?: string) {
    this.breadcrumbs = [];
    this.breadcrumbs.push({
      label: title,
      url: url ? url : this.config.replaceAll(title, ' ', '_'),
    });

    this._breadcrumbs$.next(this.breadcrumbs);
  }

  createFromUrl(url: string, init?: string) {
    let urlArray = url.split('-');
    this.breadcrumbs = [];

    for (let index = urlArray.length - 1; index >= 0; index--) {
      if (urlArray[index].trim().length > 3) {
        let breadcrumb: Breadcrumb = {
          label: this.config
            .replaceAll(urlArray[index].trim(), '_', ' ')
            .split('.html')[0],
          url: '',

          hash: `${urlArray[urlArray.length - 1 - index]}`,
        };

        this.breadcrumbs.push(breadcrumb);
      }
    }

    // generating urls

    for (let index = 0; index < this.breadcrumbs.length; index++) {
      this.breadcrumbs[index];

      if (index == 0) {
        this.breadcrumbs[index].url = `${this.breadcrumbs[
          index
        ].hash.toLowerCase()}-${this.config.replaceAll(
          this.breadcrumbs[index].label,
          ' ',
          '_'
        )}.html`;
      } else {
        let breadcrumbTemp = [...this.breadcrumbs];
        let hashes = breadcrumbTemp
          .filter((val, curr) => {
            return curr <= index;
          })
          .map((x) => x.hash)
          .join('-');

        let labels = breadcrumbTemp
          .filter((val, curr) => {
            return curr <= index;
          })
          .reverse()
          .map((x) => x.label)
          .join('-');

        this.breadcrumbs[
          index
        ].url = `${hashes.toUpperCase()}-${this.config.replaceAll(
          labels,
          ' ',
          '_'
        )}.html`;
      }
    }

    if (init) {
      this.breadcrumbs.push();
      this.breadcrumbs = [
        { label: this.config.replaceAll(init, '_', ' '), url: init + '.html' },
        ...this.breadcrumbs,
      ];
    }

    let bd = {
      label: 'Oil Prices',
      url: 'States.html',
    };

    this.breadcrumbs.splice(1, 0, bd);

    let cityname: any = this.config.getCityName(this.breadcrumbs[2].label);
    if (cityname && this.breadcrumbs[2]) {
      this.breadcrumbs[2].label = cityname;
    }

    console.log(this.breadcrumbs);

    this._breadcrumbs$.next(this.breadcrumbs);
  }

  private getUrlFromBreadcrumb(currUrl: string): string {
    let url = '';

    for (let i = 0; i < this.breadcrumbs.length; i++) {
      if (this.breadcrumbs[i].label != 'home')
        url += this.breadcrumbs[i].hash + '-';
    }

    url += currUrl;

    return url;
  }
}
