import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared-service.service';

@Component({
  selector: 'app-oil-delivery-map',
  templateUrl: './oil-delivery-map.component.html',
  styleUrls: ['./oil-delivery-map.component.scss']
})
export class OilDeliveryMapComponent {
  mapImage!: string;
  mapTitle!: string;
  mapImageAlt!: string;
  stateHashApiSub: Subscription;
  townHashApiSub: Subscription;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    if(this.sharedService.isStatePage) {
      this.getStateHashApiData();
    }
    if(this.sharedService.isTownPage){
      this.getTownHashApiData();
    }
  }

  getStateHashApiData() {
    this.stateHashApiSub = this.sharedService.stateHashApiData$.subscribe((value) => {
      if (Object.keys(value).length != 0) {
        this.mapImage = value.service_image_url;
        this.mapTitle = value.service_title;
        this.mapImageAlt = value.service_alt;
      }
    });
  }

  getTownHashApiData() {
    this.townHashApiSub = this.sharedService.townHashApiData$.subscribe((value) => {
      if (Object.keys(value).length != 0) {
        this.mapImage = value.service_image_url;
        this.mapTitle = value.service_title;
        this.mapImageAlt = value.service_alt;
      }
    });
  }

  ngOnDestroy() {
    if (this.stateHashApiSub) {
      this.stateHashApiSub.unsubscribe()
    };
    if (this.townHashApiSub) {
      this.townHashApiSub.unsubscribe()
    };
  }
}
