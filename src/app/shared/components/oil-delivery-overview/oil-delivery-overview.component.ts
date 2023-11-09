import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oil-delivery-overview',
  templateUrl: './oil-delivery-overview.component.html',
  styleUrls: ['./oil-delivery-overview.component.scss'],
})
export class OilDeliveryOverviewComponent implements OnChanges {
  @Input() isState: boolean;
  @Input() oilDeliverydata: any;
  @Input() isTown: any;
  @Input() isLandingPage: any;
  lastYear: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isLandingPage) {
      this.oilDeliverydata.location = 'America';
    }
    if(this.oilDeliverydata.totalConsumption){
      this.oilDeliverydata.totalConsumption =
      Math.round(this.oilDeliverydata.totalConsumption / 1000000).toString() +
      ' million';
    }
  }

  getLastYear() {
    let currentYear = new Date().getFullYear();
    this.lastYear = currentYear - 1;
  }
}
