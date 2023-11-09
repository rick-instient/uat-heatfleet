import { Component, Inject, Input } from '@angular/core';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.config';
// import { WINDOW } from '../../services/window.service';

import { DOCUMENT } from '@angular/common';

export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-section-near',
  templateUrl: './section-near.component.html',
  styleUrls: ['./section-near.component.scss'],
})
export class SectionNearComponent {
  private window: CustomWindow;
  @Input() nearestTowns: any;

  constructor(
    public config: CommonService,
    @Inject(DOCUMENT) private document: Document,
    // commented_v
    // @Inject(WINDOW) public window: Window,
    private router: Router
  ) {
    this.window = <any>this.document.defaultView;

  }

  navigate(event, city, fig) {
    let townName = this.config.replaceAll(city.townName, ' ', '_');
    if (townName.length === 3) {
      townName = townName + '_';
    }

    if (city.isRegion) {
      city.regionName = city.regionName
        .replace(/\b\w/g, (match) => match.toUpperCase())
        .replace(/\s/g, '_');
      var url =
        this.config.typeURL +
        city.hash +
        '-' +
        townName +
        '_' +
        city.regionName +
        '-' +
        city.stateId +
        '.html';
      url = url.replace(/__/g, '_');
    } else {
      var url =
        this.config.typeURL +
        city.hash +
        '-' +
        townName +
        '-' +
        city.stateId +
        '.html';
    }

    if (fig == true) {
      if (city.townName) {
        event.preventDefault();
      }

      this.router.navigate([url]);

      setTimeout(() => {

        this.window.location.reload();
      }, 1000);

      return true;
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
}
