import { Component, Inject, Input } from '@angular/core';
import { CommonService } from '../../services/common.config';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
// import { WINDOW } from '../../services/window.service';

export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-heating-oil-locations',
  templateUrl: './heating-oil-locations.component.html',
  styleUrls: ['./heating-oil-locations.component.scss'],
})
export class HeatingOilLocationsComponent {
  private window: CustomWindow;
  stateUrl: any;
  cityUrl: any;
  countiesUrl: any;
  regionUrl: any;
  typeUrl: any;
  @Input() LandingPage: any;
  @Input() topTowns: any;
  @Input() topCounties: any;
  regionList: any;
  stateList: any;
  @Input() stateProfileRouter: any;

  constructor(
    public config: CommonService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    // @Inject(WINDOW) public window: Window
  ) {
    this.window = <any>this.document.defaultView;
    this.config.getTypeURL();
    this.stateUrl = this.config.typeURL + 'States.html';
    this.regionUrl = this.config.typeURL + 'Regions.html';
    this.countiesUrl = this.config.typeURL + 'Counties.html';
    this.cityUrl = this.config.typeURL + 'Cities.html';

    this.stateList = [
      {
        state_id: 'NY',
        state_name: 'New York',
        url: 'NY-New_York.html',
      },
      {
        state_id: 'CT',
        state_name: 'Connecticut',
        url: 'CT-Connecticut.html',
      },
      {
        state_id: 'MA',
        state_name: 'Massachusetts',
        url: 'MA-Massachusetts.html',
      },
      {
        state_id: 'PA',
        state_name: 'Pennsylvania',
        url: 'PA-Pennsylvania.html',
      },
      {
        state_id: 'NH',
        state_name: 'New Hampshire',
        url: 'NH-New_Hampshire.html',
      },
      {
        state_id: 'VT',
        state_name: 'Vermont',
        url: 'VT-Vermont.html',
      },
    ];

    this.regionList = [
      {
        state_id: 'LI',
        state_name: 'Long Island',
        url: 'LI-Long_Island.html',
      },
      {
        state_id: 'CC',
        state_name: 'Cape Cod',
        url: 'CC-Cape_Cod.html',
      },
      {
        state_id: 'WM',
        state_name: 'Western Mass',
        url: 'WM-Western_Mass.html',
      },
      {
        state_id: 'SS',
        state_name: 'South Shore, MA',
        url: 'SS-South_Shore_Massachusetts.html',
      },
      {
        state_id: 'SM',
        state_name: 'Southern Maine',
        url: 'SM-Southern_Maine.html',
      },
      {
        state_id: 'CM',
        state_name: 'Central Maine',
        url: 'CM-Central_Maine.html',
      },
    ];
  }

  navigateToURL(event: any, n: any) {
    event.preventDefault();

    if (this.stateProfileRouter) {
      this.router.navigate([n]);
      setTimeout(() => {
        this.window.location.reload();
      }, 1000);
    } else {
      this.router.navigate([n]);
    }
  }

  fetchStateName(n: any) {
    let state = this.config.fetchStateName(n);
    let town = this.config.replaceAll(state, ' ', '_');
    return town;
  }
  getTownName(n: any) {
    let town = this.config.replaceAll(n, ' ', '_');
    town = town.replace(/^\w/, (match: any) => match.toUpperCase());
    return town;
  }

  navigateTo(event: any, n: any) {
    event.preventDefault();
    if (n == 'state') {
      this.config.isRegion = false;
      this.router.navigate([this.stateUrl]);
    }

    if (n == 'region') {
      this.config.isRegion = true;
      this.router.navigate([this.regionUrl]);
    }

    if (n == 'city') {
      this.router.navigate([this.cityUrl]);
    }

    if (n == 'counties') {
      this.router.navigate([this.countiesUrl]);
    }
  }
}
