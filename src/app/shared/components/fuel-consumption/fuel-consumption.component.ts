import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-fuel-consumption',
  templateUrl: './fuel-consumption.component.html',
  styleUrls: ['./fuel-consumption.component.scss'],
})
export class FuelConsumptionComponent implements OnChanges {
  @Input() townData: any;
  @Input() weatherHistory: any;
  @Input() isState: boolean;
  @Input() isLandingPage: boolean;
  lastYearConsumption: any;
  winterTemperatureDifference: number;
  isWarm: boolean;
  stateConsumptionRankSupertxt: any;
  nationalConsumptionRankSupertxt: any;
  currentYear: number;
  twoYearAgoYear: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['townData'] && this.townData) {
      if (this.isState) {
        this.townData.city = this.townData.stateName.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );
      }

      if (this.isLandingPage) {
        this.townData.city = 'U.S.';
        this.townData.lastYearConsumption = this.townData.totalConsumption;
        console.log(this.townData.lastYearConsumption);
      }

      this.lastYearConsumption =
        Math.round(this.townData.lastYearConsumption / 1000000).toString() +
        ' million';

    }

    if(changes['weatherHistory'] && this.weatherHistory){
      this.addWeatherHistory(this.weatherHistory);
    }
  }

  addWeatherHistory(data) {
    if (data[0].averageTemp > data[1].averageTemp) {
      this.winterTemperatureDifference =
        Math.round((data[0].averageTemp - data[1].averageTemp) * 100) / 100;
      this.isWarm = true;
    } else {
      this.winterTemperatureDifference =
        Math.round((data[1].averageTemp - data[0].averageTemp) * 100) / 100;
      this.isWarm = false;
    }

    if(!this.isLandingPage){
      let rank = this.townData.stateConsumptionRank;
      let lastdigit = rank % 10;
  
      if (lastdigit == 1 && rank != 11) {
        this.stateConsumptionRankSupertxt = 'st';
      } else if (lastdigit == 2 && rank != 12) {
        this.stateConsumptionRankSupertxt = 'nd';
      } else if (lastdigit == 3 && rank != 13) {
        this.stateConsumptionRankSupertxt = 'rd';
      } else {
        this.stateConsumptionRankSupertxt = 'th';
      }
  
      let rank_ = this.townData.nationalConsumptionRank;
      let lastdigit_ = rank_ % 10;
  
      if (lastdigit_ == 1 && rank_ != 11) {
        this.nationalConsumptionRankSupertxt = 'st';
      } else if (lastdigit_ == 2 && rank_ != 12) {
        this.nationalConsumptionRankSupertxt = 'nd';
      } else if (lastdigit_ == 3 && rank_ != 13) {
        this.nationalConsumptionRankSupertxt = 'rd';
      } else {
        this.nationalConsumptionRankSupertxt = 'th';
      }
    }

    this.currentYear = new Date().getFullYear();
    this.twoYearAgoYear = this.currentYear - 2;
  }
}
