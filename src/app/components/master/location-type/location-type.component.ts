import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

type LocationType = 'state-selection' | 'state-profile' | 'town-profile' | 'company-profile' | 'counties-selection' | 'town-selection';

@Component({
  selector: 'app-location-type',
  templateUrl: './location-type.component.html',
  styleUrls: ['./location-type.component.scss']
})
export class LocationTypeComponent implements OnInit, OnDestroy {

  locationType: LocationType;
  routeSubscription: Subscription;

  constructor(
    public activeRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.setViewBasedOnLocationType();
  }

  setViewBasedOnLocationType() {
    this.routeSubscription = this.activeRoute.params.subscribe((params: Params) => {

      let location: string = params['location'];

      if (typeof location == 'undefined') {
        this.router.navigate(['/404']);
        return;
      }

      let splitLocation: Array<string> = location.split('-');
      let lengthOfLocation: number = splitLocation.length;

      if (lengthOfLocation == 1) {
        if (location == 'States.html' || location == 'Regions.html') {
          this.locationType = 'state-selection';
        } else if (location == 'Counties.html') {
          this.locationType = 'counties-selection';
        } else if (location == 'Cities.html') {
          this.locationType = 'town-selection';
        } else {
          this.router.navigate(['/404']);
        }
      } else if (lengthOfLocation == 2) {
        this.locationType = 'state-profile';
      } else if (lengthOfLocation == 3) {
        if (splitLocation[2] == 'Cities.html') {
          this.locationType = 'town-selection';
        } else {
          this.locationType = 'town-profile';
        }
      } else if (lengthOfLocation == 4) {
        this.locationType = 'town-selection';
      } else if (lengthOfLocation == 5) {
        this.locationType = 'company-profile';
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
