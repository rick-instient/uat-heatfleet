import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.config';

@Component({
  selector: 'app-oil-price-details',
  templateUrl: './oil-price-details.component.html',
  styleUrls: ['./oil-price-details.component.scss'],
})
export class OilPriceDetailsComponent implements OnChanges {
  // @Input() townDetails: any;
  @Input() isState: boolean;
  @Input() city;
  @Input() heatingOilPricesData: any;
  priceHistory: any;
  lastUpdate: any;
  isPriceAvailable: boolean = false;

  constructor(
    public config: CommonService,
    public http: HttpClient,
    public router: Router
  ) {
    if (this.config.pricesData) {
      console.log(this.config.pricesData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPriceData();
  }

  protected getHttpOptions(withoutToken: boolean = false) {
    const token = environment.token;

    return {
      headers: new HttpHeaders({
        'X-Api-Key': `${environment.api_key}`,
        'DAVOS-IsMobile': environment.isMobile.toString(),
      }),
    };
  }

  private getUrl(uri: string): string {
    return `${environment.api_url}${uri}`;
  }

  getPriceData() {
    if (this.isState) {
      var field_ = this.router.url.split('/');
      var field_ = field_[2].split('-');
      var fl = field_[0];
      var url = this.getUrl('customer/offer/get-price-statewise?hash=' + fl);
    } else {
      var field4 = this.router.url.split('/')[2].split('-')[0];
      var url = this.getUrl('customer/offer/get-price-townwise?hash=' + field4);
    }

    this.http.get(url, this.getHttpOptions()).subscribe((data) => {
      if (this.isState) {
        this.priceHistory = data;
      } else {
        let data_ = data as { priceData: any[] };
        this.priceHistory = data_.priceData;
      }
      if (this.priceHistory) {
        this.isPriceAvailable = true;
      }

      let size = this.priceHistory.length;
      this.priceHistory = this.priceHistory.slice(size - 30, size);

      var temp = [];
      for (let i = this.priceHistory.length - 1; i >= 0; i--) {
        temp.push(this.priceHistory[i]);
      }
      this.priceHistory = temp;
      // this.historyUpdateDate = this.priceHistory[0].date.substring(0, 10);
      this.lastUpdate = this.priceHistory[0].date;

      const date = new Date(this.lastUpdate);
      console.log(date);

      const today = new Date();
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      const formattedDate = `${date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      })} at ${date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;

      console.log(formattedDate);

      if (isToday) {
        this.lastUpdate = 'Today' + ' at ' + formattedDate.slice(-8);
      } else {
        this.lastUpdate = formattedDate;
      }
    });
  }

  getFormattedDate(inputDate: string): string {
    const date = new Date(inputDate);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${month}/${day}/${year}`;
  }
}
